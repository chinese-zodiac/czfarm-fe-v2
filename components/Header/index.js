
import React, { useContext } from 'react';
import { useEthers, useEtherBalance } from "@usedapp/core";
import Web3ModalButton from '../Web3ModalButton';
import MenuDropdown from '../MenuDropdown'
import AccountInfo from '../AccountInfo'
import CZFarmContext from '../../contexts/CZFarmContext';
import CZFLogo from "../../public/static/assets/logo192.png"
import CzcashLogo from "../../public/static/assets/logo-czcash.png"
import NumisLogo from "../../public/static/assets/logo-numis.png"
import CzodiacLogo from "../../public/static/assets/logo-czodiac.png"
import { LINK_CZFARM, LINK_CZCASH, LINK_CZODIAC, LINK_NUMIS } from '../../constants/links';
import styles from "./index.module.scss";
import { toShortString, weiToShortString } from '../../utils/bnDisplay';

export default function Header() {
  const { account, library, chainId } = useEthers();
  const { czfPrice, czrPrice, bnbPrice, czusdPrice, chronoTvlWei,
    exoticTvlWei,
    farmsV2TvlWei,
    poolsV1TvlWei,
    tribePoolsTvlWei } = useContext(CZFarmContext);
  const accountEtherBalance = useEtherBalance(account);
  return (<>
    <header id="top" className={"hero has-text-centered has-background-black-bis p-4 " + styles.Header}>
      <div className="hero-head columns is-desktop has-text-right pt-2">
        <a className='m-0 level-left is-inline-block has-text-centered' href={LINK_CZFARM} >
          <figure className="image is-96x96" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <img src={CZFLogo} />
          </figure>
          <span className="has-text-white">CZ.FARM</span>
        </a>
        <a className='m-0 level-left  is-inline-block has-text-centered ml-2' href={LINK_CZCASH} target="_blank" >
          <figure className="image is-48x48" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <img src={CzcashLogo} />
          </figure>
          <span className="has-text-white is-size-7">CZ.CASH</span>
        </a>
        <a className='m-0 level-left  is-inline-block has-text-centered ml-2' href={LINK_NUMIS} target="_blank" >
          <figure className="image is-48x48" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <img src={NumisLogo} />
          </figure>
          <span className="has-text-white is-size-7">NUMIS</span>
        </a>
        <a className='m-0 level-left  is-inline-block has-text-centered ml-2' href={LINK_CZODIAC} target="_blank" >
          <figure className="image is-48x48" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <img src={CzodiacLogo} />
          </figure>
          <span className="has-text-white is-size-7">CZODIAC</span>
        </a>
        <div className="level-item level-right has-text-right ml-2" >
          <a
            href="https://dexscreener.com/bsc/0xbf92a0c60a129a56485a3fb891851cf88798602d"
            target="_blank"
            style={{ border: "solid 1px gray", borderRadius: "30px" }}
            className="m-1 has-background-special is-rounded has-text-white p-2 has-text-centered">
            CZR: ${Number(czrPrice).toFixed(2)}
          </a>
          <a
            href="https://dexscreener.com/bsc/0xd7c6fc00fae64cb7d242186bfd21e31c5b175671"
            target="_blank"
            style={{ border: "solid 1px gray", borderRadius: "30px" }}
            className="m-1 has-background-special is-rounded has-text-white p-2 has-text-centered">
            CZUSD: ${Number(czusdPrice).toFixed(2)}
          </a>
          <div
            className="m-1 has-background-special has-text-white p-2 is-inline-block has-text-centered"
            style={{ border: "solid 1px gray", borderRadius: "30px" }} >
            TVL: ${weiToShortString(chronoTvlWei?.add(exoticTvlWei ?? 0).add(farmsV2TvlWei ?? 0).add(poolsV1TvlWei ?? 0) /*.add(tribePoolsTvlWei ?? 0)*/, 2)}
          </div>
        </div>
        <div style={{ minWidth: "17.5em", minHeight: "6.8em" }} className="has-text-right is-inline-block level-right has-text-right">
          <Web3ModalButton />
          <MenuDropdown /><br />
          <AccountInfo {...{ account, accountEtherBalance }} />
        </div>
      </div>
    </header>
  </>);
}