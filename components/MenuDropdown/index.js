import React, {useState} from 'react'
import { LINK_TWITTER, LINK_TELEGRAM, LINK_GITHUB, LINK_DISCORD, LINK_MEDIUM, LINK_WHITEPAPER, LINK_TELEGRAM_ANN,
LINK_CZFARM, LINK_CZCASH, LINK_NUMIS} from '../../constants/links';
import {ADDRESS_CZF, ADDRESS_CZUSD} from '../../constants/addresses';
import LOGO_CZF from "../../public/static/assets/images/czf.svg";
import LOGO_CZUSD from "../../public/static/assets/images/czusd.svg";
import CzcashLogo from "../../public/static/assets/logo-czcash.png"
import NumisLogo from "../../public/static/assets/logo-numis.png"
import {tokenHref} from '../../utils/tokenHref';
import styles from "./index.module.scss";

import styled from 'styled-components'

export default function MenuDropdown () {
  const [isActive,setIsActive] = useState(false);
  return (<>
  <div className={"dropdown is-right m-1 is-inline-block "+styles.MenuDropdown+" "+(!!isActive?"is-active":"")}>
    <div className="dropdown-trigger">
      <button className="button is-dark is-rounded is-pulled-right" aria-haspopup="true" aria-controls="dropdown-menu"
        onClick={()=>setIsActive(!isActive)}>
        <span className="icon"><i className="fa-solid fa-bars"></i></span>
      </button>
    </div>
    <div className="dropdown-menu" id="dropdown-menu" role="menu">
      <div className="dropdown-content has-background-dark">
        <div className="dropdown-item has-text-grey has-text-left" href={LINK_TELEGRAM} target="_blank">
          Dapps
        </div>
        <a className="dropdown-item has-text-light" href={LINK_CZFARM} target="_blank">
          Farming: CZ.FARM<span className="icon"><figure className="image is-16x16" >
            <img src={LOGO_CZF} />
          </figure></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_CZCASH} target="_blank">
          Trading: CZ.CASH<span className="icon"><figure className="image is-16x16" >
            <img src={CzcashLogo} />
          </figure></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_NUMIS} target="_blank">
          Rare Coins: NUMIS<span className="icon"><figure className="image is-16x16" >
            <img src={NumisLogo} />
          </figure></span>
        </a>
        <div className="dropdown-item has-text-grey has-text-left" href={LINK_TELEGRAM} target="_blank">
          Tokens
        </div>
        <a className="dropdown-item has-text-light" href={tokenHref(ADDRESS_CZF)} target="_blank">
          CZF<span className="icon"><figure className="image is-16x16" >
            <img src={LOGO_CZF} />
          </figure></span>
        </a>
        <a className="dropdown-item has-text-light" href={tokenHref(ADDRESS_CZUSD)} target="_blank">
          CZUSD<span className="icon"><figure className="image is-16x16" >
            <img src={LOGO_CZUSD} />
          </figure></span>
        </a>
        <div className="dropdown-item has-text-grey has-text-left" href={LINK_TELEGRAM} target="_blank">
          Social
        </div>
        <a className="dropdown-item has-text-light" href={LINK_TELEGRAM} target="_blank">
          Telegram Chat<span className="icon"><i className="fa-brands fa-telegram"></i></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_TELEGRAM_ANN} target="_blank">
          Telegram Ann<span className="icon"><i className="fa-solid fa-bullhorn"></i></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_DISCORD} target="_blank">
          Discord Chat<span className="icon"><i className="fa-brands fa-discord"></i></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_TWITTER} target="_blank">
          Twitter Microblog<span className="icon"><i className="fa-brands fa-twitter"></i></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_GITHUB} target="_blank">
          Github Code<span className="icon"><i className="fa-brands fa-github"></i></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_MEDIUM} target="_blank">
          Medium Blog<span className="icon"><i className="fa-brands fa-medium"></i></span>
        </a>
        <a className="dropdown-item has-text-light" href={LINK_WHITEPAPER} target="_blank">
          Gitbook Litepaper<span className="icon"><i className="fa-solid fa-file-lines"></i></span>
        </a>
      </div>
    </div>
  </div>
  </>);
}