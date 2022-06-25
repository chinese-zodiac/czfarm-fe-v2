import React, { useEffect, useState } from 'react'
import { useEthers } from '@usedapp/core'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'

const Web3ModalButton = () => {
  const { account, activate, deactivate, chainId } = useEthers();

  const { error } = useEthers();
  useEffect(() => {
    if (error) {
      console.log(error);
      //setActivateError(error.message)
    }
  }, [error])

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: 'Metamask',
          description: 'Connect with the provider in your Browser',
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: 'https://bridge.walletconnect.org',
          infuraId: 'd8df2cb7844e4a54ab0a782f608749dd',
          rpc: {
            56: "https://rpc.ankr.com/bsc"
          }
        },
      },
    }

    const web3Modal = new Web3Modal({
      providerOptions,
    })
    try {
      const provider = await web3Modal.connect()
      await activate(provider)
      //setActivateError('')
    } catch (error: any) {
      //setActivateError(error.message)
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
        <button className="button is-inline-block m-1 is-dark is-rounded has-background-primary" onClick={activateProvider}>Connect</button>
      </>)}
    </>
  )
}

export default Web3ModalButton;