import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import CZBFarmMaster from "../abi/CZBFarmMaster.json";
import { ADDRESS_CZBMASTER } from "../constants/addresses";
import { CZB_FARMS, CZB_FARMS_SINGLES } from "../constants/czbfarms";


function useCzbFarmsPoolInfo(provider) {
  const czbMasterContract = new Contract(ADDRESS_CZBMASTER, CZBFarmMaster, provider);
  const calls = [
    ...CZB_FARMS_SINGLES.map(farm => ({
      contract: czbMasterContract,
      method: 'poolInfo',
      args: [farm.pid]
    })),
    ...CZB_FARMS.map(farm => ({
      contract: czbMasterContract,
      method: 'poolInfo',
      args: [farm.pid]
    }))
  ] ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result, index) => {
    return {
      pid: [...CZB_FARMS_SINGLES, ...CZB_FARMS][index].pid,
      lpToken: result?.value?.lpToken,
      allocPoint: result?.value?.allocPoint,
      lastRewardBlock: result?.value?.lastRewardBlock,
      accCzbPerShare: result?.value?.accCzbPerShare,
      totalDeposit: result?.value?.totalDeposit,
    }
  });
}


export default useCzbFarmsPoolInfo;