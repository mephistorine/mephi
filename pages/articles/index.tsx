import { GetStaticProps } from "next"
import Link from "next/link"
import { Footer, Header } from "../../components"
import { ARTICLES_BREADCRUMB } from "../../constants"
import { Article, ArticleLike, makeArticle } from "../../domain"
import { getAllArticles } from "../../entities"

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
    <Header breadcrumbs={ [ ARTICLES_BREADCRUMB ] }/>
    <main>
      <div className="icon-container mb-4">
        <div className="max-w-[100ch] mx-auto px-4 sm:p-0">
          <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">{ ARTICLES_BREADCRUMB.icon.get() }</p>
        </div>
      </div>
      <div className="max-w-[100ch] mx-auto px-4 sm:p-0 sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ ARTICLES_BREADCRUMB.name }</h1>

          <section className="mb-8 overflow-auto text-container">
            <ul>
              {
                articles.map((article) => {
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
    </main>
    <Footer />
  </>
}
