
import React, {useEffect, useState} from 'react';
import InputTokenEther from '../../components/InputTokenEther';
import ConnectOrLearn from '../../components/ConnectOrLearn';
import CollapsibleCard from '../../components/CollapsibleCard';
import QuickInputEther from '../../components/QuickInputEther';
import CZFLogo from "../../public/static/assets/logo192.png";
import { ADDRESS_CHRONOPOOLS } from '../../constants/addresses';
import chronoPoolAbi from "../../abi/ChronoPoolService.json";
import { utils, Contract, BigNumber } from 'ethers'
import { weiToShortString, weiToUsdWeiVal } from '../../utils/bnDisplay';
import {useContractFunction} from '@usedapp/core';
const { formatEther, parseEther, Interface } = utils;

export default function ManageFarmV2({account,library,farm,v2FarmsLpBal,v2FarmsPoolInfo,v2FarmsPendingCzf,v2FarmsUserInfo,lpInfo,accountLpBal}) {
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
      <div className='is-inline-block has-text-weight-light  m-0 p-0' style={{lineHeight:"1.2em",whiteSpace:"nowrap",width:"6.5em"}}>
        <span className='is-size-7 has-text-grey-light'>TYPE</span><br/>
        <span className='is-size-6'>{farm?.tokens?.[0]?.symbol}/{farm?.tokens?.[1]?.symbol}</span>
      </div>
      <div className='is-inline-block has-text-weight-light  m-0 p-0' style={{lineHeight:"1.2em",whiteSpace:"nowrap",width:"2em"}}>
        <span className='is-size-7 has-text-grey-light'>DEX</span><br/>
        <span className='is-size-6'>{farm?.dex?.shortName}</span>
      </div>
      <div className='is-inline-block has-text-weight-light m-0 p-0 ml-2' style={{lineHeight:"1.2em",width:"4.5em"}}>
        <span className='is-size-7 has-text-grey-light'>APR</span><br/>
        <span className='is-size-5'>{apr.toFixed(2)}%</span>
      </div>
      <div className='is-inline-block has-text-weight-light m-0 p-0 ml-2 has-text-center' style={{lineHeight:"1.2em",width:"4.5em"}}>
        <span className='is-size-7 has-text-grey-light'>CZF/DAY</span><br/>
        <span className='is-size-5'>??</span>
      </div>
      <div className='is-inline-block has-text-weight-light m-0 p-0 ml-2 has-text-center' style={{lineHeight:"1.2em",width:"4.5em"}}>
        <span className='is-size-7 has-text-grey-light'>STAKE</span><br/>
        <span className='is-size-5'>??</span>
      </div>
      <div className='is-inline-block has-text-weight-light m-0 p-0 ml-2 has-text-center' style={{lineHeight:"1.2em",width:"4.5em"}}>
        <span className='is-size-7 has-text-grey-light'>EST CLAIM</span><br/>
        <span className='is-size-5'>{weiToShortString(v2FarmsUserInfo?.pendingRewards,1)}</span>
      </div>
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