import { useCalls } from "@usedapp/core";
import {FARM_V2} from "../constants/famsv2";
import {ADDRESS_FARMMASTERV2}  from "../constants/addresses";
import { Contract } from 'ethers';
import czFarmMaster from "../abi/CZFarmMaster.json";

function useV2FarmsSettings(provider) {
  const czFarmMasterContract = new Contract(ADDRESS_FARMMASTERV2,czFarmMaster,provider);
  const calls = [
  {
    contract:czFarmMasterContract,
    method:'czfPerBlock',
    args: []
  },
  {
    contract:czFarmMasterContract,
    method:'totalAllocPoint',
    args: []
  }
  ] ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return ({
    czfPerBlock:results?.[0]?.value?.[0],
    totalAllocPoint:results?.[1]?.value?.[0],
  });

}

export default useV2FarmsSettings;