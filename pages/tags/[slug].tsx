import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { Footer, Header } from "../../components"
import { HOME_PAGE, TAGS_BREADCRUMB } from "../../constants"
import { getTag, TAGS } from "../../data"
import { ArticleLike, ArticleTag } from "../../domain"
import { getAllArticles } from "../../entities"
import { Maybe } from "../../utils"
import { descSort } from "../../utils/desc-sort"

interface TagsPageProps {
  tag: Readonly<ArticleTag>
  articles: readonly ArticleLike[]
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: Array.from(TAGS.values()).map((tag) => ({ params: { slug: tag.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<TagsPageProps, { slug: string }> = ({ params }) => {
  if (typeof params === "undefined") {
    throw new Error(`Params must be defined`)
  }

  const tag: Maybe<Readonly<ArticleTag>> = getTag(params.slug)

  if (tag.isEmpty()) {
    throw new Error(`Tag with slug="${ params.slug }" does not exist`)
  }

  const articles: ArticleLike[] = getAllArticles().filter((article) => article.tags.includes(tag.get().slug))

  return {
    props: {
      articles,
      tag: tag.get()
    }
  }
}

export default function TagsPage({ articles, tag }: TagsPageProps) {
  return <>
    <Head>
      <title>Метка: { tag.slug } – { HOME_PAGE.name }</title>
    </Head>
    <Header breadcrumbs={ [ HOME_PAGE, TAGS_BREADCRUMB ] } />
    <main>
      <div className="wrap sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">Метка: { tag.slug }</h1>

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
