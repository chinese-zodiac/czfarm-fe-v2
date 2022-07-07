
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
import CZFLogo from "../../public/static/assets/logo192.png"
import {CHRONO_POOL} from "../../constants/chronoPool";
import {EXOTIC_FARMS} from "../../constants/exoticFarms";
import {FARM_V2} from "../../constants/famsv2";
import {POOLS_V1} from "../../constants/poolsv1";
import { ADDRESS_CZF, ADDRESS_CZUSD, ADDRESS_MASTERROUTER } from '../../constants/addresses';
import WalletStatsBar from '../../components/WalletStatsBar';
import styles from "./index.module.scss";
import CollapsibleCard from '../../components/CollapsibleCard';
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
      <CollapsibleCard className={"mt-5 mb-5 has-text-left "+styles.StakingSection} title={(
        <p className="is-size-4 has-text-white has-text-left has-text-weight-normal">Chrono Pools</p>
      )}>
        <p className="mt-2 mb-2 ml-1" >Burn CZF, Get CZF every second.</p>
        {CHRONO_POOL.map((pool)=>(
          <CollapsibleCard className="mb-3" key={pool.pid} title={(<div className='has-text-white pb-2 pt-2 level is-mobile'>
            <div className="column is-narrow is-mobile level-item level m-0 p-0 pt-1 mr-2">
              <figure className="image is-32x32 is-inline-block m-0 p-0 level-item">
                  <img src={CZFLogo} />
              </figure>
              <span className='icon m-0 p-0 level-item' style={{width:"0.6em"}}><i className="fa-solid fa-angle-right level-item"></i></span>
              <figure className="image is-32x32 is-inline-block m-0 p-0 level-item">
                  <img src={CZFLogo} />
              </figure>
            </div>
            <div className='column has-text-weight-light level-item m-0 p-0' style={{lineHeight:"1.2em",whiteSpace:"nowrap",width:"8.5em"}}>
              <span className='is-size-7 has-text-grey'>DURATION</span><br/>
              <span className='is-size-5'>{pool.title}</span>
            </div>
            <div className='column has-text-weight-light level-item m-0 p-0' style={{lineHeight:"1.2em"}}>
              <span className='is-size-7 has-text-grey'>APR</span><br/>
              <span className='is-size-5'>0.00%</span>
            </div>
          </div>)}>
          </CollapsibleCard>
        ))}
      </CollapsibleCard>
    </main>
    <Footer />
    
  </>);
}

export default Home
