import { useCalls } from "@usedapp/core";
import {FARM_V2} from "../constants/famsv2";
import {EXOTIC_FARMS} from "../constants/exoticFarms";
import { Contract } from 'ethers';
import IERC20 from "../abi/IERC20.json";

function useLpInfo(provider) {
  const lpTokens = {};
  const lpAddresses = [
    ...new Set([...FARM_V2.map(farm=>farm.lp), ...EXOTIC_FARMS.map(farm=>farm.lp)])
  ];
  [...FARM_V2,...EXOTIC_FARMS].forEach((farm)=>{
    if(!lpTokens?.[farm.lp]) {
      lpTokens[farm.lp] = farm.tokens;
    }
  });
  const calls = lpAddresses.flatMap((lpAddress)=>([
    {
      contract:new Contract(lpTokens[lpAddress][0].address,IERC20,provider),
      method:'balanceOf',
      args: [lpAddress]
    },
    {
      contract:new Contract(lpTokens[lpAddress][1].address,IERC20,provider),
      method:'balanceOf',
      args: [lpAddress]
    },
    {
      contract:new Contract(lpAddress,IERC20,provider),
      method:'totalSupply',
      args: []
    }
  ])) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result,idx)=>{
    if(result && result.error) {
      console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  let lpInfos = {};
  lpAddresses.forEach((lpAddress,index) => {
    const resultToken0Index = index*3;
    const resultToken1Index = resultToken0Index+1;
    const resultTotalSupplyIndex = resultToken1Index+1;
    lpInfos[lpAddress] = {
      tokens:[
        results?.[resultToken0Index]?.value?.[0],
        results?.[resultToken1Index]?.value?.[0]
      ],
      totalSupply:results?.[resultTotalSupplyIndex]?.value?.[0]
    };
  });
  return lpInfos;
}

export default useLpInfo;