import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import { BURN_POOLS } from "../constants/burnpools";
import BurnPool from "../abi/BurnPool.json";
import IERC20 from "../abi/IERC20.json";


function useBurnPoolInfo(provider) {
    const calls = BURN_POOLS.flatMap(pool => {
        let poolSc = new Contract(pool.address, BurnPool, provider);
        let burnedTokenSc = new Contract(pool.baseAssetAddress, IERC20, provider);
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
            },
            {
                contract: burnedTokenSc,
                method: 'balanceOf',
                args: [pool.address]
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
        const resultIndexTimestampStart = index * 5;
        const resultIndexTimestampEnd = resultIndexTimestampStart + 1;
        const resultIndexRewardPerSecond = resultIndexTimestampStart + 2;
        const resultIndexTotalShares = resultIndexTimestampStart + 3;
        const resultBurnedTokenWadIndex = resultIndexTimestampStart + 4;
        return {
            address: pool.address,
            timestampStart: results?.[resultIndexTimestampStart]?.value?.[0],
            timestampEnd: results?.[resultIndexTimestampEnd]?.value?.[0],
            rewardPerSecond: results?.[resultIndexRewardPerSecond]?.value?.[0],
            totalShares: results?.[resultIndexTotalShares]?.value?.[0],
            burnedWad: results?.[resultBurnedTokenWadIndex]?.value?.[0]
        }
    });
}


export default useBurnPoolInfo;