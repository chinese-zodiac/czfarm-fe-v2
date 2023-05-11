import { utils } from 'ethers';
import React, { useState } from 'react';
import { ADDRESS_CZR, ADDRESS_CZUSD } from "../../constants/addresses";
import { PRICING_LP } from "../../constants/pricingLp";
import { weiToShortString, weiToUsdWeiVal, weiTolpCzusdPricedWeiVal } from '../../utils/bnDisplay';
import { czCashBuyLink } from '../../utils/dexBuyLink';
import { getDailyAccountTokensWei, getTokensHarvestable } from "../../utils/getAccountStats";
import useDeepCompareEffect from '../../utils/useDeepCompareEffect';
import styles from "./index.module.scss";
const { formatEther, parseEther, Interface } = utils;

function WalletStatsBar({ czrPrice, czusdPrice, czbPrice, banditPrice, czfPrice, czrBal, czusdBal, banditBal, czbBal, czfBal, account, tribePoolInfo, tribePoolAccountInfo, tribePoolAccountStakeWei, lpInfos,
  czusdNotesAccountStakeWei, czbFarmsAccountStakeWei, banditFarmsAccountStakeWei, farmsV2AccountStakeWei,
  czusdNotesAccountInfo, czbFarmsUserInfo, banditFarmsUserInfo,
  czbFarmsSettings, czbFarmsPoolInfo, banditFarmsSettings, banditFarmsPoolInfo,
  v2FarmsUserInfo, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo,
  nftPoolCzrPerSecond

}) {

  const [dailyAccountTokensWei, setDailyAccountTokensWei] = useState([]);
  const [tokensHarvestable, setTokensHarvestable] = useState([]);

  useDeepCompareEffect(() => {
    if (!account) {
      setDailyAccountTokensWei([]);
      setTokensHarvestable([]);
      return
    }
    setDailyAccountTokensWei(getDailyAccountTokensWei(tribePoolInfo, tribePoolAccountInfo, czusdNotesAccountInfo, czbFarmsUserInfo, banditFarmsUserInfo,
      czbFarmsSettings, czbFarmsPoolInfo, banditFarmsSettings, banditFarmsPoolInfo,
      v2FarmsUserInfo, v2FarmsSettings, v2FarmsLpBal, v2FarmsPoolInfo, nftPoolCzrPerSecond));
    setTokensHarvestable(getTokensHarvestable(tribePoolAccountInfo));
  }, [account, tribePoolInfo, tribePoolAccountInfo, czusdNotesAccountInfo]);

  return (<>
    <div className='columns is-3 is-variable'>
      <div className={"column p-5 pb-5 m-3 " + styles.UserTotalItem}>
        <div className="columns is-mobile m-0">
          <div className="column has-text-right m-0 p-1">
            <p className='is-size-5 m-0'>CZUSD:</p>
            {!!czrBal && czrBal?.gt(0) && <p className='is-size-5 m-0'>CZR:</p>}
            {!!czfBal && czfBal?.gt(0) && <p className='is-size-5 m-0'>CZF:</p>}
            {!!banditBal && banditBal?.gt(0) && <p className='is-size-5 m-0'>🎭🔫:</p>}
            {!!czbBal && czbBal?.gt(0) && <p className='is-size-5 m-0'>CZB:</p>}
          </div>
          <div className="column has-text-left m-0 p-1">
            <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(czusdBal, 2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czusdBal, czusdPrice), 2)})</span></p>
            {!!czrBal && czrBal?.gt(0) && <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(czrBal, 2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czrBal, czrPrice), 2)})</span></p>}
            {!!czfBal && czfBal?.gt(0) && <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(czfBal, 2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czfBal, czfPrice), 2)})</span></p>}
            {!!banditBal && banditBal?.gt(0) && <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(banditBal, 2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(banditBal, banditPrice), 2)})</span></p>}
            {!!czbBal && czbBal?.gt(0) && <p className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>{weiToShortString(czbBal, 2)} <span className="is-size-7">(${weiToShortString(weiToUsdWeiVal(czbBal, czbPrice), 2)})</span></p>}
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
                  (!!PRICING_LP[tokenWei.name] ?
                    weiToShortString(
                      weiTolpCzusdPricedWeiVal(lpInfos, tokenWei?.name, tokenWei?.rewardPerDay, czusdPrice)
                      , 2) : (tokenWei.name == "🎭🔫") && weiToShortString(
                        weiTolpCzusdPricedWeiVal(lpInfos, 'BANDIT', tokenWei?.rewardPerDay, czusdPrice)
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
            {tokensHarvestable.map(tokenWei => (
              <p key={tokenWei.name} className='is-size-5 m-0'>{tokenWei.name}:</p>
            ))}
          </div>
          <div className="column has-text-left m-0 p-1">
            {tokensHarvestable.map(tokenWei => (
              <p key={tokenWei.name} className='is-size-5 m-0' style={{ whiteSpace: "nowrap" }}>
                {weiToShortString(tokenWei.tokenHarvestable, 2)}
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
        <p className='is-size-3 m-0'>${weiToShortString(tribePoolAccountStakeWei.add(czusdNotesAccountStakeWei).add(czbFarmsAccountStakeWei).add(banditFarmsAccountStakeWei).add(farmsV2AccountStakeWei), 2)}</p>
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