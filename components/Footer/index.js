import React from 'react';
import {
  LINK_DISCORD,
  LINK_GITHUB,
  LINK_MEDIUM,
  LINK_PRIVACY_POLICY,
  LINK_TELEGRAM,
  LINK_TELEGRAM_ANN,
  LINK_TERMS_OF_USE,
  LINK_TWITTER,
  LINK_WHITEPAPER,
} from '../../constants/links';

function Footer() {
  return (
    <footer id="footer" className="footer p-5">
      <div className="content has-text-centered">
        <div>
          <a className="m-2" href={LINK_TELEGRAM} target="_blank">
            <span className="icon">
              <i className="fa-brands fa-telegram"></i>
            </span>
          </a>
          <a className="m-2" href={LINK_TELEGRAM_ANN} target="_blank">
            <span className="icon">
              <i className="fa-solid fa-bullhorn"></i>
            </span>
          </a>
          <a className="m-2" href={LINK_DISCORD} target="_blank">
            <span className="icon">
              <i className="fa-brands fa-discord"></i>
            </span>
          </a>
          <a className="m-2" href={LINK_TWITTER} target="_blank">
            <span className="icon">
              <i className="fa-brands fa-twitter"></i>
            </span>
          </a>
          <a className="m-2" href={LINK_GITHUB} target="_blank">
            <span className="icon">
              <i className="fa-brands fa-github"></i>
            </span>
          </a>
          <a className="m-2" href={LINK_MEDIUM} target="_blank">
            <span className="icon">
              <i className="fa-brands fa-medium"></i>
            </span>
          </a>
          <a className="m-2" href={LINK_WHITEPAPER} target="_blank">
            <span className="icon">
              <i className="fa-solid fa-file-lines"></i>
            </span>
          </a>
        </div>
      </div>
      <div
        className="pt-6 pb-6"
        style={{ maxWidth: '960px', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <h1 style={{ fontSize: '2em' }}>Terms of Use</h1>
        <p>
          By accessing any CZODIAC website, including but not limited to
          CZODIAC's decentralized applications and services, and engaging in any
          activities related to the CZODIAC ecosystem, including buying,
          selling, trading, holding CZODIAC tokens, or participating in the
          CZODIAC community, users acknowledge that they have read, understood,
          and agreed to be bound by the terms and conditions set forth in
          CZODIAC's Terms of Use. The Terms of Use, available at{' '}
          <a style={{ color: 'cyan' }} href={LINK_TERMS_OF_USE}>
            {LINK_TERMS_OF_USE}
          </a>
          , constitute a legally binding agreement between users and CZODIAC,
          and users should review them carefully before engaging in any
          activities related to the CZODIAC ecosystem. If users do not agree to
          the terms and conditions set forth in the Terms of Use, they should
          not access or use CZODIAC's websites, dapps, tokens, or other
          offerings. By using any CZODIAC website, users represent and warrant
          that they have the legal capacity to enter into a binding agreement
          with CZODIAC and that they comply with all applicable laws and
          regulations.
          <br />
          <br />
          <a style={{ color: 'cyan' }} href={LINK_TERMS_OF_USE}>
            LINK TO TERMS OF USE
          </a>
        </p>
        <br />
        <h1 style={{ fontSize: '2em' }}>Privacy Policy</h1>
        <p>
          At CZODIAC, we are committed to protecting the privacy and personal
          information of our users. We encourage you to read our Privacy Policy,
          which can be found at{' '}
          <a style={{ color: 'cyan' }} href={LINK_PRIVACY_POLICY}>
            {LINK_PRIVACY_POLICY}
          </a>
          . This policy outlines the types of personal information that CZODIAC
          may collect, the purposes for which this information is used, and the
          steps taken to ensure the security and confidentiality of your
          personal data. By using CZODIAC's websites or services, you
          acknowledge that you have read and understood our Privacy Policy and
          consent to the collection, use, and disclosure of your personal
          information as described therein. If you have any questions or
          concerns about our privacy practices, please contact us at
          team@czodiac.com.
          <br />
          <br />
          <a style={{ color: 'cyan' }} href={LINK_PRIVACY_POLICY}>
            LINK TO PRIVACY POLICY
          </a>
        </p>

        <br />
        <p>
          <b>CONTACT</b>
          <br />
          <small>team@czodiac.com</small>
        </p>
      </div>
      <p className="is-size-7 p-5">v0.0.3008b(experimental)</p>
    </footer>
  );
}

export default Footer;
