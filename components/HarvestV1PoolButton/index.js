
import React from 'react';
import { utils, Contract, BigNumber } from 'ethers'
import {useContractFunction} from '@usedapp/core';
import {weiToShortString, weiToUsdWeiVal, weiTolpPricedWeiVal} from '../../utils/bnDisplay';
import czFarmPoolAbi from "../../abi/CZFarmPool.json";

export default function HarvestV1PoolButton({library,pendingReward,assetName,poolAddress}) {
  const { state:stateWithdraw, send:sendWithdraw } = useContractFunction(
  new Contract(poolAddress,czFarmPoolAbi,library),
  'withdraw');

  return(<>
  <button onClick={()=>sendWithdraw(0)} className='button is-small  is-rounded is-primary m-1' >Harvest {weiToShortString(pendingReward,2)} {assetName}</button>
      
  </>);
}