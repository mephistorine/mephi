import type { AppProps } from "next/app"
import Head from "next/head"
import { useCallback, useEffect, useState } from "react"
import { SearchDialog } from "../components"
import { isShowSearchDialog } from "../stories"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  const [ isShowDialog, setIsShowDialog ] = useState(false)

  useEffect(() => {
    isShowSearchDialog.listen((value: boolean) => {
      setIsShowDialog(value)
    })
  }, [])

  const onSearchDialogClose = useCallback(() => {
    setIsShowDialog(false)
  }, [])

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/assets/images/favicon.png" sizes="400x400" />
    </Head>
    <Component { ...pageProps } />
    { isShowDialog && <SearchDialog onClose={ onSearchDialogClose } /> }
  </>
}
