import { useCoingeckoPrice } from '@usedapp/coingecko';
import { useEthers } from "@usedapp/core";
import { BigNumber, utils } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import { PRICING_LP } from "../constants/pricingLp";
import useBurnPoolInfo from '../hooks/useBurnPoolInfo';
import useChronoVestingsTotalVesting from '../hooks/useChronoVestingsTotalVesting';
import useLpInfo from '../hooks/useLpInfo';
import usePoolsV1TokenBalance from '../hooks/usePoolsV1TokenBalance';
import useTribePoolInfo from '../hooks/useTribePoolInfo';
import useTvlWei from '../hooks/useTvlWei';
import useV2FarmsLpBal from '../hooks/useV2FarmsLpBal';
import { weiTolpCzusdPricedWeiVal } from '../utils/bnDisplay';
const { parseEther, formatEther } = utils;

const CZFarmContext = createContext(0);

export const CZFarmProvider = ({ children }) => {
  const czusdPrice = useCoingeckoPrice("czusd");
  const czfPrice = useCoingeckoPrice("czfarm");
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const { library } = useEthers();


  const chronoVestingsTotalVesting = useChronoVestingsTotalVesting(library);
  const poolsV1TokenBalance = usePoolsV1TokenBalance(library);
  const tribePoolsInfo = useTribePoolInfo(library);
  const v2FarmsLpBal = useV2FarmsLpBal(library);
  const burnPoolsInfo = useBurnPoolInfo(library);
  const lpInfos = useLpInfo(library);

  const [czrPrice, setCzrPrice] = useState(BigNumber.from(0));

  const {
    chronoTvlWei,
    exoticTvlWei,
    farmsV2TvlWei,
    poolsV1TvlWei,
    tribePoolsTvlWei,
    burnPoolsTvbWei
  } = useTvlWei(czfPrice, czrPrice, czusdPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo, burnPoolsInfo);

  useEffect(() => {
    setCzrPrice(formatEther(weiTolpCzusdPricedWeiVal(lpInfos, "CZR", parseEther("1"), czusdPrice)));
  }, [lpInfos?.[PRICING_LP.CZR]?.tokens?.[0]])

  return (
    <CZFarmContext.Provider value={{
      czusdPrice, czfPrice, bnbPrice, czrPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, chronoTvlWei, exoticTvlWei, farmsV2TvlWei, poolsV1TvlWei, tribePoolsTvlWei, burnPoolsTvbWei,
      //React doesnt know how to properly check if bignumbers have changed, so use these to trigger refreshes
      updateCheckerViaStringChronoTvlWei: chronoTvlWei?.toString(),
      updateCheckerViaStringExoticTvlWei: exoticTvlWei?.toString(),
      updateCheckerViaStringFarmsV2TvlWei: farmsV2TvlWei?.toString(),
      updateCheckerViaStringPoolsV1TvlWei: poolsV1TvlWei?.toString(),
      updateCheckerViaStringTribePoolsV1TvlWei: tribePoolsTvlWei?.toString(),
      updateCheckerViaStringBurnPoolsTvbWei: burnPoolsTvbWei?.toString()
    }}>
      {children}
    </CZFarmContext.Provider>
  );
};

export default CZFarmContext;