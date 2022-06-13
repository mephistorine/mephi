import { AppProps } from "next/app"
import Head from "next/head"
import "tailwindcss/tailwind.css"
import "./styles.css"

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to mephi.dev!</title>
      </Head>
      <Component { ...pageProps } />
    </>
  )
}

export default CustomApp
