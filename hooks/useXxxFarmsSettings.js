import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import CZBFarmMaster from "../abi/CZBFarmMaster.json";

function useXxxFarmsSettings(provider, address_xxx_master, xxxPerSecondMethodName) {
  const xxxMasterContract = new Contract(address_xxx_master, CZBFarmMaster, provider);
  const calls = [
    {
      contract: xxxMasterContract,
      method: xxxPerSecondMethodName,
      args: []
    },
    {
      contract: xxxMasterContract,
      method: 'totalAllocPoint',
      args: []
    }
  ] ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return ({
    xxxPerSecond: results?.[0]?.value?.[0],
    totalAllocPoint: results?.[1]?.value?.[0],
  });

}

export default useXxxFarmsSettings;