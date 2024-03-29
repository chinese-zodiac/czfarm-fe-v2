import { useCoingeckoPrice } from '@usedapp/coingecko';
import { useEthers } from "@usedapp/core";
import { BigNumber, utils } from 'ethers';
import React, { createContext, useEffect, useState } from 'react';
import { ADDRESS_BANDITMASTER, ADDRESS_CZBMASTER } from '../constants/addresses';
import { BANDIT_FARMS, BANDIT_FARMS_SINGLES } from '../constants/banditfarms';
import { CZB_FARMS, CZB_FARMS_SINGLES } from '../constants/czbfarms';
import { PRICING_LP } from "../constants/pricingLp";
import useChronoVestingsTotalVesting from '../hooks/useChronoVestingsTotalVesting';
import useLpInfo from '../hooks/useLpInfo';
import usePoolsV1TokenBalance from '../hooks/usePoolsV1TokenBalance';
import useTribePoolInfo from '../hooks/useTribePoolInfo';
import useTvlWei from '../hooks/useTvlWei';
import useV2FarmsLpBal from '../hooks/useV2FarmsLpBal';
import useXxxFarmsPoolInfo from '../hooks/useXxxFarmsPoolInfo';
import { weiTolpCzusdPricedWeiVal } from '../utils/bnDisplay';
const { parseEther, formatEther } = utils;

const CZFarmContext = createContext(0);

export const CZFarmProvider = ({ children }) => {
  const czusdPrice = useCoingeckoPrice("czusd") ?? "1.00";
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const { library } = useEthers();


  const chronoVestingsTotalVesting = useChronoVestingsTotalVesting(library);
  const poolsV1TokenBalance = usePoolsV1TokenBalance(library);
  const tribePoolsInfo = useTribePoolInfo(library);
  const v2FarmsLpBal = useV2FarmsLpBal(library);
  const lpInfos = useLpInfo(library);

  const czbFarmsPoolInfo = useXxxFarmsPoolInfo(library, ADDRESS_CZBMASTER, CZB_FARMS_SINGLES, CZB_FARMS);
  const banditFarmsPoolInfo = useXxxFarmsPoolInfo(library, ADDRESS_BANDITMASTER, BANDIT_FARMS_SINGLES, BANDIT_FARMS);

  const [czrPrice, setCzrPrice] = useState(BigNumber.from(0));
  const [czfPrice, setCzfPrice] = useState(BigNumber.from(0));
  const [czbPrice, setCzbPrice] = useState(BigNumber.from(0));
  const [banditPrice, setBanditPrice] = useState(BigNumber.from(0));

  const {
    chronoTvlWei,
    exoticTvlWei,
    farmsV2TvlWei,
    poolsV1TvlWei,
    tribePoolsTvlWei,
    banditFarmsTvlWei,
    czbFarmsTvlWei,
    czusdNotesTvlWei
  } = useTvlWei(czfPrice, czrPrice, czusdPrice, czbPrice, banditPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo,
    czbFarmsPoolInfo, banditFarmsPoolInfo);

  useEffect(() => {
    setCzrPrice(formatEther(weiTolpCzusdPricedWeiVal(lpInfos, "CZR", parseEther("1"), czusdPrice)));
    setCzfPrice(formatEther(weiTolpCzusdPricedWeiVal(lpInfos, "CZF", parseEther("1"), czusdPrice)));
    setCzbPrice(formatEther(weiTolpCzusdPricedWeiVal(lpInfos, "CZB", parseEther("1"), czusdPrice)));
    setBanditPrice(formatEther(weiTolpCzusdPricedWeiVal(lpInfos, "BANDIT", parseEther("1"), czusdPrice)));
  }, [lpInfos?.[PRICING_LP.CZR]?.tokens?.[0]])

  return (

    <CZFarmContext.Provider value={{
      czusdPrice, czfPrice, bnbPrice, czrPrice, czbPrice, banditPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, chronoTvlWei, exoticTvlWei, farmsV2TvlWei, poolsV1TvlWei, tribePoolsTvlWei,
      czbFarmsTvlWei, banditFarmsTvlWei, czusdNotesTvlWei,
      czbFarmsPoolInfo, banditFarmsPoolInfo,
      //React doesnt know how to properly check if bignumbers have changed, so use these to trigger refreshes
      updateCheckerViaStringChronoTvlWei: chronoTvlWei?.toString(),
      updateCheckerViaStringExoticTvlWei: exoticTvlWei?.toString(),
      updateCheckerViaStringFarmsV2TvlWei: farmsV2TvlWei?.toString(),
      updateCheckerViaStringPoolsV1TvlWei: poolsV1TvlWei?.toString(),
      updateCheckerViaStringTribePoolsV1TvlWei: tribePoolsTvlWei?.toString(),
      updateCheckerViaStringTribePoolsV1TvlWei: banditFarmsTvlWei?.toString(),
      updateCheckerViaStringTribePoolsV1TvlWei: czbFarmsTvlWei?.toString(),
    }}>
      {children}
    </CZFarmContext.Provider>
  );
};

export default CZFarmContext;