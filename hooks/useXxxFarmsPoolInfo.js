import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import CZBFarmMaster from "../abi/CZBFarmMaster.json";


function useXxxFarmsPoolInfo(provider, address_xxx_master, xxx_singles, xxx_farms) {
  const xxxMasterContract = new Contract(address_xxx_master, CZBFarmMaster, provider);
  const calls = [
    ...xxx_singles.map(farm => ({
      contract: xxxMasterContract,
      method: 'poolInfo',
      args: [farm.pid]
    })),
    ...xxx_farms.map(farm => ({
      contract: xxxMasterContract,
      method: 'poolInfo',
      args: [farm.pid]
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
      lpToken: result?.value?.lpToken,
      allocPoint: result?.value?.allocPoint,
      lastRewardBlock: result?.value?.lastRewardBlock,
      totalDeposit: result?.value?.totalDeposit,
    }
  });
}


export default useXxxFarmsPoolInfo;