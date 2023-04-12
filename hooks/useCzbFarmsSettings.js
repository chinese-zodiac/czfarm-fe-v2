import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import CZBFarmMaster from "../abi/CZBFarmMaster.json";
import { ADDRESS_CZBMASTER } from "../constants/addresses";

function useCzbFarmsSettings(provider) {
  const czbMasterContract = new Contract(ADDRESS_CZBMASTER, CZBFarmMaster, provider);
  const calls = [
    {
      contract: czbMasterContract,
      method: 'czbPerSecond',
      args: []
    },
    {
      contract: czbMasterContract,
      method: 'totalAllocPoint',
      args: []
    }
  ] ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return ({
    czbPerSecond: results?.[0]?.value?.[0],
    totalAllocPoint: results?.[1]?.value?.[0],
  });

}

export default useCzbFarmsSettings;