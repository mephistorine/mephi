import { useStore } from "@nanostores/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useRouter } from "next/router"
import { useCallback, useEffect } from "react"
import { SearchDialog } from "../components"
import { isShowSearchDialog } from "../stories"
import "../styles/globals.css"

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const showDialog = useStore(isShowSearchDialog)

  useEffect(() => isShowSearchDialog.set(false), [ pathname ])

  const onSearchDialogClose = useCallback(() => isShowSearchDialog.set(false), [])

  useEffect(() => {
    const onKeyDown = ({ metaKey, ctrlKey, code }: KeyboardEvent) => {
      if (code !== "KeyK") {
        return
      }

      if (navigator.userAgent.includes("Mac")) {
        if (metaKey) {
          isShowSearchDialog.set(true)
        }
      } else {
        if (ctrlKey) {
          isShowSearchDialog.set(true)
        }
      }
    }

    document.addEventListener("keydown", onKeyDown)

    return () => document.removeEventListener("keydown", onKeyDown)
  }, [])

  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/assets/images/favicon.png" sizes="400x400" />
    </Head>
    <div>
      <Component { ...pageProps } />
    </div>
    { showDialog && <SearchDialog onClose={ onSearchDialogClose } /> }
  </>
}
