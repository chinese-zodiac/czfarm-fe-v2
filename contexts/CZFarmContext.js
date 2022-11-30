import React, { createContext, useState, useEffect } from 'react';
import { useCoingeckoPrice } from '@usedapp/coingecko';
import { useEthers, useEtherBalance } from "@usedapp/core";
import Footer from '../components/Footer';
import Header from '../components/Header';
import useTvlWei from '../hooks/useTvlWei';
import useV2FarmsLpBal from '../hooks/useV2FarmsLpBal';
import usePoolsV1TokenBalance from '../hooks/usePoolsV1TokenBalance';
import useLpInfo from '../hooks/useLpInfo'
import useChronoVestingsTotalVesting from '../hooks/useChronoVestingsTotalVesting';
import useTribePoolInfo from '../hooks/useTribePoolInfo';
import { PRICING_LP } from "../constants/pricingLp";
import { weiTolpCzusdPricedWeiVal } from '../utils/bnDisplay';
import { BigNumber, utils } from 'ethers';
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
  const lpInfos = useLpInfo(library);

  const [czrPrice, setCzrPrice] = useState(BigNumber.from(0));

  const {
    chronoTvlWei,
    exoticTvlWei,
    farmsV2TvlWei,
    poolsV1TvlWei,
    tribePoolsTvlWei
  } = useTvlWei(czfPrice, czusdPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo);

  useEffect(() => {
    setCzrPrice(formatEther(weiTolpCzusdPricedWeiVal(lpInfos, "CZR", parseEther("1"), czusdPrice)));
  }, [lpInfos?.[PRICING_LP.CZR]?.tokens?.[0]])

  return (
    <CZFarmContext.Provider value={{
      czusdPrice, czfPrice, bnbPrice, czrPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, chronoTvlWei, exoticTvlWei, farmsV2TvlWei, poolsV1TvlWei, tribePoolsTvlWei,
      //React doesnt know how to properly check if bignumbers have changed, so use these to trigger refreshes
      updateCheckerViaStringChronoTvlWei: chronoTvlWei?.toString(),
      updateCheckerViaStringExoticTvlWei: exoticTvlWei?.toString(),
      updateCheckerViaStringFarmsV2TvlWei: farmsV2TvlWei?.toString(),
      updateCheckerViaStringPoolsV1TvlWei: poolsV1TvlWei?.toString(),
      updateCheckerViaStringPoolsV1TvlWei: tribePoolsTvlWei?.toString()
    }}>
      {children}
    </CZFarmContext.Provider>
  );
};

export default CZFarmContext;