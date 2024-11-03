import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import IERC20 from "../abi/IERC20.json";
import { ADDRESS_CZBMASTER } from "../constants/addresses";
import { CZB_FARMS, CZB_FARMS_SINGLES } from "../constants/czbfarms";


function useCzbFarmsLpBal(library) {
  const calls = [
    ...CZB_FARMS_SINGLES.map(farm => ({
      contract: new Contract(farm.token, IERC20, library),
      method: 'balanceOf',
      args: [ADDRESS_CZBMASTER]
    })),
    ...CZB_FARMS.map(farm => ({
      contract: new Contract(farm.lp, IERC20, library),
      method: 'balanceOf',
      args: [ADDRESS_CZBMASTER]
    }))
  ] ?? []
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      //console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  return results.map((result, index) => {
    return {
      pid: [...CZB_FARMS_SINGLES, ...CZB_FARMS][index].pid,
      lpBal: result?.value?.[0]
    }
  });
}


export default useCzbFarmsLpBal;