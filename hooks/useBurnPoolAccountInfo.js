import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import { BURN_POOLS } from "../constants/burnpools";
import BurnPool from "../abi/BurnPool.json";


function useBurnPoolAccountInfo(provider, account) {
    const calls = BURN_POOLS.flatMap(pool => {
        let poolSc = new Contract(pool.address, BurnPool, provider);
        let calls = [
            {
                contract: poolSc,
                method: 'userInfo',
                args: [account]
            },
            {
                contract: poolSc,
                method: 'pendingReward',
                args: [account]
            },
            {
                contract: poolSc,
                method: 'isBoostEligible',
                args: [account]
            }
        ]
        return calls
    }) ?? [];
    const results = useCalls(calls) ?? [];
    results.forEach((result, idx) => {
        if (result && result.error) {
            console.error(`ERROR calling 'balanceOf' on ${calls[idx]?.contract.address}`);
        }
    });
    let iter = 0;
    return BURN_POOLS.map((pool, index) => {
        const resultIndexUserInfo = index * 3;
        const resultIndexPendingReward = resultIndexUserInfo + 1;
        const resultIndexIsBoostEligible = resultIndexUserInfo + 1;
        console.log("useBurnPoolAccountInfo results:", results?.[resultIndexIsBoostEligible]?.value?.[2])
        return {
            address: pool.address,
            shares: results?.[resultIndexUserInfo]?.value?.[0],
            rewardDebt: results?.[resultIndexUserInfo]?.value?.[1],
            pendingReward: results?.[resultIndexPendingReward]?.value?.[0],
            isBoostEligible: results?.[resultIndexIsBoostEligible]?.value?.[0]
        }
    });
}


export default useBurnPoolAccountInfo;