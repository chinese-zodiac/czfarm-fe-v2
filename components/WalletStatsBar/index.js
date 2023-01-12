import React, { useState, useEffect } from 'react';
import useDeepCompareEffect from '../../utils/useDeepCompareEffect';
import { useContractFunction, useCall } from '@usedapp/core';
import { weiToShortString, weiToUsdWeiVal, weiTolpCzusdPricedWeiVal } from '../../utils/bnDisplay';
import { czCashBuyLink } from '../../utils/dexBuyLink';
import { BigNumber, Contract, utils } from 'ethers'
import { PRICING_LP } from "../../constants/pricingLp";
import { ADDRESS_CZR, ADDRESS_CZUSD } from "../../constants/addresses";
import styles from "./index.module.scss";
import { getDailyAccountTokensWei, getTokensHarvestable, getCzrHarvestableBurnPools } from "../../utils/getAccountStats"
const { formatEther, parseEther, Interface } = utils;

function WalletStatsBar({ czrPrice, czusdPrice, czrBal, czusdBal, account, tribePoolInfo, tribePoolAccountInfo, tribePoolAccountStakeWei, lpInfos, burnPoolInfo, burnPoolAccountInfo }) {

  const [dailyAccountTokensWei, setDailyAccountTokensWei] = useState([]);
  const [tokensHarvestable, setTokensHarvestable] = useState([]);

  const [czrHarvestableBurnPools, setCzrHarvestableBurnPools] = useState(BigNumber.from(0));

  useDeepCompareEffect(() => {
    if (!account) {
      setDailyAccountTokensWei([]);
      setTokensHarvestable([]);
      setCzrHarvestableBurnPools(BigNumber.from(0));
      return
    }
    setDailyAccountTokensWei(getDailyAccountTokensWei(tribePoolInfo, tribePoolAccountInfo, burnPoolInfo, burnPoolAccountInfo));
    setCzrHarvestableBurnPools(getCzrHarvestableBurnPools(burnPoolAccountInfo));
    setTokensHarvestable(getTokensHarvestable(tribePoolAccountInfo));
  }, [account, tribePoolInfo, tribePoolAccountInfo, burnPoolInfo, burnPoolAccountInfo]);

  return (<>
    <div className='columns is-3 is-variable'>
      <div className={"column p-5 pb-5 m-3 " + styles.UserTotalItem}>
        <div className="columns is-mobile m-0">
          <div className="column has-text-right m-0 p-1">
            <p className='is-size-5 m-0'>CZRED:</p>
            <p className='is-size-5 m-0'>CZUSD:</p>
          </div>
          <div className="column has-text-left m-0 p-1">
            <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(czrBal, 2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czrBal, czrPrice), 2)})</span></p>
            <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(czusdBal, 2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czusdBal, czusdPrice), 2)})</span></p>
          </div>
        </div>
        <h2 className='is-size-6 m-0' style={{ fontWeight: "300" }}>In Your Wallet</h2>
      </div>
      <div className={"column p-5 m-3 " + styles.UserTotalItem}>
        <div className="columns is-mobile m-0">
          <div className="column has-text-right m-0 p-1">
            {dailyAccountTokensWei.map(tokenWei => (
              <p key={tokenWei.name} className='is-size-5 m-0'>{tokenWei.name}/day:</p>
            ))}
          </div>
          <div className="column has-text-left m-0 p-1">
            {dailyAccountTokensWei.map(tokenWei => (
              <p key={tokenWei.name} className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(tokenWei.rewardPerDay, 2)}<span className="is-size-7 ml-1">($
                {tokenWei.name == "CZUSD" ?
                  weiToShortString(weiToUsdWeiVal(tokenWei.rewardPerDay, czusdPrice), 2) :
                  (!!PRICING_LP[tokenWei.name] &&
                    weiToShortString(
                      weiTolpCzusdPricedWeiVal(lpInfos, tokenWei?.name, tokenWei?.rewardPerDay, czusdPrice)
                      , 2)
                  )
                }
                )
              </span></p>
            ))}
          </div>
        </div>
        <h2 className='is-size-6 m-0' style={{ fontWeight: "300" }}>Your Daily Harvest</h2>
      </div>
      <div className={"column p-5 m-3 " + styles.UserTotalItem}>
        <div className="columns is-mobile m-0">
          <div className="column has-text-right m-0 p-1">
            <p className='is-size-5 m-0'>CZR:</p>
            {tokensHarvestable.map(tokenWei => (
              <p key={tokenWei.name} className='is-size-5 m-0'>{tokenWei.name}:</p>
            ))}
          </div>
          <div className="column has-text-left m-0 p-1">
            <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>
              {weiToShortString(czrHarvestableBurnPools, 2)}
              <span className="is-size-7 ml-1">(${weiToShortString(weiToUsdWeiVal(czrHarvestableBurnPools, czrPrice), 2)})</span>
            </p>
            {tokensHarvestable.map(tokenWei => (
              <p key={tokenWei.name} className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(tokenWei.tokenHarvestable, 2)}
                <span className="is-size-7 ml-1">($
                  {tokenWei.name == "CZUSD" ?
                    weiToShortString(weiToUsdWeiVal(tokenWei?.tokenHarvestable, czusdPrice), 2) :
                    (!!PRICING_LP[tokenWei.name] &&
                      weiToShortString(
                        weiTolpCzusdPricedWeiVal(lpInfos, tokenWei?.name, tokenWei?.tokenHarvestable, czusdPrice)
                        , 2)
                    )
                  }
                  )
                </span>
              </p>
            ))}
          </div>
        </div>
        <h2 className='is-size-6 m-0' style={{ fontWeight: "300" }}>Your Estimated Harvestable</h2>
      </div>
      <div className={"column p-5 pb-5 m-3 " + styles.UserTotalItem}>
        <p className='is-size-3 m-0'>${weiToShortString(tribePoolAccountStakeWei, 2)}</p>
        <h2 className='is-size-6 m-0' style={{ fontWeight: "300" }}>Your TVL</h2>
      </div>
    </div>
    <div style={{ marginLeft: "auto", marginRight: "auto" }} >
      <a className='button is-medium is-rounded is-outlined is-primary m-3' href={czCashBuyLink(ADDRESS_CZR)} target="_blank" >Buy CZR</a>
      <a className='button is-medium is-rounded is-outlined is-primary m-3' href={czCashBuyLink(ADDRESS_CZUSD)} target="_blank" >Buy CZUSD</a>
      <br />

    </div >
  </>)
}

export default WalletStatsBar