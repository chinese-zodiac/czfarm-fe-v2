
import React, { useEffect, useState } from 'react';
import { useEthers } from '@usedapp/core';
import Link from 'next/link';
import { useCoingeckoTokenPrice } from '@usedapp/coingecko'
import InputTokenEther from '../InputTokenEther';
import ConnectOrLearn from '../ConnectOrLearn';
import CollapsibleCard from '../CollapsibleCard';
import QuickInputEther from '../QuickInputEther';
import CollapsibleCardTitleItem from '../CollapsibleCardTitleItem';
import CZFLogo from "../../public/static/assets/images/tokens/CZF.png";
import { dexAddLink } from '../../utils/dexBuyLink';
import { getIpfsJson, getIpfsUrl } from '../../utils/getIpfsJson';
import czFarmPoolAbi from "../../abi/CZFarmPool.json";
import IERC721EnumerableAbi from "../../abi/IERC721Enumerable.json";
import { utils, Contract, BigNumber } from 'ethers'
import { weiToShortString, weiToUsdWeiVal, tokenAmtToShortString } from '../../utils/bnDisplay';
import { deltaCountdown } from '../../utils/timeDisplay';
import { useCall, useContractFunction } from '@usedapp/core';
import { ADDRESS_OBR } from "../../constants/addresses";
const { formatEther, parseEther, Interface } = utils;

export default function ManagePoolV1({ pool, rewardAddress, currentEpoch, accountInfo, poolInfo, poolTokenBalance, czfBal, czusdBal, czfPrice, czusdPrice, isExpired, isLaunching, isActive }) {
  const { account, library, chainId } = useEthers();

  const [apr, setApr] = useState(0);
  const [inputEther, setInputEther] = useState(0);
  const [outputEther, setOutputEther] = useState(0);

  const [style, setStyle] = useState();
  const [scene, setScene] = useState();
  const [imageUrl, setImageUrl] = useState();

  //TODO: Move prices for all assets to a react state management system to centrally store prices
  const coingeckoRewardPrice = useCoingeckoTokenPrice(rewardAddress, 'usd', 'binance-smart-chain');

  const PoolContract = new Contract(pool.address, czFarmPoolAbi, library);

  const { state: stateWithdraw, send: sendWithdraw } = useContractFunction(
    PoolContract,
    'withdraw');
  const { state: stateDeposit, send: sendDeposit } = useContractFunction(
    PoolContract,
    'deposit');

  useEffect(() => {
    if (!poolInfo?.rewardPerSecond || !poolTokenBalance?.tokenBal || isExpired) {
      setApr("0.00");
      return;
    }
    const usdStaked = weiToUsdWeiVal(poolTokenBalance.tokenBal, pool.baseAssetName == "CZF" ? czfPrice : czusdPrice);
    let rewardPrice = coingeckoRewardPrice;
    if (!rewardPrice) {
      //coingecko didnt work, check if we can use czf or czusd
      console.log("pool.rewardAssetName", pool.rewardAssetName)
      if (pool.rewardAssetName == "CZF") {
        rewardPrice = czfPrice;
      } else if (pool.rewardAssetName == "CZUSD") {
        rewardPrice = czusdPrice;
      }
    }
    console.log("rp2", rewardPrice);
    if (!rewardPrice) {
      //TODO: still no reward price, check dexcreener.
    } else {
      const usdPerYear = weiToUsdWeiVal(poolInfo.rewardPerSecond.mul(31557600), rewardPrice);
      if (usdStaked.lte(0)) {
        setApr("0.00");
        return;
      }
      setApr(tokenAmtToShortString(BigNumber.from(1000000).mul(usdPerYear).div(usdStaked), 4, 2));
    }
  }, [!poolInfo?.rewardPerSecond, !poolTokenBalance?.tokenBal, coingeckoRewardPrice])

  useEffect(() => {
    if (!accountInfo?.slottedObr || accountInfo.slottedObr.eq(0)) return;
    (async () => {
      const metadata = await getIpfsJson(`ipfs://QmYeWi4DVNiGatPsVf4zNFebgM3NnhkMvAMzaiaXj85sCo/obr-dat/${accountInfo.slottedObr.toString()}.json`);
      setStyle(metadata?.attributes?.[0]?.value);
      setScene(metadata?.attributes?.[1]?.value);
      !!metadata?.image && setImageUrl(getIpfsUrl(metadata?.image));
    })();
  }, [accountInfo?.slottedObr])

  return (<>
    <CollapsibleCard className="mb-3"
      title={(<div className='has-text-white pb-2 pt-2 '>
        <div className="is-inline-block is-narrow is-mobile m-0 p-0 pt-1 mr-2">
          <figure className="image is-32x32 is-inline-block m-0 p-0">
            <img className="has-background-special is-rounded" src={`./static/assets/images/tokens/${pool.baseAssetName}.png`} />
          </figure>
          <span className='icon m-0 p-0 ' style={{ width: "0.6em", position: "relative", top: "-0.6em" }}><i className="fa-solid fa-angle-right"></i></span>
          <figure className="image is-32x32 is-inline-block m-0 p-0 ">
            <img className="has-background-special is-rounded" src={`./static/assets/images/tokens/${pool.rewardAssetName}.png`} />
          </figure>
        </div>
        <CollapsibleCardTitleItem title="BASE" width="3.5em">
          <span className='is-size-6'>{pool.baseAssetName}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="EARN" width="3.5em">
          <span className='is-size-6'>{pool.rewardAssetName}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="APR" width="4.5em">
          <span className='is-size-6'>{(apr)}%</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="TVL" width="4.5em">
          <span className='is-size-6'>${weiToShortString(weiToUsdWeiVal(poolTokenBalance.tokenBal ?? 0, pool.baseAssetName == "CZF" ? czfPrice : czusdPrice), 1)}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="FEE" width="4em">
          <span className='is-size-6' style={(accountInfo?.slottedObr && accountInfo?.slottedObr?.gt(0)) ? { textDecoration: "line-through" } : {}}>{pool.feeBasis ? `${(pool.feeBasis / 100).toFixed(2)}%` : "N/A"}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="DUTY" width="4em">
          <span className='is-size-6'>{pool.duty ?? "N/A"}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="STAKE" width="4em">
          <span className='is-size-6'>{weiToShortString(accountInfo?.amount ?? 0, 1)}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title={`${pool.rewardAssetName}/DAY`} width="4.5em">
          <span className='is-size-6'>{(!!poolTokenBalance?.tokenBal && poolTokenBalance.tokenBal.gt(0)) ? weiToShortString(poolInfo?.rewardPerSecond?.mul(86400).mul(accountInfo?.amount ?? 0).div(poolTokenBalance?.tokenBal ?? 1), 2) : "N/A"}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="EST CLAIM" width="4em">
          <span className='is-size-6'>{weiToShortString(accountInfo?.pendingReward ?? 0, 1)}</span>
        </CollapsibleCardTitleItem>
        {isActive && (
          <CollapsibleCardTitleItem title="END TIME" width="9em">
            <span className='is-size-6'>{deltaCountdown(currentEpoch, poolInfo?.timestampEnd)}</span>
          </CollapsibleCardTitleItem>
        )}
        {isLaunching && (
          <CollapsibleCardTitleItem title="START TIME" width="9em">
            <span className='is-size-6'>{deltaCountdown(currentEpoch, poolInfo?.timestampStart)}</span>
          </CollapsibleCardTitleItem>
        )}
        {pool.has1Bad0TaxSlot && (
          <a target="_blank" href="https://bad.rabbitcatch.com" className='has-text-white' >
            <div className='is-inline-block has-text-weight-light is-size-7 m-0 has-text-centered has-background-primary-dark' style={{ border: "solid 1px grey", borderRadius: "4px", boxShadow: "inset 1px 2px 5px rgba(0,0,0,0.5)", position: "relative", width: "3.7em", height: "3.7em", overflow: "hidden" }}>
              {!!accountInfo?.slottedObr && accountInfo?.slottedObr.gt(0) ? (<>
                <img alt={"#" + accountInfo?.slottedObr} title={"1BAD: " + accountInfo?.slottedObr} style={{ width: "100%" }} src={imageUrl} />
              </>) : (<>
                <div className='m-0 p-1'>
                  +1BAD<br />
                  0TAX
                </div>
              </>)}

            </div>
          </a>
        )}

      </div>)}>
      {!account ? (<>
        <ConnectOrLearn />
      </>) : (<>
        <p>{pool.subtitle}</p>
        <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
          {!isExpired && (<div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Stake {pool.baseAssetName}</h3>
            <p>Stake {pool.baseAssetName} and get {pool.rewardAssetName} every second. {pool.subtitle ?? "There are no restrictions or fees."} </p>
            <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
              style={{ maxWidth: "10em", width: "100%" }}
              step="any"
              precision={0.01}
              label={pool.baseAssetName}
              minWadBn={BigNumber.from(0)} maxWadBn={pool.baseAssetName == "CZF" ? czfBal : czusdBal}
              {...{ setInputEther, inputEther }}
            />
            <p className='is-size-7 mt-0 mb-1 ml-2' >(${weiToShortString(weiToUsdWeiVal(parseEther(inputEther.toString()), pool.baseAssetName == "CZF" ? czfPrice : czusdPrice), 2)})</p>
            <QuickInputEther {...{ setInputEther }} maxTokenWad={pool.baseAssetName == "CZF" ? czfBal : czusdBal} />
            <button onClick={() => sendDeposit(parseEther(inputEther.toString()))} className='button has-background-grey-lighter is-fullwidth'>Stake {pool.baseAssetName}</button>
          </div>)}
          <div className="is-inline-block p-3 m-3 is-align-self-stretch " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Unstake your {pool.baseAssetName}</h3>
            <p>Unstake your {pool.baseAssetName}. {pool.subtitle ?? "There are no restrictions or fees."} Rewards are claimed.</p>
            <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
              style={{ maxWidth: "10em", width: "100%" }}
              step="any"
              precision={0.01}
              label={pool.baseAssetName}
              minWadBn={BigNumber.from(0)} maxWadBn={accountInfo?.amount ?? 0}
              inputEther={outputEther} setInputEther={setOutputEther}
            />
            <p className='is-size-7 mt-0 mb-1 ml-2' >(${weiToShortString(weiToUsdWeiVal(parseEther(outputEther.toString()), pool.baseAssetName == "CZF" ? czfPrice : czusdPrice), 2)})</p>
            <QuickInputEther setInputEther={setOutputEther} maxTokenWad={accountInfo?.amount ?? 0} />
            <button onClick={() => sendWithdraw(parseEther(outputEther.toString()))} className='button has-background-grey-lighter is-fullwidth'>Unstake {pool.baseAssetName}</button>
          </div>
          {!isLaunching && (<div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Claim Your {pool.rewardAssetName}</h3>
            <p>Harvests your {pool.rewardAssetName} for this pool only and transfers it to your wallet.</p><br />
            <button onClick={() => sendWithdraw(0)} className='button has-background-grey-lighter is-fullwidth'>Harvest</button>
            <p>You will get {weiToShortString(accountInfo?.pendingReward ?? 0, 3)} {pool.rewardAssetName}.</p>
          </div>)}
        </div>
      </>)}
    </CollapsibleCard>

  </>);
}