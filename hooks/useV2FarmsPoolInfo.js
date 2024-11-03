import { useCalls } from "@usedapp/core";
import {FARM_V2} from "../constants/famsv2";
import {ADDRESS_FARMMASTERV2}  from "../constants/addresses";
import { Contract } from 'ethers';
import czFarmMaster from "../abi/CZFarmMaster.json";


function useV2FarmsPoolInfo(provider) {
  const czFarmMasterContract = new Contract(ADDRESS_FARMMASTERV2,czFarmMaster,provider);
  const calls = FARM_V2.map(farm=>({
    contract:czFarmMasterContract,
    method:'poolInfo',
    args: [farm.pid]
  })) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result,index) => {
    return {
      pid:FARM_V2[index].pid,
      lpToken:result?.value?.lpToken,
      allocPoint:result?.value?.allocPoint,
      lastRewardBlock:result?.value?.lastRewardBlock,
      accCzfPerShare:result?.value?.accCzfPerShare,
    }
  });
}


export default useV2FarmsPoolInfo;