
import React, {useEffect, useState} from 'react';
import InputTokenEther from '../../components/InputTokenEther';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import CollapsibleCard from '../../components/CollapsibleCard';
import QuickInputEther from '../../components/QuickInputEther';
import CollapsibleCardTitleItem from '../CollapsibleCardTitleItem';
import CZFLogo from "../../public/static/assets/logo192.png";
import { ADDRESS_EXOTICFARMS } from '../../constants/addresses';
import exoticFarmAbi from "../../abi/ExoticMaster.json";
import ierc20Abi from "../../abi/IERC20.json";
import { utils, Contract, BigNumber, constants } from 'ethers'
import { weiToShortString } from '../../utils/bnDisplay';
import { getLpTokenValueUsdWad } from '../../utils/getLpTokenValueUsdWad';
import {useContractFunction,useTokenAllowance} from '@usedapp/core';
const { parseEther } = utils;
const {MaxUint256} = constants;

export default function ManageExoticFarm({account,library,lpBal,farmSet,farm,farmInfo,farmAccountInfo,lpInfo,czfPrice,czusdPrice,currentEpoch}) {
  const [apr,setApr] = useState(0);
  const [inputEther,setInputEther] = useState(0);
  const [epochDelta,setEpochDelta] = useState(0);

  const { state:stateClaimFarm, send:sendClaimFarm } = useContractFunction(
  new Contract(ADDRESS_EXOTICFARMS,exoticFarmAbi,library),
  'claimFarm');
  const { state:stateDeposit, send:sendDeposit } = useContractFunction(
  new Contract(ADDRESS_EXOTICFARMS,exoticFarmAbi,library),
  'deposit');
  const { state:stateClaimAndFastForward, send:sendClaimAndFastForward } = useContractFunction(
  new Contract(ADDRESS_EXOTICFARMS,exoticFarmAbi,library),
  'claimAndFastForward');

  const lpAllowance = useTokenAllowance(farmSet.lp,account,ADDRESS_EXOTICFARMS);
  const { state:stateApprove, send:sendApprove } = useContractFunction(
  new Contract(farmSet.lp,ierc20Abi,library),
  'approve');

  useEffect(()=>{
    if(!farmInfo?.adjustedRateBasis || !farmInfo?.vestPeriod) {
      setApr(0);
      return;
    }
    setApr(
      (Number(farmInfo.adjustedRateBasis) / 100) * (31536000 / Number(farmInfo.vestPeriod))
    );
  },[farmInfo?.adjustedRateBasis,farmInfo?.vestPeriod]);

  useEffect(()=>{
    if(!farmAccountInfo?.updateEpoch || !currentEpoch) {
      setEpochDelta(0);
      return
    }
    console.log("Setting delta",currentEpoch,farmAccountInfo.updateEpoch,currentEpoch-farmAccountInfo.updateEpoch);
    setEpochDelta(currentEpoch - farmAccountInfo.updateEpoch);
  },[farmAccountInfo?.updateEpoch,currentEpoch]);

  return(<>
  <CollapsibleCard className="mb-3" 
    title={(<div className='has-text-white pb-2 pt-2 '>
      <div className="is-inline-block is-narrow is-mobile m-0 p-0 pt-1 mr-2" style={{position:"relative"}}>
        <figure className="image is-32x32 is-inline-block m-0 p-0">
            <img src={`./static/assets/images/tokens/${farmSet?.tokens?.[0]?.symbol}.png`} />
        </figure>
        <figure className="image is-32x32 is-inline-block ml-0 mt-0 mb-0 p-0" style={{position:"relative",top:"0.5em",left:"-1em",marginRight:"-1em"}}>
            <img src={`./static/assets/images/tokens/${farmSet?.tokens?.[1]?.symbol}.png`} />
        </figure>
        <span className='icon m-0 p-0 ' style={{width:"0.6em",position:"relative",top:"-0.6em"}}><i className="fa-solid fa-angle-right"></i></span>
        <figure className="image is-32x32 is-inline-block m-0 p-0 ">
            <img src={CZFLogo} />
        </figure>
      </div>
      <CollapsibleCardTitleItem title="DURATION" width="5em">
        <span className='is-size-6'>{farm.title}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="APR" width="4em">
        <span className='is-size-6'>{apr.toFixed(2)}%</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="CZF/DAY" width="4em">
        <span className='is-size-6'>{weiToShortString(BigNumber.from(farmAccountInfo?.emissionRate ?? 0).mul(86400),1)}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="VEST" width="4em">
        <span className='is-size-6'>{weiToShortString(BigNumber.from(farmAccountInfo?.totalVesting ?? 0),1)}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="EST CLAIM" width="4em">
        <span className='is-size-6'>{weiToShortString(BigNumber.from(farmAccountInfo?.emissionRate ?? 0).mul(epochDelta),1)}</span>
      </CollapsibleCardTitleItem>
    </div>)}>
    {!account && (<>
      <ConnectOrLearn />
    </>)}
    {(!!account && lpAllowance?.lte(lpBal ?? 0)) && (
      <div>
        <p className='mb-2'>To use {farmSet?.tokens?.[0]?.symbol}/{farmSet?.tokens?.[1]?.symbol} Exotic Farms, you need to approve the Exotic Master address <code>{ADDRESS_EXOTICFARMS}</code> to use your {farmSet?.tokens?.[0]?.symbol}/{farmSet?.tokens?.[1]?.symbol} LP tokens. You can use the button below.</p>
        <button onClick={()=>sendApprove(ADDRESS_EXOTICFARMS,MaxUint256)} className='button has-background-grey-lighter is-fullwidth'>Approve</button>
      </div>
    )}    
    {(!!account && lpAllowance?.gt(lpBal ?? 0)) && (<>
    <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
      <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{border:"solid 1px #dbdbdb",maxWidth:"25em"}}>
        <h3 className="is-size-4">Give {farmSet?.tokens?.[0]?.symbol}/{farmSet?.tokens?.[1]?.symbol} LP For CZF/Second</h3>
        <p>Give your ${farmSet?.tokens?.[0]?.symbol}/${farmSet?.tokens?.[1]?.symbol} LP and get vesting CZF for the duration of this farm. You can do this multiple times, each gift is tracked seperately.</p>
        <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
          style={{maxWidth:"10em",width:"100%"}}
          step="any"
          precision={0.01}
          label={`${farmSet?.tokens?.[0]?.symbol}/${farmSet?.tokens?.[1]?.symbol}`}
          minWadBn={BigNumber.from(0)} maxWadBn={lpBal}
          {...{setInputEther,inputEther}}
        />
        <p className='is-size-7 mt-0 mb-1 ml-2' >(${weiToShortString(getLpTokenValueUsdWad(farmSet?.tokens?.[0]?.symbol,lpInfo,parseEther(inputEther.toString()),czfPrice,czusdPrice),2)})</p>
        <QuickInputEther {...{setInputEther}} maxTokenWad={lpBal} />
        <button onClick={()=>sendDeposit(farm?.pid,parseEther(inputEther.toString()))} className='button has-background-grey-lighter is-fullwidth'>Give {farmSet?.tokens?.[0]?.symbol}/{farmSet?.tokens?.[1]?.symbol} LP</button>
      </div>
      <div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{border:"solid 1px #dbdbdb",maxWidth:"25em"}}>
        <h3 className="is-size-4">Claim Your CZF</h3>
        <p>Harvests your CZF for this farm only and transfers it to your wallet.</p><br/>
        <button onClick={()=>sendClaimFarm(farm?.pid)} className='button has-background-grey-lighter is-fullwidth'>Harvest</button>
        <p>You will get {weiToShortString(BigNumber.from(farmAccountInfo?.emissionRate ?? 0).mul(epochDelta),3)} CZF approximately. Actual value can be different if your emissions are expiring.</p>
      </div>
      <div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{border:"solid 1px #dbdbdb",maxWidth:"25em"}}>
        <h3 className="is-size-4">Fast Forward Rewards</h3>
        <p>Cancel your current CZF rewards from this Exotic Farm to get CZF now. You will get less CZF than if you wait.</p><br/>
        <p>For this {farm?.title} Chrono, you get <b>{(Number(farmInfo?.ffBasis ?? 0)/100).toFixed(2)}%</b> of your future CZF by calling fastforward.</p><br/>
        <button onClick={()=>sendClaimAndFastForward(farm?.pid)} className='button has-background-grey-lighter is-fullwidth'>Fast Forward</button>
        <p>You will get {weiToShortString(BigNumber.from(farmAccountInfo?.totalVesting ?? 0).mul(farmInfo?.ffBasis ?? 0).div(10000),3)} CZF immediately.</p>
      </div>

    </div>
    </>)}
  </CollapsibleCard>
      
  </>);
}