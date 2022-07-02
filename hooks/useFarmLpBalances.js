import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import ierc20 from "../abi/IERC20.json";


function useFarmLpBalances(provider,farms) {
  const calls = farms.flatMap(farm=>[
    {
      contract:new Contract(farm.tokens[0].address,ierc20,provider),
      method:'balanceOf',
      args:[farm.lp]
    },
    {
      contract:new Contract(farm.tokens[1].address,ierc20,provider),
      method:'balanceOf',
      args:[farm.lp]
    }
  ]) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      console.error(`ERROR calling 'balanceOf' on ${calls[idx]?.contract.address}`);
    }
  });
  return farms.map((farm,index) => {
    const resultIndexToken0 = index * 2;
    const resultIndexToken1 = resultIndexToken0 + 1;
    return {
      pid:farm.pid,
      token0Bal:results?.[resultIndexToken0]?.value?.[0],
      token1Bal:results?.[resultIndexToken1]?.value?.[0]
    }
  });
}


export default useFarmLpBalances;