import { useCalls } from "@usedapp/core";
import {POOLS_V1} from "../constants/poolsv1";
import { Contract } from 'ethers';
import IERC20 from "../abi/IERC20.json";


function usePoolsV1TokenBalance(provider) {
  const calls = POOLS_V1.map(pool=>({
    contract:new Contract(pool.baseAssetAddress,IERC20,provider),
    method:'balanceOf',
    args: [pool.address]
  })) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result,index) => {
    return {
      address:POOLS_V1[index].address,
      tokenBal:result?.value?.[0]
    }
  });
}



export default usePoolsV1TokenBalance;