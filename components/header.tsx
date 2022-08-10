import Link from "next/link"
import { Maybe } from "../utils"
import { PageIcon } from "./page-icon"

export interface BreadcrumbItem {
  url: string
  icon: Maybe<string>
  name: string
  slug: Maybe<string>
}

interface HeaderProps {
  breadcrumbs?: readonly BreadcrumbItem[]
}

export function Header({ breadcrumbs = [] }: HeaderProps) {
  return <header className="p-2">
    <div className="flex justify-between">
      <div>
        <ul className="flex justify-between items-center gap-2">
          {
            breadcrumbs.map((breadcrumb) => {
              return <li key={ breadcrumb.name } className="after:content-['/'] after:ml-[0.3rem] after:text-[#bebebe] hidden first:flex first:after:invisible last:after:hidden sm:flex sm:first:after:visible">
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
