import React, { useEffect, useState } from 'react'
import type { ChainId } from '@usedapp/core'
import { useEthers, shortenAddress, useLookupAddress, useEtherBalance  } from '@usedapp/core'
import styled from 'styled-components'
import Web3Modal from 'web3modal'
import { AccountModal } from '../AccountModal'
import { MenuDropdown } from '../MenuDropdown'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { parseEther, formatEther } from '@ethersproject/units'

const Web3ModalButton = () => {
  const { account, activate, deactivate, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  const ens = useLookupAddress();
  const [activateError, setActivateError] = useState('');
  const { error } = useEthers();
  useEffect(() => {
    if (error) {
      console.log(error);
      setActivateError(error.message)
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
      setActivateError('')
    } catch (error: any) {
      setActivateError(error.message)
    }
  }

  return (
    <div className="container has-text-right mr-5 mt-3">
    {activateError && false && (
        <div 
            className="message is-warning is-inline-block mt-2 has-text-warning-dark has-background-warning pb-0 pt-1 pr-3 pl-3 is-small mb-0" 
            >
            {activateError}
        </div>
    )}
      {account ? (
        <>
        {chainId && chainId == 56 ? (<div 
            className="message is-inline-block has-text-tertiary ml-2" 
        >BSC<span className="icon has-text-success"><i className="fa-solid fa-check"></i></span></div>) : (
            <div 
                className="message is-inline-block has-text-danger ml-2" 
            >BSC Not Connected<span className="icon"><i className="fa-solid fa-xmark"></i></span></div>
        )}
        <button className="button is-inline-block ml-2 is-dark is-rounded" onClick={() => deactivate()}>Disconnect</button>
        <div className="is-inline-block ml-2 is-pulled-right">
          <MenuDropdown />
        </div>
        <div className='is-size-7' style={{position:"relative",marginRight:"5em"}}>
          {ens ?? shortenAddress(account)}<br/>
          {!!etherBalance ? Number(formatEther(etherBalance)).toFixed(4) : "..."} BNB
        </div>
        </>
      ) : (<>
        <button className="button is-inline-block ml-2 is-dark is-rounded" onClick={activateProvider}>Connect</button>
        <div className="is-inline-block ml-2 is-pulled-right">
          <MenuDropdown />
        </div>
      </>)}
    </div>
  )
}

export default Web3ModalButton;