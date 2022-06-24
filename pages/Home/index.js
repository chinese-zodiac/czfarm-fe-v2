
import React, { Component, useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import "./index.module.scss";
import { useEthers, useContractFunction, useCall  } from '@usedapp/core'
import { utils, Contract } from 'ethers'
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();

  return (<>
    <Header />
    <main id="main" className="hero has-text-centered has-background-special">
      test
    </main>
    <Footer />
    
  </>);
}

export default Home
