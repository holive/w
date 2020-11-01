import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import MainMetaTags from '../lib/metaTags/MainMetaTags';
import GoogleFontsMetaTags from '../lib/metaTags/GoogleFontsMetaTags';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <MainMetaTags />
          <GoogleFontsMetaTags />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
