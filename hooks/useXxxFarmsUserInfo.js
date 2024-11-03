import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import CZBFarmMaster from "../abi/CZBFarmMaster.json";


function useXxxFarmsUserInfo(provider, account, address_xxx_master, xxx_singles, xxx_farms) {
  const xxxMasterContract = new Contract(address_xxx_master, CZBFarmMaster, provider);
  const calls = [
    ...xxx_singles.map(farm => ({
      contract: xxxMasterContract,
      method: 'userInfo',
      args: [farm.pid, account]
    })),
    ...xxx_farms.map(farm => ({
      contract: xxxMasterContract,
      method: 'userInfo',
      args: [farm.pid, account]
    }))] ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result, index) => {
    return {
      pid: [...xxx_singles, ...xxx_farms][index].pid,
      amount: result?.value?.amount,
      rewardDebt: result?.value?.rewardDebt,
      pendingRewards: result?.value?.pendingRewards
    }
  });
}


export default useXxxFarmsUserInfo;