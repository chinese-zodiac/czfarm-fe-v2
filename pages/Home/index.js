
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
import useChronoVestingsTotalVesting from '../../hooks/useChronoVestingsTotalVesting';
import { getLpTokenValueUsdWad } from '../../utils/getLpTokenValueUsdWad';
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

  const chronoVestingsTotalVesting = useChronoVestingsTotalVesting(library);

  const [chronoTvlWei,setChronoTvlWei] = useState(BigNumber.from(0));
  const [exoticTvlWei,setExoticTvlWei] = useState(BigNumber.from(0));
  const [farmsV2TvlWei,setFarmsv2TvlWei] = useState(BigNumber.from(0));
  const [poolsV1TvlWei,setPoolsV1TvlWei] = useState(BigNumber.from(0));

  const [chronoAccountStakeWei,setChronoAccountStakeWei] = useState(BigNumber.from(0));
  const [exoticAccountStakeWei,setExoticAccountStakeWei] = useState(BigNumber.from(0));
  const [farmsV2AccountStakeWei,setFarmsv2AccountStakeWei] = useState(BigNumber.from(0));
  const [poolsV1AccountStakeWei,setPoolsV1AccountStakeWei] = useState(BigNumber.from(0));

  useDeepCompareEffect(()=>{
    if(!account || !chronoPoolAccountInfo || !exoticFarmAccountInfo || !lpInfos || !v2FarmsUserInfo) {
      setChronoAccountStakeWei(BigNumber.from(0));
      setExoticAccountStakeWei(BigNumber.from(0));
      setFarmsv2AccountStakeWei(BigNumber.from(0));
      setPoolsV1AccountStakeWei(BigNumber.from(0));
      return;
    }

    setChronoAccountStakeWei(
      weiToUsdWeiVal(chronoPoolAccountInfo.reduce((prev,curr)=>prev.add(curr?.totalVesting ?? 0),BigNumber.from(0)),czfPrice)
    );

    setExoticAccountStakeWei(
      weiToUsdWeiVal(exoticFarmAccountInfo.reduce((prev,curr)=>prev.add(curr?.totalVesting ?? 0),BigNumber.from(0)),czfPrice)
    );
    
    setFarmsv2AccountStakeWei(
      FARM_V2.reduce((prev,curr,index)=>{
        const symbol = curr.tokens[0].symbol;
        const lpInfo = lpInfos?.[curr.lp];
        const lpBal = v2FarmsUserInfo?.[index]?.amount;
        return prev.add(getLpTokenValueUsdWad(symbol, lpInfo, lpBal, czfPrice, czusdPrice) ?? 0);
      },BigNumber.from(0))
    );

    setPoolsV1AccountStakeWei(
      poolsV1AccountInfo.reduce((prev,curr,index)=>prev.add(weiToUsdWeiVal(curr?.amount,POOLS_V1[index].baseAssetName == "CZF" ? czfPrice : czusdPrice)),BigNumber.from(0))
    )

  },[account, chronoPoolAccountInfo, exoticFarmAccountInfo, lpInfos, v2FarmsUserInfo, poolsV1AccountInfo, czfPrice, czusdPrice])

  useDeepCompareEffect(()=>{
    if(!czfPrice || !czusdPrice || !chronoVestingsTotalVesting || !poolsV1TokenBalance || !v2FarmsLpBal || !lpInfos) {
      setChronoTvlWei(BigNumber.from(0));
      setExoticTvlWei(BigNumber.from(0));
      setFarmsv2TvlWei(BigNumber.from(0));
      setPoolsV1TvlWei(BigNumber.from(0));
      return;
    }

    setChronoTvlWei(
      weiToUsdWeiVal(CHRONO_POOL.map((pool)=>pool.chronoVesting)
        .reduce((prev,curr)=>prev.add(chronoVestingsTotalVesting?.[curr] ?? 0),BigNumber.from(0)),czfPrice)
    );
    setExoticTvlWei(
      weiToUsdWeiVal(EXOTIC_FARMS.flatMap((farmSet)=>farmSet.farms.map(farm=>farm.chronoVesting))
        .reduce((prev,curr)=>prev.add(chronoVestingsTotalVesting?.[curr] ?? 0),BigNumber.from(0)),czfPrice)
    );
    setFarmsv2TvlWei(FARM_V2.reduce((prev,curr,index)=>prev.add(
      getLpTokenValueUsdWad(curr.tokens[0].symbol ?? "CZF",lpInfos?.[curr.lp],v2FarmsLpBal?.[index]?.lpBal,czfPrice,czusdPrice)
    ),BigNumber.from(0)));
    setPoolsV1TvlWei(
      POOLS_V1.reduce((prev,curr,index)=>prev.add(
        weiToUsdWeiVal(poolsV1TokenBalance?.[index]?.tokenBal,curr.baseAssetName == "CZF" ? czfPrice : czusdPrice)
      ),BigNumber.from(0))      
    );
  },[czfPrice,czusdPrice,chronoVestingsTotalVesting,poolsV1TokenBalance,v2FarmsLpBal,lpInfos])

  return (<>
    <Header {...{czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}} 
      tvlWei={chronoTvlWei.add(exoticTvlWei).add(farmsV2TvlWei).add(poolsV1TvlWei)}
    />
    <main id="main" className="hero has-text-centered has-background-special p-3 pb-5 is-justify-content-flex-start " style={{minHeight:"100vh"}}>

      <WalletStatsBar {...{czfPrice, czusdPrice, czfBal, czusdBal, account, library, v2FarmsPendingCzf, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo,lpInfos,currentEpoch,
        chronoAccountStakeWei, exoticAccountStakeWei, farmsV2AccountStakeWei, poolsV1AccountStakeWei
      }} />
      
      <CollapsibleCard className={"mt-5 mb-3 has-text-left "+styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{width:"100%"}}>
        <img className="column is-3" src="./static/assets/images/sections/chrono.png" style={{borderRadius:"1.5em",objectFit:"cover"}} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Chrono Pools<br/>
          <span className='is-size-6' >Burn CZF, Get CZF every second.</span>
        </p>
      </div>)}>
        {CHRONO_POOL.map((pool,index)=>(
          <ManageChronoPool key={pool.pid}
            {...{account,library,pool,currentEpoch,czfBal,czfPrice}}
            poolInfo={chronoPoolInfo?.[index]}
            poolAccountInfo={chronoPoolAccountInfo?.[index]}
            totalVesting={chronoVestingsTotalVesting?.[pool.chronoVesting]}
          />
        ))}
        <p className="has-text-right pr-2">Your Chrono Vesting: ${weiToShortString(chronoAccountStakeWei,2)}</p>
        <p className="has-text-right pr-2">Chrono Pools TVL: ${weiToShortString(chronoTvlWei,2)}</p>
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left "+styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{width:"100%"}}>
        <img className="column is-3" src="./static/assets/images/sections/exotic.png" style={{borderRadius:"1.5em",objectFit:"cover"}} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Exotic Farms<br/>
          <span className='is-size-6' >Give LP to CZodiac Treasury, Get CZF every second.</span>
        </p>
      </div>
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
                totalVesting={chronoVestingsTotalVesting?.[farm.chronoVesting]}
              />)
          })}
        </div>))}
        <p className="has-text-right pr-2">Your Exotic Vesting: ${weiToShortString(exoticAccountStakeWei,2)}</p>
        <p className="has-text-right pr-2">Exotic Farms TVL: ${weiToShortString(exoticTvlWei,2)}</p>
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left "+styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{width:"100%"}}>
        <img className="column is-3" src="./static/assets/images/sections/farmsv2.png" style={{borderRadius:"1.5em",objectFit:"cover"}} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Farms V2<br/>
          <span className='is-size-6' >Stake LP, Get CZF every second.</span>
        </p>
      </div>
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
        <p className="has-text-right pr-2">Your Farms V2 Staked: ${weiToShortString(farmsV2AccountStakeWei,2)}</p>
        <p className="has-text-right pr-2">Farms V2 TVL: ${weiToShortString(farmsV2TvlWei,2)}</p>
      </CollapsibleCard>

      <CollapsibleCard className={"mt-3 mb-3 has-text-left "+styles.StakingSection} title={(<div className="columns pb-3 pt-4 mr-2" style={{width:"100%"}}>
        <img className="column is-3" src="./static/assets/images/sections/poolsv1.png" style={{borderRadius:"1.5em",objectFit:"cover"}} />
        <p className="column is-9 is-size-4 has-text-white has-text-left has-text-weight-normal pt-2" style={{lineHeight:"1em"}}>Pools V1<br/>
          <span className='is-size-6' >Stake CZF or CZUSD, Get partner tokens every second.</span>
        </p>
      </div>
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
        <p className="has-text-right pr-2">Your Pools V1 Staked: ${weiToShortString(poolsV1AccountStakeWei,2)}</p>
        <p className="has-text-right pr-2">Pools V1 TVL: ${weiToShortString(poolsV1TvlWei,2)}</p>
      </CollapsibleCard>

    </main>
    <Footer />
    
  </>);
}

export default Home
