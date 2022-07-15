import { AppProps } from "next/app"
import Head from "next/head"
import "tailwindcss/tailwind.css"
import "./styles.css"
import Footer from "../components/Footer"
import Header from "../components/Header"

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to mephi.dev!</title>
      </Head>
      <Header></Header>
      <main>
        <Component { ...pageProps } />
      </main>
      <Footer></Footer>
    </>
  )
}

export default CustomApp
