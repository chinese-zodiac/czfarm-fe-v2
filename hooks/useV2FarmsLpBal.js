import { useCalls } from "@usedapp/core";
import {FARM_V2} from "../constants/famsv2";
import {ADDRESS_FARMMASTERV2}  from "../constants/addresses";
import { Contract } from 'ethers';
import IERC20 from "../abi/IERC20.json";


function useV2FarmsLpBal(provider) {
  const calls = FARM_V2.map(farm=>({
    contract:new Contract(farm.lp,IERC20,provider),
    method:'balanceOf',
    args: [ADDRESS_FARMMASTERV2]
  })) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result,index) => {
    return {
      pid:FARM_V2[index].pid,
      lpBal:result?.value?.[0]
    }
  });
}


export default useV2FarmsLpBal;