import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import { TRIBE_POOLS } from "../constants/tribepools";
import TribePool from "../abi/TribePool.json";


function useTribePoolInfo(provider) {
    const calls = TRIBE_POOLS.flatMap(pool => {
        let poolSc = new Contract(pool.address, TribePool, provider);
        return [
            {
                contract: poolSc,
                method: 'totalStaked',
                args: []
            },
            {
                contract: poolSc,
                method: 'rewardPerSecond',
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
    return TRIBE_POOLS.map((pool, index) => {
        const totalStakedIndex = index * 2;
        const rewardPerSecondIndex = totalStakedIndex + 1;
        return {
            address: pool.address,
            totalStaked: results?.[totalStakedIndex]?.value?.[0],
            rewardPerSecond: results?.[rewardPerSecondIndex]?.value?.[0]
        }
    });
}


export default useTribePoolInfo;