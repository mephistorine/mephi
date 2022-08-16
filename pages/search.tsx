import { GetServerSideProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { Footer, Header } from "../components"
import { HOME_PAGE } from "../constants"
import { ArticleLike, BreadcrumbItem, SearchEntity, SearchEntityType, Talk } from "../domain"
import { ascSort, Maybe } from "../utils"
import { descSort } from "../utils/desc-sort"
import { makeSearchResult } from "../utils/make-search-result"

interface Props {
  queryString: string
  entities: readonly Readonly<SearchEntity<any>>[]
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const search = Maybe.ofNullable(query.s as string)

  if (search.isEmpty()) {
    throw new Error(`Query parameter "s" required`)
  }

  const queryString = search.get()

  return {
    props: {
      queryString,
      entities: makeSearchResult(queryString)
    }
  }
}

export default function Search({ queryString, entities }: Props) {
  const articles: readonly ArticleLike[] = entities.filter(s => s.type === SearchEntityType.article).map(v => v.value)
  const talks: readonly Talk[] = entities.filter(s => s.type === SearchEntityType.talk).map(v => v.value)
  const pages: readonly BreadcrumbItem[] = entities.filter(s => s.type === SearchEntityType.page).map(v => v.value)

  return <>
    <Head>
      <title>Результаты поиска: { queryString } – { HOME_PAGE.name }</title>
    </Head>
    <Header breadcrumbs={ [ HOME_PAGE ] } />
    <main>
      <div className="wrap sm:py-4">
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Результаты поиска: <span className="font-mono">{ queryString }</span></h1>
          </div>

          <section>
            {
              articles.length > 0 && <div>
                <h3 className="uppercase text-gray-400 tracking-widest text-xs select-none">Статьи</h3>

                <div className="overflow-auto text-container">
                  <ul>
                    {
                      articles
                        .slice()
                        .sort((a, b) => ascSort(a, b, v => Date.parse(v.createTime)))
                        .map((article) => {
                          return <li key={ article.slug }>
                            <Link href={ `/articles/${ article.slug }` }>
                              <a href={ `/articles/${ article.slug }` }>
                                { article.title }
                              </a>
                            </Link>
                          </li>
                        })
                    }
                  </ul>
                </div>
              </div>
            }

            {
              talks.length > 0 && <div>
                <h3 className="uppercase text-gray-400 tracking-widest text-xs select-none">Доклады</h3>

                <div className="overflow-auto text-container">
                  <ul>
                    {
                      talks
                        .slice()
                        .sort((a, b) => descSort(a, b, t => t.title.charCodeAt(0)))
                        .map((talk) => {
                          return <li key={ talk.slug }>
                            <Link href={ `/talks#${ talk.slug }` }>
                              <a href={ `/talks#${ talk.slug }` }>{ talk.title }</a>
                            </Link>
                          </li>
                        })
                    }
                  </ul>
                </div>
              </div>
            }

            {
              pages.length > 0 && <div>
                <h3 className="uppercase text-gray-400 tracking-widest text-xs select-none">Страницы</h3>

                <div className="overflow-auto text-container">
                  <ul>
                    {
                      pages
                        .slice()
                        .sort((a, b) => ascSort(a, b, t => t.name.charCodeAt(0)))
                        .map((page) => {
                          return <li key={ page.slug.get() }>
                            <Link href={ `/${ page.slug.get() }` }>
                              <a href={ `/${ page.slug.get() }` }>{ page.name }</a>
                            </Link>
                          </li>
                        })
                    }
                  </ul>
                </div>
              </div>
            }
          </section>
        </div>
      </div>

      <Footer />
    </main>
  </>
}
