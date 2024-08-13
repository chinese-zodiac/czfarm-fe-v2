import { BSC, DAppProvider, MetamaskConnector } from '@usedapp/core';
import Head from 'next/head';
import { withRouter } from 'next/router';
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { CZFarmProvider } from '../contexts/CZFarmContext';
import '../public/static/assets/fonts/stylesheet.css';
import Favicon from '../public/static/assets/logo192.png';
import OpenGraphImg from '../public/static/assets/opengraph.jpg';
import { WalletConnectV2Connector } from '@usedapp/wallet-connect-v2-connector';
import '../styles/styles.scss';

const config = {
  readOnlyChainId: BSC.chainId,
  readOnlyUrls: {
    [BSC.chainId]: 'https://bsc-dataseed1.binance.org/',
  },
  connectors: {
    metamask: new MetamaskConnector(),
    walletConnectV2: new WalletConnectV2Connector({
      projectId: '12bd48d937a680a4860c52eedab5b530',
      chains: [BSC],
      rpcMap: {
        56: 'https://rpc.ankr.com/bsc',
      },
    }),
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <DAppProvider config={config}>
      <Head>
        <title>CZ.Farm | Stablecoin Yield And High Yield Farms And Pools</title>
        <meta
          name="description"
          content="Earn the best BSC tokens with stablecoin yield and defi high yield farms and pools."
        />
        <meta name="robots" content="index, follow"></meta>
        <meta property="og:locale" content="en_EN" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" type="image/png" href={Favicon} />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16657419279"
        ></script>
        <script>
          {
            "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);};gtag('js', new Date());gtag('config', 'AW-16657419279');"
          }
        </script>
        <meta
          property="og:title"
          content="CZ.Farm | Stablecoin Yield And High Yield Farms And Pools"
        />
        <meta property="og:site_name" content="CZ.Farm" />
        <meta property="og:url" content="https://v2.cz.farm" />
        <meta
          property="og:description"
          content="Earn the best BSC tokens with stablecoin yield and defi high yield farms and pools."
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={'https://v2.cz.farm' + OpenGraphImg}
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="https://v2.cz.farm" />
        <meta
          name="twitter:title"
          content="CZ.Farm | Stablecoin Yield And High Yield Farms And Pools"
        />
        <meta
          name="twitter:image"
          content={'https://v2.cz.farm' + OpenGraphImg}
        />
        <meta name="twitter:image:width" content="1200" />
        <meta name="twitter:image:height" content="630" />
        <meta
          name="twitter:description"
          content="Earn the best BSC tokens with stablecoin yield and defi high yield farms and pools."
        />
      </Head>
      <CZFarmProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </CZFarmProvider>
    </DAppProvider>
  );
}

export default withRouter(MyApp);
