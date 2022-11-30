import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import { BURN_POOLS } from "../constants/burnpools";
import BurnPool from "../abi/BurnPool.json";


function useBurnPoolInfo(provider) {
    const calls = BURN_POOLS.flatMap(pool => {
        let poolSc = new Contract(pool.address, BurnPool, provider);
        return [
            {
                contract: poolSc,
                method: 'timestampStart',
                args: []
            },
            {
                contract: poolSc,
                method: 'timestampEnd',
                args: []
            },
            {
                contract: poolSc,
                method: 'rewardPerSecond',
                args: []
            },
            {
                contract: poolSc,
                method: 'totalShares',
                args: []
            }
        ]
    }) ?? [];
    const results = useCalls(calls) ?? [];
    results.forEach((result, idx) => {
        if (result && result.error) {
            console.error(`ERROR calling 'balanceOf' on ${calls[idx]?.contract.address}`);
        }
    });
    return BURN_POOLS.map((pool, index) => {
        const resultIndexTimestampStart = index * 4;
        const resultIndexTimestampEnd = resultIndexTimestampStart + 1;
        const resultIndexRewardPerSecond = resultIndexTimestampStart + 2;
        const resultIndexTotalShares = resultIndexTimestampStart + 23;
        return {
            address: pool.address,
            timestampStart: results?.[resultIndexTimestampStart]?.value?.[0],
            timestampEnd: results?.[resultIndexTimestampEnd]?.value?.[0],
            rewardPerSecond: results?.[resultIndexRewardPerSecond]?.value?.[0],
            totalShares: results?.[resultIndexTotalShares]?.value?.[0],
        }
    });
}


export default useBurnPoolInfo;