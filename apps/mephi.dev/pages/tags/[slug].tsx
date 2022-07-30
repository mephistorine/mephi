import { readdirSync, readFileSync } from "fs"
import matter from "gray-matter"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link"
import { join } from "path"
import ArticleTagView from "../../components/ArticleTagView"
import Footer from "../../components/Footer"
import Header, { BreadcrumbItem } from "../../components/Header"
import PageIcon from "../../components/PageIcon"
import { ARTICLES_PATH, TAGS_BREADCRUMB } from "../../contants"
import { TAGS } from "../../data/tags"
import { Article, ArticleForView, ArticleTag } from "../../domain"

interface TagProps {
  tag: ArticleTag
  articles: readonly ArticleForView[]
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths: { params: { slug: string } }[] = Array.from(TAGS.values())
    .map((tag: ArticleTag) => {
      return {
        params: {
          slug: tag.slug
        }
      }
    })

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<TagProps, { slug: string }> = ({ params }) => {
  const tag: ArticleTag | undefined = TAGS.get(params.slug)

  if (typeof tag === "undefined") {
    throw new Error(`Tag with name="${ tag }" have not info`)
  }

  const articles: readonly ArticleForView[] = readdirSync(ARTICLES_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName: string) => {
      const source: Buffer = readFileSync(join(ARTICLES_PATH, fileName))
      const frontMatterResult: matter.GrayMatterFile<Buffer> = matter(source)
      return JSON.parse(JSON.stringify(frontMatterResult.data)) as Article
    })
    .filter((article: Article) => article.tags.includes(params.slug))
    .map((article) => {
      return {
        ...article,
        createTime: new Date(article.createTime).toLocaleString("ru-RU", {
          dateStyle: "medium"
        }),
        updateTime: new Date(article.updateTime).toLocaleString("ru-RU", {
          dateStyle: "medium"
        }),
        tags: article.tags.map(t => TAGS.get(t))
      }
    })

  return {
    props: {
      tag,
      articles
    }
  }
}

export default function Tag({ tag, articles }: TagProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    TAGS_BREADCRUMB,
    {
      name: tag.slug,
      slug: null,
      url: `/tags/${ tag.slug }`,
      icon: null
    }
  ]

  return <>
    <Header breadcrumbs={ breadcrumbs } />
    <main>
      <div className="max-w-[100ch] mx-auto px-4 sm:p-0 sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ tag.slug }</h1>

          <section className="mb-8">
            <table className="w-full text-sm">
              <tr className="text-gray-600 font-normal text-left">
                <th className="border border-gray-300 px-2 py-1">Название</th>
                <th className="border border-gray-300 px-2 py-1">Время создания</th>
                <th className="border border-gray-300 px-2 py-1">Время обновления</th>
                <th className="border border-gray-300 px-2 py-1">Метки</th>
              </tr>
              {
                articles.map((article) => {
                  return <tr key={ article.slug }>
                    <td className="border border-gray-300 px-2 py-1">
                      <Link href={ "/articles/" + article.slug }>
                        <a href={ "/articles/" + article.slug } className="flex gap-1 items-center">
                          <PageIcon icon={ article.icon } slug={ article.slug } size="1em" emojiSize="1em" />
                          <span className="border-b">{ article.title }</span>
                        </a>
                      </Link>
                    </td>
                    <td className="border border-gray-300 px-2 py-1">{ article.createTime }</td>
                    <td className="border border-gray-300 px-2 py-1">{ article.updateTime }</td>
                    <td className="border border-gray-300 px-2 py-1">
                      <div className="flex gap-1">
                        {
                          article.tags.map((tag) => {
                            return <Link href={ "/tags/" + tag.slug }>
                              <a href={ "/tags/" + tag.slug }>
                                <ArticleTagView tag={ tag } />
                              </a>
                            </Link>
                          })
                        }
                      </div>
                    </td>
                  </tr>
                })
              }
            </table>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
}
