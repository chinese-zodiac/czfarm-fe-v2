import App from 'next/app';
import Head from 'next/head';
import React from 'react';
import Router, { withRouter } from 'next/router';
import { DAppProvider, BSC} from '@usedapp/core'
import OpenGraphImg from '../public/static/assets/opengraph.jpg';
import Favicon from '../public/static/assets/logo192.png';
import '../public/static/assets/fonts/stylesheet.css';
import '../styles/styles.scss';

const config = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: 'https://bscrpc.com'
  },
  networks:[BSC]
}

class MyApp extends App {
  static async getInitialProps(props) {
    const { Component, ctx } = props;
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }
    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <DAppProvider config={config}>
          <Head>
            <title>CZ.Farm | Stablecoin Yield And High Yield Farms And Pools</title>
            <meta name="description" content= "Earn the best BSC tokens with stablecoin yield and defi high yield farms and pools." />
            <meta name="robots" content= "index, follow"></meta>
            <meta property="og:locale" content="en_EN"/>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
              rel="shortcut icon"
              type="image/png"
              href={Favicon}
            />
              
            <meta property="og:title" content="CZ.Farm | Stablecoin Yield And High Yield Farms And Pools" />
            <meta property="og:site_name" content="CZ.Farm" />
            <meta property="og:url" content="https://cz.farm" />
            <meta property="og:description" content="Earn the best BSC tokens with stablecoin yield and defi high yield farms and pools." />
            <meta property="og:type" content="article" />
            <meta property="og:image" content={"https://cz.farm"+OpenGraphImg} />
            <meta property="og:image:width" content="1200" /> 
            <meta property="og:image:height" content="630" />

            <meta name="twitter:card" content="summary_large_image"/>
            <meta name="twitter:site" content="https://cz.farm" />
            <meta name="twitter:title" content="CZ.Farm | Stablecoin Yield And High Yield Farms And Pools"/>
            <meta name="twitter:image" content={"https://cz.farm"+OpenGraphImg} />
            <meta name="twitter:image:width" content="1200"/>
            <meta name="twitter:image:height" content="630"/>
            <meta name="twitter:description" content="Earn the best BSC tokens with stablecoin yield and defi high yield farms and pools."/>


          </Head>
          <Component {...pageProps} />
      </DAppProvider>
    );
  }
}

export default withRouter(MyApp);
