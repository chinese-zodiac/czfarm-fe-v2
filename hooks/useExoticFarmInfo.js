import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import {ADDRESS_EXOTICFARMS} from "../constants/addresses";
import {EXOTIC_FARMS} from "../constants/exoticFarms";
import exoticMaster from "../abi/ExoticMaster.json";


function useExoticFarmInfo(provider) {
  const chronoPoolServiceContract = new Contract(ADDRESS_EXOTICFARMS,exoticMaster,provider);
  const calls = EXOTIC_FARMS.flatMap(farmSet=>farmSet.farms.map(farm=>({
    contract:chronoPoolServiceContract,
    method:'getExoticFarmInfo',
    args: [farm.pid]
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
      adjustedRateBasis:results?.[resultIndex]?.value?.adjustedRateBasis_,
      vestPeriod:results?.[resultIndex]?.value?.vestPeriod_,
      ffBasis:results?.[resultIndex]?.value?.ffBasis_,
      poolEmissionRate:results?.[resultIndex]?.value?.poolEmissionRate_,
      lp:results?.[resultIndex]?.value?.lp_,
      czfPerLpWad:results?.[resultIndex]?.value?.czfPerLpWad_,
    }
  }));
}


export default useExoticFarmInfo;