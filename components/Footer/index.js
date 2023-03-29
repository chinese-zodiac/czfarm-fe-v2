import React from 'react';
import { LINK_DISCORD, LINK_GITHUB, LINK_MEDIUM, LINK_TELEGRAM, LINK_TELEGRAM_ANN, LINK_TWITTER, LINK_WHITEPAPER } from '../../constants/links';

function Footer() {
  return (<footer id="footer" className="footer p-5">
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
    <div className='pt-6 pb-6' style={{ maxWidth: "960px", marginLeft: "auto", marginRight: "auto" }}>
      <h1>Persons under US Jurisdiction must not use CZ.FARM or other CZODIAC dapps, tokens, or services.</h1>
      <p>All persons under US jurisdiction must not use CZODIAC dapps, tokens, or services. It is your responsibility to determine if you are under US jurisdiction and remove yourself from the project as czodiac does not have the capability to do so.</p>
      <p>
        <b>IMPORTANT: Do not expect profits from other's efforts.</b><br />
        <small>
          Nothing on this site or on related channels should be considered a promise by anyone, including but not limited to the developers and promoters of this site, to perform work to generate profits for anyone including but not limited to the following: the users of this site; CZodiac community members; CZF holders; CZR holders; CZUSD holders; or anyone using any of the sites, smart contracts, social media channels, and any other media or tech related to CZF, CZR and CZodiac or any of the community members. Czodiac, CZF, CZR, cz.farm, and related technologies plus media are all experimental and must be used according to your personal financial situation and risk profile. There are no guarantees of profits.
        </small>
      </p>
      <br />
      <p>
        <b>WARNING: You may incur a tax liability.</b><br />
        <small>
          Please consult your tax adviser before using CZ.FARM, CZodiac products, CZodiac tokens, other dapps linked by this site. Just like for every blockchain dapp, there may be complex taxation issues depending on your jurisdiction.
        </small>
      </p>
      <br />
      <p>
        <b>WARNING: You are using experimental technology.</b><br />
        <small>
          All CZodiac products are experimental technology which may fail in unexpected ways from causes such as hacks, tokenomic design, software errors, or other unexpected issues that can not be anticipated as with any other experimental technology. Do not trust CZodiac dapps or other products with more funds than you can afford to use. Use CZodiac at your own risk, just as you would with any other innovative blockchain dapp.
        </small>
      </p>
      <br />
      <p>
        <b>DISCLAIMER: Use at your own risk.</b><br />
        <small>
          All information provided by CZ.FARM and other CZodiac products, tokens, and dapps has no guarantee of completeness, accuracy, timeliness or of the results obtained from the use of information and/or CZodiac products, and without warranty of any kind, express or implied, including but not limited to warranties of performance, merchantability and fitness for a particular purpose.<br />
          CZodiac and its members, team, developers, affiliates, associates, token holders, or other individuals or organizations involved in CZodiac products, dapps, or other services will not be liable to you or anyone else for any decision made or action taken in reliance on the information given by CZ.FARM or other CZodiac dapps or services for any consequential, special or similar damages, even if advised of the possibility of such damages.
        </small>
      </p>
      <br />
      <p>
        <b>CONTACT</b><br />
        <small>
          For questions about the above notices, warnings, and/or disclaimers you may contact via email "team @ czodiac . com".
        </small>
      </p>
    </div>
    <p className='is-size-7 p-5'>v0.0.3000c(experimental)</p>
  </footer>);
}

export default Footer;