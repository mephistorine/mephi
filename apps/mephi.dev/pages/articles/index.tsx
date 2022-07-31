import { readdirSync, readFileSync } from "fs"
import matter from "gray-matter"
import { GetStaticProps } from "next"
import Link from "next/link"
import { join } from "path"
import ArticleTagView from "../../components/ArticleTagView"
import Footer from "../../components/Footer"
import Header, { BreadcrumbItem } from "../../components/Header"
import PageIcon from "../../components/PageIcon"
import { ARTICLES_BREADCRUMB, ARTICLES_PATH } from "../../contants"
import { TAGS } from "../../data/tags"
import { Article, ArticleForView } from "../../domain"

interface ArticlesProps {
  articleMetadatas: readonly ArticleForView[]
}

export const getStaticProps: GetStaticProps = () => {
  const articleFileNames: string[] = readdirSync(ARTICLES_PATH)

  const articleMetadatas: ArticleForView[] = []

  for (const fileName of articleFileNames) {
    const source: Buffer = readFileSync(join(ARTICLES_PATH, fileName))
    const frontMatterResult: matter.GrayMatterFile<Buffer> = matter(source)
    const articleMetaData = JSON.parse(JSON.stringify(frontMatterResult.data)) as Article

    articleMetadatas.push({
      ...articleMetaData,
      createTime: new Date(articleMetaData.createTime).toLocaleString("ru-RU", {
        dateStyle: "medium"
      }),
      updateTime: new Date(articleMetaData.updateTime).toLocaleString("ru-RU", {
        dateStyle: "medium"
      }),
      tags: articleMetaData.tags.map(t => TAGS.get(t))
    })
  }

  return {
    props: {
      articleMetadatas
    }
  }
}

export default function Articles({ articleMetadatas }: ArticlesProps) {
  const breadcrumbs: BreadcrumbItem[] = [ ARTICLES_BREADCRUMB ]

  return <>
    <Header breadcrumbs={ breadcrumbs } />
    <main>
      <div className="icon-container mb-4">
        <div className="max-w-[100ch] mx-auto px-4 sm:p-0">
          <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">{ ARTICLES_BREADCRUMB.icon }</p>
        </div>
      </div>
      <div className="max-w-[100ch] mx-auto px-4 sm:p-0 sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ ARTICLES_BREADCRUMB.name }</h1>

          <section className="mb-8 overflow-auto">
            <table className="w-full sm:text-sm">
              <tr className="text-gray-600 font-normal text-left">
                <th className="border border-gray-300 px-2 py-1">Название</th>
                <th className="border border-gray-300 px-2 py-1">Время создания</th>
                <th className="border border-gray-300 px-2 py-1">Время обновления</th>
                <th className="border border-gray-300 px-2 py-1">Метки</th>
              </tr>
              {
                articleMetadatas.map((article) => {
                  return <tr key={ article.slug }>
                    <td className="border border-gray-300 px-2 py-1">
                      <Link href={ "/articles/" + article.slug }>
                        <a href={ "/articles/" + article.slug }>
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
