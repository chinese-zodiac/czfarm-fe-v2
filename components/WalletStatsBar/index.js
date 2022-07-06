import React, {useState} from 'react';
import useDeepCompareEffect from '../../utils/useDeepCompareEffect';
import {useContractFunction} from '@usedapp/core';
import {weiToShortString, weiToUsdWeiVal} from '../../utils/bnDisplay';
import {getHarvestablePidsChrono, getHarvestablePidsExotic, getHarvestablePidsV2Farms} from '../../utils/getHarvestablePids';
import { BigNumber, Contract } from 'ethers'
import masterRouterAbi from "../../abi/MasterRouter.json";
import {ADDRESS_EXOTICFARMS, ADDRESS_CHRONOPOOLS, ADDRESS_FARMMASTERV2, ADDRESS_MASTERROUTER} from "../../constants/addresses";
import styles from "./index.module.scss";
import {getDailyCzfWei, getDailyAccountTokensWei, getCzfHarvestable, getTokensHarvestable} from "../../utils/getAccountStats"

function WalletStatsBar({czfPrice, czusdPrice, czfBal, czusdBal, account, library, v2FarmsPendingCzf, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo}) {

  const [dailyCzfWei,setDailyCzfWei] = useState(BigNumber.from(0));
  const [dailyAccountTokensWei,setDailyAccountTokensWei] = useState([]);
  const [czfHarvestable,setCzfHarvestable] = useState(BigNumber.from(0));
  const [tokensHarvestable,setTokensHarvestable] = useState([]);

  const [harvestablePidsChrono,setHarvestablePidsChrono] = useState([]);
  const [harvestablePidsExotic,setHarvestablePidsExotic] = useState([]);
  const [harvestablePidsV2Farms,setHarvestablePidsV2Farms] = useState([]);

  
const { state:stateHarvestAll, send:sendHarvestAll } = useContractFunction(
  new Contract(ADDRESS_MASTERROUTER,masterRouterAbi,library),
  'claimAll');

  useDeepCompareEffect(()=>{
    if(!account) {
      setDailyCzfWei(BigNumber.from("0"));
      setDailyAccountTokensWei([]);
      setCzfHarvestable(BigNumber.from("0"));
      setTokensHarvestable([]);
      setHarvestablePidsChrono([]);
      setHarvestablePidsExotic([]);
      setHarvestablePidsV2Farms([]);
      return
    }
    setDailyCzfWei(getDailyCzfWei(v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, v2FarmsUserInfo, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo));
    setDailyAccountTokensWei(getDailyAccountTokensWei(poolsV1Info, poolsV1TokenBalance, poolsV1AccountInfo));
    setCzfHarvestable(getCzfHarvestable(v2FarmsPendingCzf, chronoPoolAccountInfo, exoticFarmAccountInfo, poolsV1AccountInfo));
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
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(dailyCzfWei,2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(dailyCzfWei,czfPrice),2)})</span></p>
                {dailyAccountTokensWei.map(tokenWei=>(
                  <p key={tokenWei.name} className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(tokenWei.rewardPerDay,2)}</p>
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
                <p className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(czfHarvestable,2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czfHarvestable,czfPrice),2)})</span></p>
                {tokensHarvestable.map(tokenWei=>(
                  <p key={tokenWei.name} className='is-size-5 m-0' style={{whiteSpace:"nowrap"}}>{weiToShortString(tokenWei.tokenHarvestable,2)}</p>
                ))}
              </div>
            </div>
            <h2 className='is-size-6 m-0' style={{fontWeight:"300"}}>Your Estimated Harvestable</h2>
        </div>
      </div>
      {!!account && (
        <button className='button is-medium  is-rounded is-primary' style={{marginLeft:"auto",marginRight:"auto"}} 
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
        >Harvest Chrono, Exotic, FarmsV2 CZF</button>
      )}
  </>)
}

export default WalletStatsBar