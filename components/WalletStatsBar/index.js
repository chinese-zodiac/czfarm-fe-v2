import React, {useState} from 'react';
import useDeepCompareEffect from '../../utils/useDeepCompareEffect';
import {useContractFunction} from '@usedapp/core';
import {weiToShortString, weiToUsdWeiVal, weiTolpPricedWeiVal} from '../../utils/bnDisplay';
import { czCashBuyLink } from '../../utils/dexBuyLink';
import {getHarvestablePidsChrono, getHarvestablePidsExotic, getHarvestablePidsV2Farms} from '../../utils/getHarvestablePids';
import { BigNumber, Contract } from 'ethers'
import masterRouterAbi from "../../abi/MasterRouter.json";
import {PRICING_LP} from "../../constants/pricingLp";
import {POOLS_V1} from "../../constants/poolsv1";
import {ADDRESS_EXOTICFARMS, ADDRESS_CHRONOPOOLS, ADDRESS_FARMMASTERV2, ADDRESS_MASTERROUTER, ADDRESS_CZF, ADDRESS_CZUSD} from "../../constants/addresses";
import styles from "./index.module.scss";
import {getDailyCzfWei, getDailyAccountTokensWei, getCzfHarvestableChrono, getCzfHarvestableExotic, getCzfHarvestableFarmsV2, getCzfHarvestablePoolsV1, getTokensHarvestable} from "../../utils/getAccountStats"
import HarvestV1PoolButton from '../HarvestV1PoolButton';

function WalletStatsBar({czfPrice, czusdPrice, czfBal, czusdBal, account, library, v2FarmsPendingCzf, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo,lpInfos}) {

  const [dailyCzfWei,setDailyCzfWei] = useState(BigNumber.from(0));
  const [dailyAccountTokensWei,setDailyAccountTokensWei] = useState([]);
  const [tokensHarvestable,setTokensHarvestable] = useState([]);

  const [czfHarvestableChrono,setCzfHarvestableChrono] = useState(BigNumber.from(0));
  const [czfHarvestableExotic,setCzfHarvestableExotic] = useState(BigNumber.from(0));
  const [czfHarvestableFarmsV2,setCzfHarvestableFarmsV2] = useState(BigNumber.from(0));
  const [czfHarvestablePoolsV1,setCzfHarvestablePoolsV1] = useState(BigNumber.from(0));

  const [harvestablePidsChrono,setHarvestablePidsChrono] = useState([]);
  const [harvestablePidsExotic,setHarvestablePidsExotic] = useState([]);
  const [harvestablePidsV2Farms,setHarvestablePidsV2Farms] = useState([]);

  
const { state:stateHarvestAll, send:sendHarvestAll } = useContractFunction(
  new Contract(ADDRESS_MASTERROUTER,masterRouterAbi,library),
  'claimAll');

  useDeepCompareEffect(()=>{
    if(!account) {
      setDailyCzfWei(BigNumber.from(0));
      setDailyAccountTokensWei([]);
      setTokensHarvestable([]);
      setCzfHarvestableChrono(BigNumber.from(0));
      setCzfHarvestableExotic(BigNumber.from(0));
      setCzfHarvestableFarmsV2(BigNumber.from(0));
      setCzfHarvestablePoolsV1(BigNumber.from(0));
      setHarvestablePidsChrono([]);
      setHarvestablePidsExotic([]);
      setHarvestablePidsV2Farms([]);
      return
    }
    setDailyCzfWei(getDailyCzfWei(v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo));
    setDailyAccountTokensWei(getDailyAccountTokensWei(poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo));
    setCzfHarvestableChrono(getCzfHarvestableChrono(chronoPoolAccountInfo));
    setCzfHarvestableExotic(getCzfHarvestableExotic(exoticFarmAccountInfo));
    setCzfHarvestableFarmsV2(getCzfHarvestableFarmsV2(v2FarmsPendingCzf));
    setCzfHarvestablePoolsV1(getCzfHarvestablePoolsV1(poolsV1AccountInfo));
    setTokensHarvestable(getTokensHarvestable(poolsV1AccountInfo));
    setHarvestablePidsChrono(getHarvestablePidsChrono(chronoPoolAccountInfo));
    setHarvestablePidsExotic(getHarvestablePidsExotic(exoticFarmAccountInfo));
    setHarvestablePidsV2Farms(getHarvestablePidsV2Farms(v2FarmsPendingCzf));
  },[account, v2FarmsPendingCzf, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo])

  return(<>
    <div className='columns is-3 is-variable'>
        <div className={"column p-5 pb-5 m-3 "+styles.UserTotalItem}>
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
            <h2 className='is-size-6 m-0' style={{fontWeight:"300"}}>In Your Wallet</h2>
        </div>
        <div className={"column p-5 m-3 "+styles.UserTotalItem}>
            <div className="columns is-mobile m-0">
              <div className="column has-text-right m-0 p-1">
                <p className='is-size-5 m-0'>CZF/day:</p>
                {dailyAccountTokensWei.map(tokenWei=>(
                  <p key={tokenWei.name} className='is-size-5 m-0'>{tokenWei.name}/day:</p>
                ))}
              </div>
              <div className="column has-text-left m-0 p-1">
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(dailyCzfWei,2)}
                  <span className="is-size-7 ml-1">(${weiToShortString(weiToUsdWeiVal(dailyCzfWei,czfPrice),2)})</span>
                </p>
                {dailyAccountTokensWei.map(tokenWei=>(
                  <p key={tokenWei.name} className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(tokenWei.rewardPerDay,2)}<span className="is-size-7 ml-1">($
                    {tokenWei.name=="CZUSD" ? 
                      weiToShortString(weiToUsdWeiVal(tokenWei.rewardPerDay,czusdPrice),2) :
                      (!!PRICING_LP[tokenWei.name] &&
                        weiToShortString(
                          weiTolpPricedWeiVal(lpInfos,tokenWei?.name,tokenWei?.rewardPerDay,czfPrice,czusdPrice) 
                        ,2)
                      )
                    }
                    )
                  </span></p>
                ))}
              </div>
            </div>
            <h2 className='is-size-6 m-0' style={{fontWeight:"300"}}>Your Daily Harvest</h2>
        </div>
        <div className={"column p-5 m-3 "+styles.UserTotalItem}>
            <div className="columns is-mobile m-0">
              <div className="column has-text-right m-0 p-1">
                <p className='is-size-5 m-0'>CZF:</p>
                {tokensHarvestable.map(tokenWei=>(
                  <p key={tokenWei.name} className='is-size-5 m-0'>{tokenWei.name}:</p>
                ))}
              </div>
              <div className="column has-text-left m-0 p-1">
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>
                  {weiToShortString(czfHarvestableChrono.add(czfHarvestableExotic).add(czfHarvestableFarmsV2).add(czfHarvestablePoolsV1),2)}
                  <span className="is-size-7 ml-1">(${weiToShortString(weiToUsdWeiVal(czfHarvestableChrono?.add(czfHarvestableExotic).add(czfHarvestableFarmsV2).add(czfHarvestablePoolsV1),czfPrice),2)})</span>
                </p>
                {tokensHarvestable.map(tokenWei=>(
                  <p key={tokenWei.name} className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(tokenWei.tokenHarvestable,2)}
                  <span className="is-size-7 ml-1">($
                    {tokenWei.name=="CZUSD" ? 
                      weiToShortString(weiToUsdWeiVal(tokenWei.tokenHarvestable,czusdPrice),2) :
                      (!!PRICING_LP[tokenWei.name] &&
                        weiToShortString(
                          weiTolpPricedWeiVal(lpInfos,tokenWei?.name,tokenWei?.tokenHarvestable,czfPrice,czusdPrice) 
                        ,2)
                      )
                    }
                    )
                  </span>
                </p>
                ))}
              </div>
            </div>
            <h2 className='is-size-6 m-0' style={{fontWeight:"300"}}>Your Estimated Harvestable</h2>
        </div>
      </div>
      <div style={{marginLeft:"auto",marginRight:"auto"}} >
        <a className='button is-medium is-rounded is-outlined is-primary m-3' href={czCashBuyLink(ADDRESS_CZF)} target="_blank" >Buy CZF</a>
        <a className='button is-medium is-rounded is-outlined is-primary m-3' href={czCashBuyLink(ADDRESS_CZF)} target="_blank" >Buy CZUSD</a>
        <br/>
        {!!account && (<>
          <button className='button is-medium  is-rounded is-primary m-3' style={{marginLeft:"auto",marginRight:"auto"}} 
          onClick={()=>{
            sendHarvestAll(
              ADDRESS_CHRONOPOOLS,
              harvestablePidsChrono,
              ADDRESS_EXOTICFARMS,
              harvestablePidsExotic,
              ADDRESS_FARMMASTERV2,
              harvestablePidsV2Farms
            );
          }}
          >Harvest All {weiToShortString(czfHarvestableChrono.add(czfHarvestableExotic).add(czfHarvestableFarmsV2),2)} CZF
          </button>
          <p>Harvest All currently only supports Chrono, Exotic, and Farms V2. Pools v1 must be harvested individually.</p>
          {POOLS_V1.map((pool,index)=>{
          const accountInfo = poolsV1AccountInfo?.[index];
          if(!!accountInfo?.pendingReward && accountInfo?.pendingReward.gt(0)) {
              return (<HarvestV1PoolButton key={pool.address}
                {...{library}}
                pendingReward={accountInfo.pendingReward}
                assetName={pool.rewardAssetName}
                poolAddress={pool.address}
              />)
            }
          })}
        </>)}

      </div >
  </>)
}

export default WalletStatsBar