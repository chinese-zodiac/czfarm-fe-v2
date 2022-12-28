
import React, { useEffect, useState } from 'react';
import { useEthers, useTokenBalance } from '@usedapp/core';
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
import BurnPoolAbi from "../../abi/BurnPool.json";
import IERC721EnumerableAbi from "../../abi/IERC721Enumerable.json";
import { utils, Contract, BigNumber } from 'ethers'
import { weiToShortString, weiToUsdWeiVal, tokenAmtToShortString } from '../../utils/bnDisplay';
import { deltaCountdown } from '../../utils/timeDisplay';
import { useCall, useContractFunction } from '@usedapp/core';
import { ADDRESS_OBR } from "../../constants/addresses";
const { formatEther, parseEther, Interface } = utils;

export default function ManageBurnPool({ pool, currentEpoch, accountInfo, poolInfo, czfBal, czusdBal, czfPrice, czusdPrice, czrPrice, isExpired, isLaunching, isActive }) {
  const { account, library, chainId } = useEthers();

  const [apr, setApr] = useState(0);
  const [inputEther, setInputEther] = useState(0);
  const [outputEther, setOutputEther] = useState(0);
  const [totalValueBurned, setTotalValueBurned] = useState(0);

  const PoolContract = new Contract(pool.address, BurnPoolAbi, library);

  const { state: stateClaim, send: sendClaim } = useContractFunction(
    PoolContract,
    'claim');
  const { state: stateDeposit, send: sendDeposit } = useContractFunction(
    PoolContract,
    'deposit');

  useEffect(() => {
    if (!poolInfo?.rewardPerSecond || !poolInfo?.totalShares || !!isExpired || !poolInfo?.burnedWad) {
      setApr("0.00");
      setTotalValueBurned(BigNumber.from(0));
      return;
    }
    const usdBurned = weiToUsdWeiVal(poolInfo.burnedWad, pool.baseAssetName == "CZF" ? czfPrice : czusdPrice);
    const boostAprMultiplier = poolInfo.burnedWad.mul(10000).div(poolInfo?.totalShares);
    if (!czrPrice) {
      //TODO: still no reward price, check dexcreener.
    } else {
      const usdPerYear = weiToUsdWeiVal(poolInfo?.rewardPerSecond.mul(31557600), czrPrice);
      if (usdBurned.lte(0)) {
        setApr("0.00");
        return;
      }
      setApr(tokenAmtToShortString(BigNumber.from(1000000).mul(usdPerYear).mul(accountInfo?.isBoostEligible ? 5 : 1).div(usdBurned.mul(10000).div(boostAprMultiplier)), 4, 2));
    }
  }, [pool?.baseAssetAddress, poolInfo?.burnedWad?.toString(), poolInfo?.rewardPerSecond?.toString(), poolInfo?.totalShares?.toString(), czrPrice, accountInfo?.isBoostEligible]);

  return (<>
    <CollapsibleCard className="mb-3"
      title={(<div className='has-text-white pb-2 pt-2 '>
        <div className="is-inline-block is-narrow is-mobile m-0 p-0 pt-1 mr-2">
          <figure className="image is-32x32 is-inline-block m-0 p-0">
            <img className="has-background-special is-rounded" src={`./static/assets/images/tokens/${pool.baseAssetName}.png`} />
          </figure>
          <span className='icon m-0 p-0 ' style={{ width: "0.6em", position: "relative", top: "-0.6em" }}><i className="fa-solid fa-angle-right"></i></span>
          <figure className="image is-32x32 is-inline-block m-0 p-0 ">
            <img className="has-background-special is-rounded" src={`./static/assets/images/tokens/CZRED.svg`} />
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
        <CollapsibleCardTitleItem title="BOOST" width="4em">
          <span className='is-size-6'>{accountInfo?.isBoostEligible ? "5x" : "1x"}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="TVB" width="4.5em">
          <span className='is-size-6'>${weiToShortString(weiToUsdWeiVal(poolInfo?.burnedWad, pool?.baseAssetName == "CZF" ? czfPrice : czusdPrice), 1)}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="FEE" width="4em">
          <span className='is-size-6'>100%</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title="STAKE" width="4em">
          <span className='is-size-6'>{weiToShortString(accountInfo?.shares ?? 0, 1)}</span>
        </CollapsibleCardTitleItem>
        <CollapsibleCardTitleItem title={`CZRED/DAY`} width="4.5em">
          <span className='is-size-6'>{(!!poolInfo?.totalShares && poolInfo.totalShares.gt(0)) ? weiToShortString(poolInfo?.rewardPerSecond?.mul(86400).mul(accountInfo?.shares ?? 0).div(poolInfo?.totalShares ?? 1), 2) : "N/A"}</span>
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
      </div>)}>
      {!account ? (<>
        <ConnectOrLearn />
      </>) : (<>
        <p>{pool.subtitle}</p>
        <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
          {(!isExpired && pool.baseAssetName != "CZF") && (<div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Burn {pool.baseAssetName}</h3>
            <p>Burn {pool.baseAssetName} and get CZRED every second. Stake is fully burned and cannot be withdrawn. </p>
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
            {pool.baseAssetName == "CZF" && (
              <p className='is-size-5' style={{ fontWeight: "bold", color: "red" }}>WARNING: DO NOT STAKE EXPLOITED CZF. Accounts holding, staking, or trading post Dec 3 exploited CZF will have Burn Pool Stake, CZF Balance, and potentially other tokens burrned to 0 (ZERO) unless otherwise advised and without recourse.</p>
            )}
          </div>)}
          {!isLaunching && (<div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{ border: "solid 1px #dbdbdb", maxWidth: "25em" }}>
            <h3 className="is-size-4">Claim Your CZRED</h3>
            <p>Harvests your CZRED for this pool only and transfers it to your wallet.</p><br />
            <button onClick={() => sendClaim()} className='button has-background-grey-lighter is-fullwidth'>Harvest</button>
            <p>You will get {weiToShortString(accountInfo?.pendingReward ?? 0, 3)} CZRED.</p>

          </div>)}
        </div>
      </>)}
    </CollapsibleCard>

  </>);
}