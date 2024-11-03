import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import CZBFarmMaster from "../abi/CZBFarmMaster.json";
import { ADDRESS_CZBMASTER } from "../constants/addresses";
import { CZB_FARMS, CZB_FARMS_SINGLES } from "../constants/czbfarms";


function useCzbFarmsUserInfo(provider, account) {
  const czbMasterContract = new Contract(ADDRESS_CZBMASTER, CZBFarmMaster, provider);
  const calls = [
    ...CZB_FARMS_SINGLES.map(farm => ({
      contract: czbMasterContract,
      method: 'userInfo',
      args: [farm.pid, account]
    })),
    ...CZB_FARMS.map(farm => ({
      contract: czbMasterContract,
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
      pid: [...CZB_FARMS_SINGLES, ...CZB_FARMS][index].pid,
      amount: result?.value?.amount,
      rewardDebt: result?.value?.rewardDebt,
      pendingRewards: result?.value?.pendingRewards
    }
  });
}


export default useCzbFarmsUserInfo;