import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import {POOLS_V1} from "../constants/poolsv1";
import CZFarmPool from "../abi/CZFarmPool.json";


function usePoolsV1AccountInfo(provider,account) {
  const calls = POOLS_V1.flatMap(pool=>{
    let poolSc = new Contract(pool.address,CZFarmPool,provider);
    return [
    {
      contract:poolSc,
      method:'userInfo',
      args:[account]
    },
    {
      contract:poolSc,
      method:'pendingReward',
      args:[account]
    }
  ]}) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      console.error(`ERROR calling 'balanceOf' on ${calls[idx]?.contract.address}`);
    }
  });
  return POOLS_V1.map((pool,index) => {
    const resultIndexUserInfo = index * 2;
    const resultIndexPendingReward = resultIndexUserInfo+1;
    return {
      address:pool.address,
      amount:results?.[resultIndexUserInfo]?.value?.[0],
      rewardDebt:results?.[resultIndexUserInfo]?.value?.[1],
      pendingReward:results?.[resultIndexPendingReward]?.value?.[0],
    }
  });
}


export default usePoolsV1AccountInfo;