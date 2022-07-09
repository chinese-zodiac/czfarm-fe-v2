
import React, {useEffect, useState} from 'react';
import InputTokenEther from '../../components/InputTokenEther';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import CollapsibleCard from '../../components/CollapsibleCard';
import QuickInputEther from '../../components/QuickInputEther';
import CollapsibleCardTitleItem from '../CollapsibleCardTitleItem';
import CZFLogo from "../../public/static/assets/logo192.png";
import { ADDRESS_CHRONOPOOLS } from '../../constants/addresses';
import chronoPoolAbi from "../../abi/ChronoPoolService.json";
import { utils, Contract, BigNumber } from 'ethers'
import { weiToShortString, weiToUsdWeiVal, tokenAmtToShortString } from '../../utils/bnDisplay';
import { getSingleV2FarmCzfPerSecondWei } from '../../utils/getAccountStats';
import { getLpTokenValueUsdWad } from '../../utils/getLpTokenValueUsdWad';
import {useContractFunction} from '@usedapp/core';
const { formatEther, parseEther, Interface } = utils;

export default function ManageFarmV2({account,library,farm,v2FarmsSettings,v2FarmsLpBal,v2FarmsPoolInfo,v2FarmsPendingCzf,v2FarmsUserInfo,lpInfo,accountLpBal,czfPrice,czusdPrice}) {
  const [apr,setApr] = useState(0);
  const [inputEther,setInputEther] = useState(0);
  const currentEpoch = BigNumber.from(Math.floor(Date.now()/1000));

  const { state:stateClaimPool, send:sendClaimPool } = useContractFunction(
  new Contract(ADDRESS_CHRONOPOOLS,chronoPoolAbi,library),
  'claimPool');
  const { state:stateReinvest, send:sendReinvest } = useContractFunction(
  new Contract(ADDRESS_CHRONOPOOLS,chronoPoolAbi,library),
  'reinvest');
  const { state:stateDeposit, send:sendDeposit } = useContractFunction(
  new Contract(ADDRESS_CHRONOPOOLS,chronoPoolAbi,library),
  'deposit');
  const { state:stateClaimAndFastForward, send:sendClaimAndFastForward } = useContractFunction(
  new Contract(ADDRESS_CHRONOPOOLS,chronoPoolAbi,library),
  'claimAndFastForward');

  useEffect(()=>{
    if(!v2FarmsSettings?.czfPerBlock || !v2FarmsSettings?.totalAllocPoint || !lpInfo?.totalSupply || !lpInfo?.tokens[0] || !v2FarmsPoolInfo?.allocPoint || !v2FarmsLpBal?.lpBal || !czfPrice || !czusdPrice) {
      setApr("0.00");
      return;
    }
    let usdPerYear = weiToUsdWeiVal(v2FarmsSettings.czfPerBlock.mul(10519200).mul(v2FarmsPoolInfo.allocPoint).div(v2FarmsSettings.totalAllocPoint),czfPrice);
    let usdStaked = getLpTokenValueUsdWad(farm.tokens[0].symbol,lpInfo,v2FarmsLpBal.lpBal,czfPrice,czusdPrice);
    setApr(tokenAmtToShortString(BigNumber.from(1000000).mul(usdPerYear).div(usdStaked),4,2));
  },[!v2FarmsSettings?.czfPerBlock || !v2FarmsSettings?.totalAllocPoint, lpInfo?.totalSupply, lpInfo?.tokens[0], v2FarmsPoolInfo?.allocPoint, v2FarmsLpBal?.lpBal, czfPrice, czusdPrice])

  return(<>
  <CollapsibleCard className="mb-3" 
    title={(<div className='has-text-white pb-2 pt-2 '>
      <div className="is-inline-block is-narrow is-mobile m-0 p-0 pt-1 mr-2" style={{position:"relative"}}>
        <figure className="image is-32x32 is-inline-block m-0 p-0">
            <img src={`./static/assets/images/tokens/${farm?.tokens?.[0]?.symbol}.png`} />
        </figure>
        <figure className="image is-32x32 is-inline-block ml-0 mt-0 mb-0 p-0" style={{position:"relative",top:"0.5em",left:"-1em",marginRight:"-1em"}}>
            <img src={`./static/assets/images/tokens/${farm?.tokens?.[1]?.symbol}.png`} />
        </figure>
        <span className='icon m-0 p-0 ' style={{width:"0.6em",position:"relative",top:"-0.6em"}}><i className="fa-solid fa-angle-right"></i></span>
        <figure className="image is-32x32 is-inline-block m-0 p-0 ">
            <img src={CZFLogo} />
        </figure>
      </div>
      <CollapsibleCardTitleItem title="TYPE" width="6.5em">
        <span className='is-size-6'>{farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="DEX" width="3em">
        <span className='is-size-6'>{farm?.dex?.shortName}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="APR" width="4.5em">
        <span className='is-size-6'>{(apr)}%</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="CZF/DAY" width="4em">
        <span className='is-size-6'>{weiToShortString(getSingleV2FarmCzfPerSecondWei(v2FarmsSettings,v2FarmsLpBal,v2FarmsPoolInfo,v2FarmsUserInfo).mul(86400),2)}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="STAKE" width="4.5em">
        <span className='is-size-6'>${weiToShortString(getLpTokenValueUsdWad("CZF",lpInfo,v2FarmsUserInfo?.amount,czfPrice,czusdPrice),2)}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="EST CLAIM" width="4em">
        <span className='is-size-6'>{weiToShortString(v2FarmsPendingCzf?.pendingCzf,1)}</span>
      </CollapsibleCardTitleItem>
    </div>)}>
    {!account ? (<>
      <ConnectOrLearn />
    </>) : (<>
    <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">


    </div>
    </>)}
  </CollapsibleCard>
      
  </>);
}