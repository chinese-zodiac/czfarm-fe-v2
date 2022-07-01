
import React, { Component, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import "./index.module.scss";
import { useEthers, useContractFunction, useCall, useEtherBalance  } from '@usedapp/core';
import {useCoingeckoPrice } from '@usedapp/coingecko';
import { utils, Contract } from 'ethers'
import useV2FarmsPoolInfo from '../../hooks/useV2FarmsPoolInfo';
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();
  const czusdPrice = useCoingeckoPrice("czusd");
  const czfPrice = useCoingeckoPrice("czfarm");
  const bnbPrice = useCoingeckoPrice("binancecoin");
  const accountEtherBalance = useEtherBalance(account);

  const v2FarmsPoolInfo = useV2FarmsPoolInfo(library);


  return (<>
    <Header {...{czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}} />
    <main id="main" className="hero has-text-centered has-background-special p-3">
      <div id="statsBar">
        {v2FarmsPoolInfo?.[1]?.pid?.toString()}<br/>
        {v2FarmsPoolInfo?.[1]?.lpToken?.toString()}
      </div>
    </main>
    <Footer />
    
  </>);
}

export default Home
