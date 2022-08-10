import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { Footer, Header } from "../../components"
import { ARTICLES_BREADCRUMB, HOME_PAGE } from "../../constants"
import { Article, ArticleLike, makeArticle } from "../../domain"
import { getAllArticles } from "../../entities"
import { descSort } from "../../utils/desc-sort"

interface AllArticlesPageProps {
  articleData: readonly ArticleLike[]
}

export const getStaticProps: GetStaticProps<AllArticlesPageProps> = () => {
  const articles: readonly ArticleLike[] = getAllArticles()
  return {
    props: {
      articleData: articles
    }
  }
}

export default function AllArticlesPage({ articleData }: AllArticlesPageProps) {
  const articles: readonly Article[] = articleData.map((articleLike) => makeArticle(articleLike))

  return <>
    <Head>
      <title>Статьи – { HOME_PAGE.name }</title>
    </Head>
    <Header breadcrumbs={ [ HOME_PAGE, ARTICLES_BREADCRUMB ] } />
    <main>
      <div className="icon-container mb-4">
        <div className="wrap">
          <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">{ ARTICLES_BREADCRUMB.icon.get() }</p>
        </div>
      </div>
      <div className="wrap sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ ARTICLES_BREADCRUMB.name }</h1>

          <section className="mb-4 overflow-auto text-container">
            <ul>
              {
                articles
                  .slice()
                  .sort((a, b) => descSort(a, b, v => Date.parse(v.createTime)))
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
          </section>
        </div>
      </div>

      <Footer />
    </main>
  </>
}
