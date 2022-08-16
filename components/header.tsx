import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { BreadcrumbItem } from "../domain"
import ShareIcon from "../public//assets/icons/share.svg"
import SearchIcon from "../public/assets/icons/search.svg"
import { isShowSearchDialog } from "../stories"
import { PageIcon } from "./page-icon"

interface HeaderProps {
  breadcrumbs?: readonly BreadcrumbItem[]
}

export function Header({ breadcrumbs = [] }: HeaderProps) {
  const router = useRouter()
  const [ canShare, setCanShare ] = useState(false)

  const shareData: ShareData = {
    url: `https://mephi.dev${ router.pathname }`,
    title: (breadcrumbs.at(-1) as any).name
  }

  useEffect(() => {
    setCanShare(Reflect.has(navigator, "canShare") && navigator.canShare(shareData))
  }, [])

  const onClickShareButton = async () => {
    await navigator.share(shareData)
      .catch(() => {})
  }

  const onClickSearchButton = () => {
    isShowSearchDialog.set(true)
  }

  return <header className="p-2 max-w-[1440px]">
    <div className="flex justify-between">
      <div>
        <ul className="flex justify-between items-center gap-2">
          {
            breadcrumbs.map((breadcrumb) => {
              return <li key={ breadcrumb.name }
                         className="after:content-['/'] after:ml-[0.3rem] after:text-[#bebebe] hidden first:flex first:after:invisible last:after:hidden sm:flex sm:first:after:visible">
                <Link href={ breadcrumb.url }>
                  <a className="special-link flex items-center gap-2 interactive">
                    <PageIcon icon={ breadcrumb.icon } slug={ breadcrumb.slug } size="1rem" emojiSize="1rem" />
                    <span>{ breadcrumb.name }</span>
                  </a>
                </Link>
              </li>
            })
          }
        </ul>
      </div>

      <div className="flex gap-2">
        <button onClick={ onClickSearchButton } className="interactive flex gap-1 items-center">
          <span className="w-[1em]"><SearchIcon /></span>
          <span className="hidden sm:block">Найти</span>
        </button>

        {
          canShare && <button className="interactive flex gap-1 items-center" onClick={onClickShareButton}>
            <span className="w-[1em]"><ShareIcon /></span>
            <span className="hidden sm:block">Поделиться</span>
          </button>
        }
      </div>
    </div>
  </header>
}
