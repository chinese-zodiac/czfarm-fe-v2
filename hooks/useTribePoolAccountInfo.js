import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import { TRIBE_POOLS } from "../constants/tribepools";
import { ADDRESS_OBR } from "../constants/addresses";
import TribePool from "../abi/TribePool.json";


function useTribePoolAccountInfo(provider, account) {
    const calls = TRIBE_POOLS.flatMap(pool => {
        let poolSc = new Contract(pool.address, TribePool, provider);
        let poolWrapperSc = new Contract(pool.wrapperAddress, TribePool, provider);
        return [
            {
                contract: poolSc,
                method: 'stakedBal',
                args: [account]
            },
            {
                contract: poolSc,
                method: 'totalRewardsReceived',
                args: [account]
            },
            {
                contract: poolSc,
                method: 'pendingReward',
                args: [account]
            },
            {
                contract: poolWrapperSc,
                method: 'getSlottedNft',
                args: [account, ADDRESS_OBR]
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
        const stakedBalIndex = index * 4;
        const totalRewardsReceivedIndex = stakedBalIndex + 1;
        const pendingRewardIndex = stakedBalIndex + 2;
        const getSlottedNftIndex = stakedBalIndex + 3;
        return {
            address: pool.address,
            stakedBal: results?.[stakedBalIndex]?.value?.[0],
            totalRewardsReceived: results?.[totalRewardsReceivedIndex]?.value?.[0],
            pendingReward: results?.[pendingRewardIndex]?.value?.[0],
            slottedObr: results?.[getSlottedNftIndex]?.value?.[0],
            slottedObrTimestamp: results?.[getSlottedNftIndex]?.value?.[1]
        }
    });
}


export default useTribePoolAccountInfo;