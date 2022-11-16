
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

import { createContext, useState } from 'react';

const CZFarmContext = createContext(0);

export const CZFarmProvider = ({ children }) => {
  const czusdPrice = useCoingeckoPrice("czusd");
  const czfPrice = useCoingeckoPrice("czfarm");
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const deapPrice = useCoingeckoPrice("deapcoin");
  const { library } = useEthers();


  const chronoVestingsTotalVesting = useChronoVestingsTotalVesting(library);
  const poolsV1TokenBalance = usePoolsV1TokenBalance(library);
  const tribePoolsInfo = useTribePoolInfo(library);
  const v2FarmsLpBal = useV2FarmsLpBal(library);
  const lpInfos = useLpInfo(library);

  const {
    chronoTvlWei,
    exoticTvlWei,
    farmsV2TvlWei,
    poolsV1TvlWei,
    tribePoolsTvlWei
  } = useTvlWei(czfPrice, czusdPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, tribePoolsInfo);

  return (
    <CZFarmContext.Provider value={{
      czusdPrice, czfPrice, bnbPrice, deapPrice, chronoVestingsTotalVesting, poolsV1TokenBalance, v2FarmsLpBal, lpInfos, chronoTvlWei, exoticTvlWei, farmsV2TvlWei, poolsV1TvlWei, tribePoolsTvlWei,
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