import App from 'next/app';
import React from 'react';
import './styles.css';
import '../src/components/pin/pin.module.css';
import '../src/components/main/index.module.css';
import '../src/components/sidebar/index.module.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default MyApp;
