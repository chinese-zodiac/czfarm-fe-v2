
import React, {useEffect, useState} from 'react';
import InputTokenEther from '../../components/InputTokenEther';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import CollapsibleCard from '../../components/CollapsibleCard';
import QuickInputEther from '../../components/QuickInputEther';
import CZFLogo from "../../public/static/assets/images/tokens/CZF.png";
import { ADDRESS_CHRONOPOOLS } from '../../constants/addresses';
import chronoPoolAbi from "../../abi/ChronoPoolService.json";
import { utils, Contract, BigNumber } from 'ethers'
import { weiToShortString, weiToUsdWeiVal } from '../../utils/bnDisplay';
import {useContractFunction} from '@usedapp/core';
import CollapsibleCardTitleItem from '../CollapsibleCardTitleItem';
const { parseEther } = utils;

export default function ManageChronoPool({account,library,pool,currentEpoch,czfBal,poolInfo,poolAccountInfo,czfPrice,totalVesting}) {
  const [apr,setApr] = useState(0);
  const [inputEther,setInputEther] = useState(0);
  const [epochDelta,setEpochDelta] = useState(0);

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
    if(!poolInfo?.adjustedRateBasis || !poolInfo?.vestPeriod) {
      setApr(0);
      return;
    }
    setApr(
      (Number(poolInfo.adjustedRateBasis) / 100) * (31536000 / Number(poolInfo.vestPeriod))
    );
  },[poolInfo?.adjustedRateBasis,poolInfo?.vestPeriod]);

  useEffect(()=>{
    if(!poolAccountInfo?.updateEpoch || !currentEpoch) {
      setEpochDelta(0);
      return
    }
    setEpochDelta(currentEpoch - poolAccountInfo?.updateEpoch);
  },[poolAccountInfo?.updateEpoch,currentEpoch]);
  
  return(<>
  <CollapsibleCard className="mb-3" 
    title={(<div className='has-text-white pb-2 pt-2 '>
      <div className="is-inline-block is-narrow is-mobile m-0 p-0 pt-1 mr-2">
        <figure className="image is-32x32 is-inline-block m-0 p-0">
            <img  className="has-background-special is-rounded" src={CZFLogo} />
        </figure>
        <span className='icon m-0 p-0 ' style={{width:"0.6em",position:"relative",top:"-0.6em"}}><i className="fa-solid fa-angle-right"></i></span>
        <figure className="image is-32x32 is-inline-block m-0 p-0 ">
            <img  className="has-background-special is-rounded" src={CZFLogo} />
        </figure>
      </div>
      <CollapsibleCardTitleItem title="DURATION" width="5em">
        <span className='is-size-6'>{pool.title}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="APR" width="4em">
        <span className='is-size-6'>{apr.toFixed(2)}%</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="TVL" width="4.5em">
        <span className='is-size-6'>${weiToShortString(weiToUsdWeiVal(totalVesting ?? 0,czfPrice),1)}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="VEST" width="4em">
        <span className='is-size-6'>{weiToShortString(BigNumber.from(poolAccountInfo?.totalVesting ?? 0),1)}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="CZF/DAY" width="4em">
        <span className='is-size-6'>{weiToShortString(BigNumber.from(poolAccountInfo?.emissionRate ?? 0).mul(86400),1)}</span>
      </CollapsibleCardTitleItem>
      <CollapsibleCardTitleItem title="EST CLAIM" width="4em">
        <span className='is-size-6'>{weiToShortString(BigNumber.from(poolAccountInfo?.emissionRate ?? 0).mul(epochDelta),1)}</span>
      </CollapsibleCardTitleItem>
    </div>)}>
    {!account ? (<>
      <ConnectOrLearn />
    </>) : (<>
    <div className="is-flex is-flex-direction-row is-flex-wrap-wrap">
      <div className="is-inline-block p-3 m-3 is-align-self-flex-start " style={{border:"solid 1px #dbdbdb",maxWidth:"25em"}}>
        <h3 className="is-size-4">Burn CZF For CZF/Second</h3>
        <p>Burn your CZF and get vesting CZF for the duration of this pool. You can do this multiple times, each burn is tracked seperately.</p>
        <InputTokenEther className="is-inline-block has-background-special has-text-white is-inline-block mt-2 mb-2"
          style={{maxWidth:"10em",width:"100%"}}
          step="1000000"
          precision={1}
          label="CZF"
          minWadBn={BigNumber.from(0)} maxWadBn={czfBal}
          {...{setInputEther,inputEther}}
        />
        <p className='is-size-7 mt-0 mb-1 ml-2' >(${weiToShortString(weiToUsdWeiVal(parseEther(inputEther.toString()),czfPrice),2)})</p>
        <QuickInputEther {...{setInputEther}} maxTokenWad={czfBal} />
        <button onClick={()=>sendDeposit(pool?.pid,parseEther(inputEther.toString()))} className='button has-background-grey-lighter is-fullwidth'>Burn CZF</button>
        <p>You will get {weiToShortString(parseEther(BigNumber.from(inputEther ?? 0).mul(BigNumber.from(10000).add(poolInfo?.adjustedRateBasis ?? 0)).div(10000).toString()),3)} CZF over {pool?.title}.</p>
      </div>
      <div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{border:"solid 1px #dbdbdb",maxWidth:"25em"}}>
        <h3 className="is-size-4">Reinvest Your CZF</h3>
        <p>Harvests your CZF for this pool and burns it for more future rewards.</p><br/>
        <button onClick={()=>sendReinvest(pool?.pid)} className='button has-background-grey-lighter is-fullwidth'>Reinvest</button>
      </div>
      <div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{border:"solid 1px #dbdbdb",maxWidth:"25em"}}>
        <h3 className="is-size-4">Claim Your CZF</h3>
        <p>Harvests your CZF for this pool only and transfers it to your wallet.</p><br/>
        <button onClick={()=>sendClaimPool(pool?.pid)} className='button has-background-grey-lighter is-fullwidth'>Harvest</button>
        <p>You will get {weiToShortString(BigNumber.from(poolAccountInfo?.emissionRate ?? 0).mul(epochDelta),3)} CZF approximately. Actual value can be different if your emissions are expiring.</p>
      </div>
      <div className="is-inline-block p-3 m-3 is-align-self-stretch" style={{border:"solid 1px #dbdbdb",maxWidth:"25em"}}>
        <h3 className="is-size-4">Fast Forward Rewards</h3>
        <p>Cancel your current CZF rewards from this Chrono Pool to get CZF now. You will get less CZF than if you wait.</p><br/>
        <p>For this {pool?.title} Chrono, you get <b>{(Number(poolInfo?.ffBasis ?? 0)/100).toFixed(2)}%</b> of your future CZF by calling fastforward.</p><br/>
        <button onClick={()=>sendClaimAndFastForward(pool?.pid)} className='button has-background-grey-lighter is-fullwidth'>Fast Forward</button>
        <p>You will get {weiToShortString(BigNumber.from(poolAccountInfo?.totalVesting ?? 0).mul(poolInfo?.ffBasis ?? 0).div(10000),3)} CZF immediately.</p>
      </div>

    </div>
    </>)}
  </CollapsibleCard>
      
  </>);
}