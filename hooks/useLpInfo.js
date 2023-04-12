import { useCalls } from "@usedapp/core";
import { Contract } from 'ethers';
import IERC20 from "../abi/IERC20.json";
import { ADDRESS_CZB, ADDRESS_CZR } from "../constants/addresses";
import { CZB_FARMS } from "../constants/czbfarms";
import { EXOTIC_FARMS } from "../constants/exoticFarms";
import { FARM_V2 } from "../constants/famsv2";
import { PRICING_LP } from "../constants/pricingLp";
import { TRIBE_POOLS } from "../constants/tribepools";

function useLpInfo(library) {
  const lpTokens = {};
  const lpAddresses = [
    ...new Set([...FARM_V2.map(farm => farm.lp), ...EXOTIC_FARMS.map(farm => farm.lp), ...TRIBE_POOLS.map(farm => farm.lp), ...CZB_FARMS.map(farm => farm.lp)])
  ];
  [...FARM_V2, ...EXOTIC_FARMS, ...TRIBE_POOLS, ...CZB_FARMS].forEach((farm) => {
    if (!lpTokens?.[farm.lp]) {
      lpTokens[farm.lp] = farm.tokens;
    }
  });
  //TODO: Refactor how lp token addresses are stored to a single location
  lpTokens[PRICING_LP.CZR] = [
    {
      address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      symbol: "CZUSD"
    },
    {
      address: ADDRESS_CZR,
      symbol: "CZR"
    }
  ]
  lpAddresses.push(PRICING_LP.CZR);
  lpTokens[PRICING_LP.CZB] = [
    {
      address: "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70",
      symbol: "CZUSD"
    },
    {
      address: ADDRESS_CZB,
      symbol: "CZB"
    }
  ]
  lpAddresses.push(PRICING_LP.CZB);
  const calls = lpAddresses.flatMap((lpAddress) => ([
    {
      contract: new Contract(lpTokens[lpAddress][0].address, IERC20, library),
      method: 'balanceOf',
      args: [lpAddress]
    },
    {
      contract: new Contract(lpTokens[lpAddress][1].address, IERC20, library),
      method: 'balanceOf',
      args: [lpAddress]
    },
    {
      contract: new Contract(lpAddress, IERC20, library),
      method: 'totalSupply',
      args: []
    }
  ])) ?? [];
  const results = useCalls(calls) ?? [];
  results.forEach((result, idx) => {
    if (result && result.error) {
      console.error(`ERROR calling 'poolInfo' on ${calls[idx]?.contract.address}`);
    }
  });
  let lpInfos = {};
  lpAddresses.forEach((lpAddress, index) => {
    const resultToken0Index = index * 3;
    const resultToken1Index = resultToken0Index + 1;
    const resultTotalSupplyIndex = resultToken1Index + 1;
    lpInfos[lpAddress] = {
      tokens: [
        results?.[resultToken0Index]?.value?.[0],
        results?.[resultToken1Index]?.value?.[0]
      ],
      totalSupply: results?.[resultTotalSupplyIndex]?.value?.[0]
    };
  });
  return lpInfos;
}

export default useLpInfo;