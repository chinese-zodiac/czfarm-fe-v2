import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import IERC20 from "../abi/IERC20.json";
import { BANDIT_FARMS } from "../constants/banditfarms";
import { CZB_FARMS } from "../constants/czbfarms";
import { EXOTIC_FARMS } from "../constants/exoticFarms";
import { FARM_V2 } from "../constants/famsv2";

function useAccountLpBals(provider, account) {
  const lpAddresses = [
    ...new Set([...FARM_V2.map(farm => farm.lp), ...EXOTIC_FARMS.map(farm => farm.lp), ...CZB_FARMS.map(farm => farm.lp), ...BANDIT_FARMS.map(farm => farm.lp)])
  ];
  const calls = lpAddresses.map(lpAddress => ({
    contract: new Contract(lpAddress, IERC20, provider),
    method: 'balanceOf',
    args: [account]
  })) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.reduce((prev, curr, index) => { prev[lpAddresses[index]] = curr?.value?.[0]; return prev; }, {});
}

export default useAccountLpBals;