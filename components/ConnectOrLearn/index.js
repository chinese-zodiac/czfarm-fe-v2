
import React from 'react';
import Web3ModalButton from '../../components/Web3ModalButton';
import { shortenAddress, useLookupAddress} from '@usedapp/core'
import { formatEther } from '@ethersproject/units'
import {LINK_TELEGRAM} from "../../constants/links";

export default function ConnectOrLearn() {
  return(<>
    <div className='is-size-5 m-5'>
      Connect your wallet to BSC.<br/>
      <Web3ModalButton />
    </div>
    <div className='is-size-5 m-5'>
      New to crypto?<br/>
      Our global community helps people young and old learn.<br/>
      <span className='is-size-6 '>For assistance, email team@czodiac.com or visit our telegram at <a className='has-text-primary' href={LINK_TELEGRAM} target="_blank">{LINK_TELEGRAM}</a>. Just mention you saw this message and want to learn how to use cz.farm.</span>
      <br/><br/>
      <span className='is-size-6'>Quick Tutorial:</span><br/>
      <a href="https://www.safepal.io/download" className='button is-primary is-outlined' target="_blank" >Get SafePal for iOS or Android.</a><br/>
      <span className='is-size-6'>With SafePal, you can use the "Connect" button on the top of this webpage. After you download and setup the SafePal app, visit this site on your browser and click "Connect" then select "WalletConnect". In the WalletConnect, search for "SafePal" and select it. Then open your SafePal app to approve the request. You will also need BNB in your wallet to trade CZF and CZUSD. You can think of BNB as like the "gas" for your car, it is what lets you do things in crypto. In SafePal, select the BSC network and you will be able to purchase BNB with your credit card.</span><br/>
    </div>
  </>);
}