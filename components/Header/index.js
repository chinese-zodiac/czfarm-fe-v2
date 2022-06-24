
import React from 'react';
import Web3ModalButton from '../Web3ModalButton';
import MenuDropdown from '../MenuDropdown'
import AccountInfo from '../AccountInfo'
import CZFLogo from "../../public/static/assets/logo192.png"
import { LINK_CZFARM } from '../../constants/links';
import styles from "./index.module.scss";

export default function Header({czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}) {
  return(<>
    <header id="top" className={"hero has-text-centered has-background-black-bis p-3 "+styles.Header}>
      <div className="hero-head has-text-right">
          <a className='m-0 is-pulled-left' href={LINK_CZFARM}>
            <figure className="image is-64x64">
                <img src={CZFLogo} />
            </figure>
            <span className="has-text-white">CZ.FARM</span>
          </a>
          <div className="has-text-right is-inline-block is-pulled-right">
            <Web3ModalButton />
            <MenuDropdown /><br/>
            <AccountInfo {...{account,accountEtherBalance}}/>
          </div>
          <div className="has-text-right is-inline-block">

            <a 
              href="https://dexscreener.com/bsc/0x98b5f5e7ec32cda1f3e89936c9972f92296afe47"
              target="_blank"
              style={{border:"solid 1px gray",borderRadius:"30px"}}
              className="m-1 has-background-special is-rounded is-inline-block has-text-white p-2">
                CZF ${Number(czfPrice).toFixed(8)}
            </a>
            <a
              href="https://dexscreener.com/bsc/0xd7c6fc00fae64cb7d242186bfd21e31c5b175671"
              target="_blank"
              style={{border:"solid 1px gray",borderRadius:"30px"}}
              className="m-1 has-background-special is-rounded is-inline-block has-text-white p-2">
                CZUSD ${Number(czusdPrice).toFixed(2)}
            </a>
          </div>
        </div>
    </header>
  </>);
}