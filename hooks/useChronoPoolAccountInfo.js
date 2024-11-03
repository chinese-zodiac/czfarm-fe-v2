import { useCalls } from "@usedapp/core";
import {CHRONO_POOL} from "../constants/chronoPool";
import {ADDRESS_CHRONOPOOLS}  from "../constants/addresses";
import { Contract } from 'ethers';
import chronoPoolService from "../abi/ChronoPoolService.json";


function useChronoPoolAccountInfo(provider,account) {
  const chronoPoolServiceContract = new Contract(ADDRESS_CHRONOPOOLS,chronoPoolService,provider);
  const calls = CHRONO_POOL.map(pool=>({
    contract:chronoPoolServiceContract,
    method:'getChronoPoolAccountInfo',
    args: [account,pool.pid]
  })) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result,index) => {
    return {
      pid:CHRONO_POOL[index].pid,
      totalVesting:result?.value?.totalVesting_,
      emissionRate:result?.value?.emissionRate_,
      updateEpoch:result?.value?.updateEpoch_
    }
  });
}


export default useChronoPoolAccountInfo;