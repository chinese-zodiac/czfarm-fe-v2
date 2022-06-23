
import React, { Component, useEffect, useState } from 'react';
import Web3ModalButton from '../../components/Web3ModalButton';
import Footer from '../../components/Footer';
import "./index.module.scss";
import { useEthers, useContractFunction, useCall  } from '@usedapp/core'
import { utils, Contract } from 'ethers'
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();

  return (<>
    <section id="top" className="hero has-text-centered">
        <div>
            <div className="hero-head has-text-left">
                <Web3ModalButton />
            </div>
        </div>
    </section>
    
    <Footer />
    
  </>);
}

export default Home
