
import React from 'react';
import Web3ModalButton from '../Web3ModalButton';
import CZFLogo from "../../public/static/assets/logo192.png"
import { LINK_CZFARM } from '../../constants/links';
import styles from "./index.module.scss";

export default function Header() {
  return(
    <header id="top" className={"hero has-text-centered has-background-black-bis p-3 "+styles.Header}>
      <div className="hero-head has-text-left">
          <a className='m-0 is-pulled-left' href={LINK_CZFARM}>
            <figure className="image is-64x64">
                <img src={CZFLogo} />
            </figure>
            <span className="has-text-white">CZ.FARM</span>
          </a>
          <Web3ModalButton />
      </div>
    </header>)

}