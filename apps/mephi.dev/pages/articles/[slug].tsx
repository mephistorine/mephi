import remarkA11yEmoji from "@fec/remark-a11y-emoji"
import rehypeShiki from "@leafac/rehype-shiki"
import cn from "classnames"
import { readdirSync, readFileSync } from "fs"
import matter from "gray-matter"
import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import Head from "next/head"
import Link from "next/link"
import { join } from "path"
import remarkGfm from "remark-gfm"
import remarkHeadingId from "remark-heading-id"
import { getHighlighter } from "shiki"
import Footer from "../../components/Footer"
import Header, { BreadcrumbItem } from "../../components/Header"

import { ARTICLES_PATH } from "../../contants"
import { TAGS } from "../../data/tags"
import { Article, ArticlePoster, ArticleTag } from "../../domain"
import { formatDate, isStringHasEmoji } from "../../utils"
import { makeTitle } from "../../utils/make-title"
import { rehypeHeadings } from "../../utils/rehype-headings"
import { rehypeTableOfContents } from "../../utils/rehype-table-of-contents"

interface ArticleProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  metadata: Article
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths: { params: { slug: string } }[] = readdirSync(ARTICLES_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ArticleProps, { slug: string }> = async ({ params }) => {
  const articleFilePath: string = join(ARTICLES_PATH, `${ params.slug }.mdx`)
  const source: Buffer = readFileSync(articleFilePath)
  const frontMatterResult: matter.GrayMatterFile<Buffer> = matter(source)
  const articleMetaData = JSON.parse(JSON.stringify(frontMatterResult.data)) as Article

  const highlighter = await getHighlighter({
    theme: "github-light",
    themes: [
      "github-dark",
      "github-light"
    ],
    langs: [
      "html",
      "css",
      "javascript",
      "typescript",
      "json"
    ]
  })

  const mdxSerializeResult: MDXRemoteSerializeResult<Record<string, unknown>> = await serialize(frontMatterResult.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkHeadingId,
        remarkA11yEmoji
      ],
      rehypePlugins: [
        [
          rehypeShiki,
          {
            highlighter
          }
        ],
        rehypeHeadings,
        rehypeTableOfContents
      ]
    },
    scope: articleMetaData as any
  })

  return {
    props: {
      source: mdxSerializeResult,
      metadata: articleMetaData
    }
  }
}

function getPosterUrl(slug: string, poster: ArticlePoster): string {
  return `/articles/${ slug }/${ poster.src }`
}

function ArticlePosterView({ article }: { article: Article }): JSX.Element {
  return <div>
    <img className="max-h-[300px] w-full object-cover object-center" src={ getPosterUrl(article.slug, article.poster) } alt={ article.title } />
  </div>
}

function ArticleIconView({ article }: { article: Article }) {
  const icon: string = article.icon

  if (icon.startsWith("http")) {
    return <img className="w-[80px] h-[80px] rounded" src={ icon } alt="" />
  }

  if (isStringHasEmoji(icon)) {
    return <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">
      <span>{ icon }</span>
    </p>
  }

  return <img className="w-[80px] h-[80px] rounded" src={ `/articles/${ article.slug }/${ icon }` } alt="" />
}

export default function ArticleView({ source, metadata }: ArticleProps): JSX.Element {
  const tags = metadata.tags.map((tag) => {
    const tagInfo: ArticleTag | undefined = TAGS.get(tag)

    if (typeof tagInfo === "undefined") {
      throw new Error(`Tag with name="${ tag }" have not info`)
    }

    return tagInfo
  })

  const havePoster: boolean = Reflect.has(metadata, "poster")
  const haveIcon: boolean = Reflect.has(metadata, "icon")

  const mdxComponents = {}

  const breadcrumbs: readonly BreadcrumbItem[] = [
    {
      name: "Статьи",
      icon: "📚",
      url: "/articles/"
    },
    {
      name: metadata.title,
      icon: metadata.icon,
      url: `/articles/${ metadata.slug }`
    }
  ]

  return (
    <>
      <Head>
        <title>{ makeTitle(metadata.title) }</title>
      </Head>

      <Header breadcrumbs={breadcrumbs} />
      <main>
        { havePoster ? <ArticlePosterView article={ metadata } /> : null }

        {
          haveIcon ? <div className={ cn("icon-container", "mb-4", { "have-poster": havePoster }) }>
            <div className="wrap">
              <ArticleIconView article={ metadata } />
            </div>
          </div> : null
        }

        <div className="wrap sm:py-4">
          <div>
            <h1 className="text-6xl font-bold mb-4">{ metadata.title }</h1>

            <div className="grid auto-rows-min grid-cols-[150px_1fr] gap-2 mb-4">
              <div className="text-black/50">Время публикации</div>
              <div>{ formatDate(new Date(metadata.createTime)) }</div>

              <div className="text-black/50">Время обновления</div>
              <div>{ formatDate(new Date(metadata.updateTime)) }</div>

              <div className="text-black/50">Метки</div>
              <div>
                <ul className="flex gap-2">
                  {
                    tags.map((tag) => {
                      return <li key={ tag.slug }>
                        <Link href={ "/tags/" + tag.slug }>
                          <a title={ tag.name } style={ { backgroundColor: tag.backgroundColor } }
                             className="block p-1 pt-0.5 rounded text-black text-sm leading-none">{ tag.slug }</a>
                        </Link>
                      </li>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className="text-container">
            <MDXRemote { ...source } components={ mdxComponents } />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
