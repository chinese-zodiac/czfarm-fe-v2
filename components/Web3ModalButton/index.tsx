import React, { useEffect, useState } from 'react'
import { BSC, useEthers } from '@usedapp/core'
import LOGO_WCV2 from "../../public/static/assets/images/wcv2.svg";

const Web3ModalButton = () => {
  const { account, activateBrowserWallet, deactivate, chainId } = useEthers();

  const { error } = useEthers();
  useEffect(() => {
    if (error) {
      console.log(error);
      //setActivateError(error.message)
    }
  }, [error])

  const activateProvider = async (activationType) => {
    if(!!activationType){
      activateBrowserWallet({ type: activationType });
    }else{
      activateBrowserWallet();
    }
  }

  return (
    <>
      {account ? (
        <>
        {chainId && chainId == 56 ? (<div 
            className="message is-inline-block has-text-tertiary m-1 has-background-transparent" 
        >BSC<span className="icon has-text-success"><i className="fa-solid fa-check"></i></span></div>) : (
            <div 
                className="message is-inline-block has-text-danger m-1  has-background-transparent" 
            >Not BSC<span className="icon"><i className="fa-solid fa-xmark"></i></span></div>
        )}
        <button className="button is-inline-block m-1 is-dark is-rounded" onClick={() => deactivate()}>Disconnect</button>
        </>
      ) : (<>
        <button className="button is-inline-block m-1 is-dark is-rounded has-background-primary" onClick={()=>activateProvider('')}>CONNECT</button>
        <button className="button is-inline-block m-1 is-dark is-rounded has-background-primary" onClick={()=>activateProvider('walletConnectV2')}><span className="icon"><figure className="image is-16x16" >
            <img src={LOGO_WCV2} />
          </figure></span></button>
      </>)}
    </>
  )
}

export default Web3ModalButton;