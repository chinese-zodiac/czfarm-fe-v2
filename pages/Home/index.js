
import React, { Component, useEffect, useState } from 'react';
import Web3ModalButton from '../../components/Web3ModalButton';
import Footer from '../../components/Footer';
import "./index.module.scss";
import CZFLogo from "../../public/static/assets/logo192.png"
import { useEthers, useContractFunction, useCall  } from '@usedapp/core'
import { utils, Contract } from 'ethers'
const { formatEther, parseEther, Interface } = utils;

function Home() {
  const {account,library,chainId,activateBrowserWallet} = useEthers();

  return (<>
    <section id="top" className="hero has-text-centered">
        <div>
            <div className="hero-head has-text-left">
                <a className='m-0 is-pulled-left' href="https://cz.farm">
                  <figure className="image is-64x64">
                      <img src={CZFLogo} />
                  </figure>
                  <span className="has-text-white">CZ.FARM</span>
                </a>
                <Web3ModalButton />
            </div>
        </div>
    </section>
    
    <Footer />
    
  </>);
}

export default Home
