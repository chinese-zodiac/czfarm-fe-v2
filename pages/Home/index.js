
import React, { Component, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import "./index.module.scss";
import { useEthers, useContractFunction, useCall, useEtherBalance  } from '@usedapp/core';
import {useCoingeckoPrice } from '@usedapp/coingecko';
import { utils, Contract } from 'ethers'
import useV2FarmsPoolInfo from '../../hooks/useV2FarmsPoolInfo';
import useV2FarmsPendingCzf from '../../hooks/useV2FarmsPendingCzf';
import useV2FarmsUserInfo from '../../hooks/useV2FarmsUserInfo';
import useFarmLpBalances from '../../hooks/useFarmLpBalances';
import useChronoPoolInfo from '../../hooks/useChronoPoolInfo';
import useChronoPoolAccountInfo from '../../hooks/useChronoPoolAccountInfo';
import useExoticFarmInfo from '../../hooks/useExoticFarmInfo';
import useExoticFarmAccountInfo from '../../hooks/useExoticFarmAccountInfo';
import {FARM_V2} from "../../constants/famsv2";
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();
  const czusdPrice = useCoingeckoPrice("czusd");
  const czfPrice = useCoingeckoPrice("czfarm");
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const accountEtherBalance = useEtherBalance(account);

  const v2FarmsPoolInfo = useV2FarmsPoolInfo(library);
  const v2FarmsPendingCzf = useV2FarmsPendingCzf(library,account);
  const v2FarmsUserInfo = useV2FarmsUserInfo(library,account);
  const farmLpBalances = useFarmLpBalances(library,FARM_V2);
  const chronoPoolInfo = useChronoPoolInfo(library);
  const chronoPoolAccountInfo = useChronoPoolAccountInfo(library,account);
  const exoticFarmInfo = useExoticFarmInfo(library);
  const exoticFarmAccountInfo = useExoticFarmAccountInfo(library,account);


  return (<>
    <Header {...{czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}} />
    <main id="main" className="hero has-text-centered has-background-special p-3">
      <div id="statsBar">
        <hr/>
        Farm.V2 <br/>
        {v2FarmsPoolInfo?.[2]?.pid?.toString()}<br/>
        {v2FarmsPoolInfo?.[2]?.lpToken?.toString()}<br/>
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
      </div>
    </main>
    <Footer />
    
  </>);
}

export default Home
