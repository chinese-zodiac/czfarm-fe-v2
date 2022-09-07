import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import {POOLS_V1} from "../constants/poolsv1";
import CZFarmPool from "../abi/CZFarmPool.json";
import {ADDRESS_OBR}  from "../constants/addresses";


function usePoolsV1AccountInfo(provider,account) {
  const calls = POOLS_V1.flatMap(pool=>{
    let poolSc = new Contract(pool.address,CZFarmPool,provider);
    let calls = [
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
    ]
    if(pool.has1Bad0TaxSlot) calls.push(
      {
        contract:poolSc,
        method:'getSlottedNft',
        args:[account,ADDRESS_OBR]
      });
    return calls}) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      console.error(`ERROR calling 'balanceOf' on ${calls[idx]?.contract.address}`);
    }
  });
  let iter = 0;
  return POOLS_V1.map((pool) => {
    const resultIndexUserInfo = iter;
    iter++;
    const resultIndexPendingReward = iter;
    iter++;
    let resultGetSlottedObr = 0;
    if(pool.has1Bad0TaxSlot) {
      resultGetSlottedObr = iter;
      iter++;
    }
    if(pool?.address=="0x6615f3B9FE17fa63F35817cfD669224BA3d00b12") {
      console.log(results);
      console.log(results?.[resultGetSlottedObr]?.value?.[0]);
    }
    return {
      address:pool.address,
      amount:results?.[resultIndexUserInfo]?.value?.[0],
      rewardDebt:results?.[resultIndexUserInfo]?.value?.[1],
      pendingReward:results?.[resultIndexPendingReward]?.value?.[0],
      slottedObr:resultGetSlottedObr!=0 ? results?.[resultGetSlottedObr]?.value?.[0] : false,
      slottedObrTimestamp:resultGetSlottedObr!=0 ? results?.[resultGetSlottedObr]?.value?.[1] : false
    }
  });
}


export default usePoolsV1AccountInfo;