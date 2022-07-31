import Link from "next/link"
import PageIcon from "./PageIcon"

export interface BreadcrumbItem {
  url: string
  icon: string | null
  name: string
  slug: string | null
}

interface HeaderProps {
  breadcrumbs?: readonly BreadcrumbItem[]
}

export default function Header({ breadcrumbs = [] }: HeaderProps) {

  return <header className="text-xs p-2" style={{ padding: "0.5rem" }}>
    <div className="mx-auto max-w-[80ch] flex justify-between whitespace-nowrap max-w-[100px] overflow-auto">
      <div>
        <ul className="hidden justify-between items-center gap-2">
          <li className="breadcrumbs-item flex">
            <Link href="/">
              <a className="special-link flex items-center gap-2 interactive">
                <span>😹</span>
                <span>Сэм Булатов — Блог</span>
              </a>
            </Link>
          </li>

          {
            breadcrumbs.map((breadcrumb) => {
              return <li key={ breadcrumb.name } className="breadcrumbs-item hidden sm:flex">
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
        <button className="interactive flex gap-1 items-center">
          <object className="not-sr-only text-black pointer-events-none" data="/assets/icons/search.svg" type="image/svg+xml">
            <img className="not-sr-only" src="/assets/icons/search.svg" />
          </object>
          <span className="hidden sm:block">Найти</span>
        </button>

        <button className="interactive flex gap-1">
          <object className="not-sr-only text-black pointer-events-none" data="/assets/icons/share.svg" type="image/svg+xml">
            <img className="not-sr-only" src="/assets/icons/share.svg" />
          </object>
          <span className="hidden sm:block">Поделиться</span>
        </button>
      </div>
    </div>
  </header>
}
