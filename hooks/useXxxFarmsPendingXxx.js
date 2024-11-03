import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import CZBFarmMaster from "../abi/CZBFarmMaster.json";


function useXxxFarmsPendingXxx(provider, account, address_xxx_master, xxx_singles, xxx_farms, pendingMethodName) {
  const xxxMasterContract = new Contract(address_xxx_master, CZBFarmMaster, provider);
  const calls = [
    ...xxx_singles.map(farm => ({
      contract: xxxMasterContract,
      method: pendingMethodName,
      args: [farm.pid, account]
    })),
    ...xxx_farms.map(farm => ({
      contract: xxxMasterContract,
      method: pendingMethodName,
      args: [farm.pid, account]
    }))
  ] ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result, index) => {
    return {
      pid: [...xxx_singles, ...xxx_farms][index].pid,
      pendingXxx: result?.value?.[0]
    }
  });
}


export default useXxxFarmsPendingXxx;