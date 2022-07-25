import { AppProps } from "next/app"
import Head from "next/head"

import "tailwindcss/tailwind.css"
import "./styles.css"

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to mephi.dev!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component { ...pageProps } />
    </>
  )
}

export default CustomApp
