
import React from 'react';
import Web3ModalButton from '../Web3ModalButton';
import MenuDropdown from '../MenuDropdown'
import AccountInfo from '../AccountInfo'
import CZFLogo from "../../public/static/assets/logo192.png"
import CzcashLogo from "../../public/static/assets/logo-czcash.png"
import NumisLogo from "../../public/static/assets/logo-numis.png"
import CzodiacLogo from "../../public/static/assets/logo-czodiac.png"
import { LINK_CZFARM, LINK_CZCASH, LINK_CZODIAC, LINK_NUMIS } from '../../constants/links';
import styles from "./index.module.scss";

export default function Header({czfPrice,bnbPrice,czusdPrice,account,chainId,accountEtherBalance}) {
  return(<>
    <header id="top" className={"hero has-text-centered has-background-black-bis p-4 "+styles.Header}>
      <div className="hero-head level has-text-right">
          <a className='m-0 level-left  is-inline-block has-text-centered' href={LINK_CZFARM} >
            <figure className="image is-96x96" style={{marginLeft:"auto",marginRight:"auto"}}>
                <img src={CZFLogo} />
            </figure>
            <span className="has-text-white">CZ.FARM</span>
          </a>
          <a className='m-0 level-left  is-inline-block has-text-centered ml-2' href={LINK_CZCASH} target="_blank" >
            <figure className="image is-48x48" style={{marginLeft:"auto",marginRight:"auto"}}>
                <img src={CzcashLogo} />
            </figure>
            <span className="has-text-white is-size-7">CZ.CASH</span>
          </a>
          <a className='m-0 level-left  is-inline-block has-text-centered ml-2' href={LINK_NUMIS} target="_blank" >
            <figure className="image is-48x48" style={{marginLeft:"auto",marginRight:"auto"}}>
                <img src={NumisLogo} />
            </figure>
            <span className="has-text-white is-size-7">NUMIS</span>
          </a>
          <a className='m-0 level-left  is-inline-block has-text-centered ml-2' href={LINK_CZODIAC} target="_blank" >
            <figure className="image is-48x48" style={{marginLeft:"auto",marginRight:"auto"}}>
                <img src={CzodiacLogo} />
            </figure>
            <span className="has-text-white is-size-7">CZODIAC</span>
          </a>
          <div className="level-item level-right has-text-right is-block" >
            <a 
              href="https://dexscreener.com/bsc/0x98b5f5e7ec32cda1f3e89936c9972f92296afe47"
              target="_blank"
              style={{border:"solid 1px gray",borderRadius:"30px"}}
              className="m-1 has-background-special is-rounded has-text-white p-2">
                CZF ${Number(czfPrice).toFixed(8)}
            </a>
            <a
              href="https://dexscreener.com/bsc/0xd7c6fc00fae64cb7d242186bfd21e31c5b175671"
              target="_blank"
              style={{border:"solid 1px gray",borderRadius:"30px"}}
              className="m-1 has-background-special is-rounded has-text-white p-2">
                CZUSD ${Number(czusdPrice).toFixed(2)}
            </a>
          </div>
          <div style={{minWidth:"17.5em",minHeight:"6.8em"}} className="has-text-right is-inline-block level-right has-text-right">
            <Web3ModalButton />
            <MenuDropdown /><br/>
            <AccountInfo {...{account,accountEtherBalance}}/>
          </div>
        </div>
    </header>
  </>);
}