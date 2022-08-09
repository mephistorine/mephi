import type { AppProps } from "next/app"
import Head from "next/head"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Head>
      <title>Welcome to mephi.dev!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="icon" type="image/png" href="/assets/images/favicon.png" sizes="400x400" />
    </Head>
    <Component { ...pageProps } />
  </>
}
