/*
In production the stylesheet is compiled to .next/static/style.css.
The file will be served from /_next/static/style.css
You could include it into the page using either next/head or a custom _document.js.
*/
import Document, { Head, Main, NextScript, Html } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script src="https://kit.fontawesome.com/d59431cf3c.js" crossOrigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
