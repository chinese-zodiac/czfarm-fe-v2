import React from 'react';
import { LINK_TWITTER, LINK_TELEGRAM, LINK_GITHUB, LINK_DISCORD, LINK_MEDIUM, LINK_WHITEPAPER, LINK_TELEGRAM_ANN} from '../../constants/links';

function Footer() {
    return(<footer id="footer" className="footer">
    <div className="content has-text-centered">
      <div>
        <a className="m-2" href={LINK_TELEGRAM} target="_blank">
          <span className="icon"><i className="fa-brands fa-telegram"></i></span>
        </a>
        <a className="m-2" href={LINK_TELEGRAM_ANN} target="_blank">
          <span className="icon"><i className="fa-solid fa-bullhorn"></i></span>
        </a>
        <a className="m-2" href={LINK_DISCORD} target="_blank">
          <span className="icon"><i className="fa-brands fa-discord"></i></span>
        </a>
        <a className="m-2" href={LINK_TWITTER} target="_blank">
          <span className="icon"><i className="fa-brands fa-twitter"></i></span>
        </a>
        <a className="m-2" href={LINK_GITHUB} target="_blank">
          <span className="icon"><i className="fa-brands fa-github"></i></span>
        </a>
        <a className="m-2" href={LINK_MEDIUM} target="_blank">
          <span className="icon"><i className="fa-brands fa-medium"></i></span>
        </a>
        <a className="m-2" href={LINK_WHITEPAPER} target="_blank">
          <span className="icon"><i className="fa-solid fa-file-lines"></i></span>
        </a>
      </div>
    </div>
  </footer>);
}

export default Footer;