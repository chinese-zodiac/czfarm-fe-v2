
import React, { Component, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { useEthers, useCall, useEtherBalance, useTokenBalance  } from '@usedapp/core';
import {useCoingeckoPrice } from '@usedapp/coingecko';
import { utils, Contract, BigNumber } from 'ethers'
import useDeepCompareEffect from '../../utils/useDeepCompareEffect';
import {weiToShortString, weiToFixed, weiToUsdWeiVal} from '../../utils/bnDisplay';
import useV2FarmsSettings from '../../hooks/useV2FarmsSettings';
import useV2FarmsLpBal from '../../hooks/useV2FarmsLpBal';
import useV2FarmsPoolInfo from '../../hooks/useV2FarmsPoolInfo';
import useV2FarmsPendingCzf from '../../hooks/useV2FarmsPendingCzf';
import useV2FarmsUserInfo from '../../hooks/useV2FarmsUserInfo';
import useFarmLpBalances from '../../hooks/useFarmLpBalances';
import useChronoPoolInfo from '../../hooks/useChronoPoolInfo';
import useChronoPoolAccountInfo from '../../hooks/useChronoPoolAccountInfo';
import useExoticFarmInfo from '../../hooks/useExoticFarmInfo';
import useExoticFarmAccountInfo from '../../hooks/useExoticFarmAccountInfo';
import usePoolsV1Info from '../../hooks/usePoolsV1Info';
import usePoolsV1AccountInfo from '../../hooks/usePoolsV1AccountInfo';
import usePoolsV1TokenBalance from '../../hooks/usePoolsV1TokenBalance';
import {FARM_V2} from "../../constants/famsv2";
import {POOLS_V1} from "../../constants/poolsv1";
import { ADDRESS_CZF, ADDRESS_CZUSD, ADDRESS_MASTERROUTER } from '../../constants/addresses';
import WalletStatsBar from '../../components/WalletStatsBar';
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const {account,library,chainId} = useEthers();
  const czusdPrice = useCoingeckoPrice("czusd");
  const czfPrice = useCoingeckoPrice("czfarm");
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const deapPrice = useCoingeckoPrice("deapcoin");
  const accountEtherBalance = useEtherBalance(account);

  const czfBal = useTokenBalance(ADDRESS_CZF, account);
  const czusdBal = useTokenBalance(ADDRESS_CZUSD, account);

  const v2FarmsSettings = useV2FarmsSettings(library);
  const v2FarmsLpBal = useV2FarmsLpBal(library);
  const v2FarmsPoolInfo = useV2FarmsPoolInfo(library);
  const v2FarmsPendingCzf = useV2FarmsPendingCzf(library,account);
  const v2FarmsUserInfo = useV2FarmsUserInfo(library,account);
  const farmLpBalances = useFarmLpBalances(library,FARM_V2);
  const chronoPoolInfo = useChronoPoolInfo(library);
  const chronoPoolAccountInfo = useChronoPoolAccountInfo(library,account);
  const exoticFarmInfo = useExoticFarmInfo(library);
  const exoticFarmAccountInfo = useExoticFarmAccountInfo(library,account);
  const poolsV1Info = usePoolsV1Info(library);
  const poolsV1TokenBalance = usePoolsV1TokenBalance(library);
  const poolsV1AccountInfo = usePoolsV1AccountInfo(library,account);

  return (<>
    <Header {...{czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}} />
    <main id="main" className="hero has-text-centered has-background-special p-3">
      <WalletStatsBar {...{czfPrice, czusdPrice, czfBal, czusdBal, account, library, v2FarmsPendingCzf, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo}} />
      
      
      <div>
        <hr/>
        Farms V2 <br/>
        {v2FarmsSettings?.czfPerBlock?.toString()}<br/>
        {v2FarmsSettings?.totalAllocPoint?.toString()}<br/>
        {v2FarmsPoolInfo?.[2]?.pid?.toString()}<br/>
        {v2FarmsPoolInfo?.[2]?.lpToken?.toString()}<br/>
        {v2FarmsLpBal?.[2]?.lpBal?.toString()}<br/>
        {v2FarmsPendingCzf?.[2]?.pendingCzf?.toString()}<br/>
        {v2FarmsUserInfo?.[2]?.amount?.toString()}<br/>
        {farmLpBalances?.[2]?.token0Bal?.toString()}<br/>
        {farmLpBalances?.[2]?.token1Bal?.toString()}<br/>
        <br/>
        <hr/>
        Chrono Pools <br/>
        {chronoPoolInfo?.[3]?.vestPeriod?.toString()}<br/>
        {chronoPoolInfo?.[3]?.adjustedRateBasis?.toString()}<br/>
        {chronoPoolInfo?.[3]?.ffBasis?.toString()}<br/>
        {chronoPoolInfo?.[3]?.poolEmissionRate?.toString()}<br/>
        {chronoPoolAccountInfo?.[3]?.totalVesting?.toString()}<br/>
        {chronoPoolAccountInfo?.[3]?.emissionRate?.toString()}<br/>
        {chronoPoolAccountInfo?.[3]?.updateEpoch?.toString()}<br/>
        <br/>
        <hr/>
        Exotic Farms <br/>
        {exoticFarmInfo?.[3]?.vestPeriod?.toString()}<br/>
        {exoticFarmInfo?.[3]?.adjustedRateBasis?.toString()}<br/>
        {exoticFarmInfo?.[3]?.ffBasis?.toString()}<br/>
        {exoticFarmInfo?.[3]?.poolEmissionRate?.toString()}<br/>
        {exoticFarmInfo?.[3]?.czfPerLpWad?.toString()}<br/>
        {exoticFarmAccountInfo?.[3]?.totalVesting?.toString()}<br/>
        {exoticFarmAccountInfo?.[3]?.emissionRate?.toString()}<br/>
        {exoticFarmAccountInfo?.[3]?.updateEpoch?.toString()}<br/>
        <br/>
        <hr/>
        Pools V1 <br/>
        {poolsV1Info?.[3]?.timestampStart?.toString()}<br/>
        {poolsV1Info?.[3]?.timestampEnd?.toString()}<br/>
        {poolsV1Info?.[3]?.rewardPerSecond?.toString()}<br/>
        {poolsV1AccountInfo?.[3]?.amount?.toString()}<br/>
        {poolsV1AccountInfo?.[3]?.rewardDebt?.toString()}<br/>
        {poolsV1AccountInfo?.[3]?.pendingReward?.toString()}<br/>
      </div>
    </main>
    <Footer />
    
  </>);
}

export default Home
