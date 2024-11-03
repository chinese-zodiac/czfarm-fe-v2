import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import {ADDRESS_EXOTICFARMS} from "../constants/addresses";
import {EXOTIC_FARMS} from "../constants/exoticFarms";
import exoticMaster from "../abi/ExoticMaster.json";


function useExoticFarmAccountInfo(provider,account) {
  const chronoPoolServiceContract = new Contract(ADDRESS_EXOTICFARMS,exoticMaster,provider);
  const calls = EXOTIC_FARMS.flatMap(farmSet=>farmSet.farms.map(farm=>({
    contract:chronoPoolServiceContract,
    method:'getExoticFarmAccountInfo',
    args: [account,farm.pid]
  }))) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      //console.error(`ERROR calling 'balanceOf' on ${calls[idx]?.contract.address}`);
    }
  });
  return EXOTIC_FARMS.flatMap((farmSet,farmSetIndex)=>farmSet.farms.map((farm,farmIndex)=>{
    const resultIndex = farmSetIndex*3+farmIndex;
    return {
      pid:farm.pid,
      totalVesting:results?.[resultIndex]?.value?.totalVesting_,
      emissionRate:results?.[resultIndex]?.value?.emissionRate_,
      updateEpoch:results?.[resultIndex]?.value?.updateEpoch_,
      fastForwardLockToEpoch:results?.[resultIndex]?.value?.fastForwardLockToEpoch_,
    }
  }));
}


export default useExoticFarmAccountInfo;