
import React, { Component, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import styles from "./index.module.scss";
import { useEthers, useContractFunction, useCall, useEtherBalance, useTokenBalance  } from '@usedapp/core';
import {useCoingeckoPrice } from '@usedapp/coingecko';
import { utils, Contract, BigNumber } from 'ethers'
import {weiToShortString, weiToFixed, weiToUsdWeiVal} from '../../utils/bnDisplay';
import useDeepCompareEffect from '../../utils/useDeepCompareEffect';
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
import {FARM_V2} from "../../constants/famsv2";
import { ADDRESS_CZF, ADDRESS_CZUSD } from '../../constants/addresses';
const { formatEther, parseEther, Interface } = utils;

const getDailyCzfWei = (v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1AccountInfo) => {
  if(!v2FarmsPoolInfo || !v2FarmsUserInfo || !chronoPoolAccountInfo || !exoticFarmAccountInfo || !poolsV1AccountInfo) return BigNumber.from("0");
   //TODO: Get current reward per second for v2 farms to properly calculate rewards per second for account
   let chronoRps = chronoPoolAccountInfo.reduce((total,curr)=>total = curr?.emissionRate?.add(total),BigNumber.from("0")) ?? BigNumber.from("0");
   let exoticRps = exoticFarmAccountInfo.reduce((total,curr)=>total = curr?.emissionRate?.add(total),BigNumber.from("0")) ?? BigNumber.from("0");
   //TODO: Get current rps for v1 pools - only czf
   return chronoRps.add(exoticRps).mul(BigNumber.from("86400")); //86400 seconds per day
}

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();
  const czusdPrice = useCoingeckoPrice("czusd");
  const czfPrice = useCoingeckoPrice("czfarm");
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const deapPrice = useCoingeckoPrice("deapcoin");
  const accountEtherBalance = useEtherBalance(account);

  const czfBal = useTokenBalance(ADDRESS_CZF, account);
  const czusdBal = useTokenBalance(ADDRESS_CZUSD, account);

  const v2FarmsPoolInfo = useV2FarmsPoolInfo(library);
  const v2FarmsPendingCzf = useV2FarmsPendingCzf(library,account);
  const v2FarmsUserInfo = useV2FarmsUserInfo(library,account);
  const farmLpBalances = useFarmLpBalances(library,FARM_V2);
  const chronoPoolInfo = useChronoPoolInfo(library);
  const chronoPoolAccountInfo = useChronoPoolAccountInfo(library,account);
  const exoticFarmInfo = useExoticFarmInfo(library);
  const exoticFarmAccountInfo = useExoticFarmAccountInfo(library,account);
  const poolsV1Info = usePoolsV1Info(library);
  const poolsV1AccountInfo = usePoolsV1AccountInfo(library,account);

  const [dailyCzfWei,setDailyCzfWei] = useState(BigNumber.from("0"));

  useDeepCompareEffect(()=>{
    if(!account) {
      setDailyCzfWei(BigNumber.from("0"));
      return
    }
    setDailyCzfWei(getDailyCzfWei(v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1AccountInfo))
  },[account,v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1AccountInfo])


  return (<>
    <Header {...{czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}} />
    <main id="main" className="hero has-text-centered has-background-special p-3">
      <div className='columns is-3 is-variable'>
        <div className={"column pt-5 pb-5 m-3 "+styles.UserTotalItem}>
            <div className="columns is-mobile m-0">
              <div className="column has-text-right m-0 p-1">
                <p className='is-size-5 m-0'>CZF:</p>
                <p className='is-size-5 m-0'>CZUSD:</p>
              </div>
              <div className="column has-text-left m-0 p-1">
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(czfBal,2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czfBal,czfPrice),2)})</span></p>
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(czusdBal,2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czusdBal,czusdPrice),2)})</span></p>
              </div>
            </div>
            <h2 className='is-size-6 m-0' style={{fontWeight:"300"}}>Your Balances</h2>
        </div>
        <div className={"column pt-5 pb-5 m-3 "+styles.UserTotalItem}>
            <div className="columns is-mobile m-0">
              <div className="column has-text-right m-0 p-1">
                <p className='is-size-5 m-0'>CZF/day:</p>
                <p className='is-size-5 m-0'>CZUSD/day:</p>
              </div>
              <div className="column has-text-left m-0 p-1">
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(dailyCzfWei,2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(dailyCzfWei,czfPrice),2)})</span></p>
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{"0.00"} <span className="is-size-7">(${"0.00"})</span></p>
              </div>
            </div>
            <h2 className='is-size-6 m-0' style={{fontWeight:"300"}}>Your Earning Rate</h2>
        </div>
      </div>
      <div>



        <hr/>
        Farms V2 <br/>
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
