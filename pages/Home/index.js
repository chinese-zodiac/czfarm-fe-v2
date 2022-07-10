
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
import useChronoPoolInfo from '../../hooks/useChronoPoolInfo';
import useChronoPoolAccountInfo from '../../hooks/useChronoPoolAccountInfo';
import useExoticFarmInfo from '../../hooks/useExoticFarmInfo';
import useExoticFarmAccountInfo from '../../hooks/useExoticFarmAccountInfo';
import usePoolsV1Info from '../../hooks/usePoolsV1Info';
import usePoolsV1AccountInfo from '../../hooks/usePoolsV1AccountInfo';
import usePoolsV1TokenBalance from '../../hooks/usePoolsV1TokenBalance';
import useAccountLpBals from '../../hooks/useAccountLpBals';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useLpInfo from '../../hooks/useLpInfo';
import CZFLogo from "../../public/static/assets/logo192.png"
import {CHRONO_POOL} from "../../constants/chronoPool";
import {EXOTIC_FARMS} from "../../constants/exoticFarms";
import {FARM_V2} from "../../constants/famsv2";
import {POOLS_V1} from "../../constants/poolsv1";
import {LINK_TELEGRAM} from "../../constants/links";
import { ADDRESS_CZF, ADDRESS_CZUSD, ADDRESS_MASTERROUTER } from '../../constants/addresses';
import WalletStatsBar from '../../components/WalletStatsBar';
import styles from "./index.module.scss";
import CollapsibleCard from '../../components/CollapsibleCard';
import InputTokenEther from '../../components/InputTokenEther';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import ManageChronoPool from '../../components/ManageChronoPool';
import { czCashAddLink } from '../../utils/dexBuyLink';
import ManageExoticFarm from '../../components/ManageExoticFarm';
import ManageFarmV2 from '../../components/ManageFarmV2';
import ManagePoolV1 from '../../components/ManagePoolV1';
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const {account,library,chainId} = useEthers();
  const czusdPrice = useCoingeckoPrice("czusd");
  const czfPrice = useCoingeckoPrice("czfarm");
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const deapPrice = useCoingeckoPrice("deapcoin");
  const accountEtherBalance = useEtherBalance(account);

  const currentEpoch = useCurrentEpoch();

  const czfBal = useTokenBalance(ADDRESS_CZF, account);
  const czusdBal = useTokenBalance(ADDRESS_CZUSD, account);

  const v2FarmsSettings = useV2FarmsSettings(library);
  const v2FarmsLpBal = useV2FarmsLpBal(library);
  const v2FarmsPoolInfo = useV2FarmsPoolInfo(library);
  const v2FarmsPendingCzf = useV2FarmsPendingCzf(library,account);
  const v2FarmsUserInfo = useV2FarmsUserInfo(library,account);
  const chronoPoolInfo = useChronoPoolInfo(library);
  const chronoPoolAccountInfo = useChronoPoolAccountInfo(library,account);
  const exoticFarmInfo = useExoticFarmInfo(library);
  const exoticFarmAccountInfo = useExoticFarmAccountInfo(library,account);
  const poolsV1Info = usePoolsV1Info(library);
  const poolsV1TokenBalance = usePoolsV1TokenBalance(library);
  const poolsV1AccountInfo = usePoolsV1AccountInfo(library,account);
  const accountLpBals = useAccountLpBals(library,account);
  const lpInfos = useLpInfo(library);

  return (<>
    <Header {...{czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}} />
    <main id="main" className="hero has-text-centered has-background-special p-3 pb-5 is-justify-content-flex-start " style={{minHeight:"100vh"}}>

      <WalletStatsBar {...{czfPrice, czusdPrice, czfBal, czusdBal, account, library, v2FarmsPendingCzf, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo,lpInfos}} />
      
      <CollapsibleCard className={"mt-5 mb-3 has-text-left "+styles.StakingSection} title={(
        <p className="is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Chrono Pools<br/>
          <span className='is-size-6' >Burn CZF, Get CZF every second.</span>
        </p>
      )}>
        {CHRONO_POOL.map((pool,index)=>(
          <ManageChronoPool key={pool.pid}
            {...{account,library,pool,currentEpoch,czfBal,czfPrice}}
            poolInfo={chronoPoolInfo?.[index]}
            poolAccountInfo={chronoPoolAccountInfo?.[index]}
          />
        ))}
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left "+styles.StakingSection} title={(
        <p className="is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Exotic Farms<br/>
          <span className='is-size-6' >Give LP to CZodiac Treasury, Get CZF every second.</span>
        </p>
      )}>
        {EXOTIC_FARMS.map((farmSet,farmSetIndex)=>(<div className='m-0 p-0' key={"farmset-"+farmSetIndex}>
          <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>{farmSet?.title}</h4>
          <a className="has-text-primary" style={{textDecoration:"underline"}} 
            href={czCashAddLink(farmSet?.tokens?.[0]?.address,farmSet?.tokens?.[1]?.address)} target="_blank">
            Mint {farmSet?.tokens?.[0]?.symbol}/{farmSet?.tokens?.[1]?.symbol} on CZ.Cash <span className="icon"><i className="fa-solid fa-up-right-from-square"></i></span>
          </a>
          {farmSet?.farms.map((farm,farmIndex)=>{
            const infoIndex = farmSetIndex*3+farmIndex;
            return (
              <ManageExoticFarm key={farmSetIndex+"-"+farm.pid}
                {...{account,library,currentEpoch,farm,farmSet,czusdPrice,czfPrice}}
                farmInfo={exoticFarmInfo?.[infoIndex]}
                farmAccountInfo={exoticFarmAccountInfo?.[infoIndex]}
                lpBal={accountLpBals?.[farmSet.lp]}
                lpInfo={lpInfos?.[farmSet.lp]}
              />)
          })}
        </div>))}
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left "+styles.StakingSection} title={(
        <p className="is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Farms V2<br/>
          <span className='is-size-6' >Stake LP, Get CZF every second.</span>
        </p>
      )}>
        {FARM_V2.map((farm,index)=>(
          <ManageFarmV2 key={farm.pid} 
            {...{account,library,farm,accountLpBals,czfPrice,czusdPrice,v2FarmsSettings}}
            v2FarmsLpBal={v2FarmsLpBal?.[index]}
            v2FarmsPoolInfo={v2FarmsPoolInfo?.[index]}
            v2FarmsPendingCzf={v2FarmsPendingCzf?.[index]}
            v2FarmsUserInfo={v2FarmsUserInfo?.[index]}
            lpInfo={lpInfos?.[farm?.lp]}
            accountLpBal={accountLpBals?.[farm?.lp]}
          />
        ))}
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left "+styles.StakingSection} title={(
        <p className="is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Pools V1<br/>
          <span className='is-size-6' >Stake CZF or CZUSD, Get partner tokens every second.</span>
        </p>
      )}>
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>ACTIVE</h4>
        {POOLS_V1.map((pool,index)=>{
          const poolInfo = poolsV1Info?.[index];
          if(!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampStart.lte(currentEpoch) && poolInfo.timestampEnd.gte(currentEpoch)) {
              return (<ManagePoolV1 key={pool.address} 
                {...{account,library,currentEpoch,pool,czfBal,czusdBal,czfPrice,czusdPrice}}
                accountInfo={poolsV1AccountInfo?.[index]}
                poolInfo={poolInfo}
                poolTokenBalance={poolsV1TokenBalance?.[index]}
                isActive
              />)
            }
          })}
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>LAUNCHING</h4>
        {POOLS_V1.map((pool,index)=>{
          const poolInfo = poolsV1Info?.[index];
          if(!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampStart.gte(currentEpoch)) {
              return (<ManagePoolV1 key={pool.address} 
                {...{account,library,currentEpoch,pool,czfBal,czusdBal,czfPrice,czusdPrice}}
                accountInfo={poolsV1AccountInfo?.[index]}
                poolInfo={poolInfo}
                poolTokenBalance={poolsV1TokenBalance?.[index]}
                isLaunching
              />)
            }
          })}
        <h4 className='is-size-5 has-text-grey-light mt-4 mb-0'>EXPIRED</h4>
        {POOLS_V1.map((pool,index)=>{
          const poolInfo = poolsV1Info?.[index];
          if(!!poolInfo?.timestampStart && !!poolInfo?.timestampEnd && !!currentEpoch &&
            poolInfo.timestampEnd.lte(currentEpoch)) {
              return (<ManagePoolV1 key={pool.address} 
                {...{account,library,currentEpoch,pool,czfBal,czusdBal,czfPrice,czusdPrice}}
                accountInfo={poolsV1AccountInfo?.[index]}
                poolInfo={poolInfo}
                poolTokenBalance={poolsV1TokenBalance?.[index]}
                isExpired
              />)
            }
          })}
      </CollapsibleCard>

    </main>
    <Footer />
    
  </>);
}

export default Home
