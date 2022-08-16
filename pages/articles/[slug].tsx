// @ts-ignore
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
// @ts-ignore
import remarkHeadingId from "remark-heading-id"
import { getHighlighter } from "shiki"
import { ArticleTagView, BreadcrumbItem, Footer, Header, PageIcon, SocialButtons } from "../../components"

import { ARTICLES_BREADCRUMB, ARTICLES_PATH, HOME_PAGE } from "../../constants"
import { TAGS } from "../../data"
import { Article, ArticleLike, ArticlePoster, ArticleTag, makeArticle } from "../../domain"
import { formatDate, Maybe, rehypeHeadings, rehypeTableOfContents } from "../../utils"

interface ArticleProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  metadata: ArticleLike
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
  if (typeof params === "undefined") {
    throw new Error("params must be defined")
  }

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

  const mdxSerializeResult: MDXRemoteSerializeResult = await serialize(frontMatterResult.content, {
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
      metadata: articleMetaData as any
    }
  }
}

function getPosterUrl(slug: string, poster: ArticlePoster): string {
  return `/articles/${ slug }/${ poster.src }`
}

function ArticlePosterView({ article }: { article: Article }): JSX.Element {
  return <div>
    <img className="max-h-[150px] sm:max-h-[300px] w-full max-w-[1440px] mx-auto my-0 object-cover object-center"
         src={ getPosterUrl(article.slug, article.poster.get()) }
         alt={ article.title } />
  </div>
}

export default function ArticlePage({ source, metadata }: ArticleProps): JSX.Element {
  const article = makeArticle(metadata)

  const tags = article.tags.map((tag) => {
    const tagInfo: ArticleTag | undefined = TAGS.get(tag)

    if (typeof tagInfo === "undefined") {
      throw new Error(`Tag with name="${ tag }" have not info`)
    }

    return tagInfo
  })

  const mdxComponents = {}

  const breadcrumbs: readonly BreadcrumbItem[] = [
    HOME_PAGE,
    ARTICLES_BREADCRUMB,
    {
      name: article.title,
      icon: article.icon,
      url: `/articles/${ article.slug }`,
      slug: Maybe.of(article.slug)
    }
  ]

  return (
    <>
      <Head>
        <title>{ article.title } – { HOME_PAGE.name }</title>
      </Head>

      <Header breadcrumbs={ breadcrumbs } />
      <main>
        { article.poster.isPresent() && <ArticlePosterView article={ article } /> }

        {
          article.icon.isPresent() && <div className={ cn("icon-container mb-4", { "have-poster": article.poster.isPresent() }) }>
            <div className="wrap">
              <PageIcon icon={ article.icon } slug={ Maybe.of(article.slug) } size="80px" emojiSize="5rem" />
            </div>
          </div>
        }

        <div className="wrap sm:py-4">
          <div>
            <h1 className="text-6xl font-bold mb-4">{ article.title }</h1>

            <div className="grid auto-rows-min grid-cols-[150px_1fr] gap-2 mb-4">
              <div className="text-black/50">Время публикации</div>
              <div>{ formatDate(new Date(article.createTime)) }</div>

              <div className="text-black/50">Время обновления</div>
              <div>{ formatDate(new Date(article.updateTime)) }</div>

              <div className="text-black/50">Метки</div>
              <div>
                <ul className="flex gap-2">
                  {
                    tags.map((tag) => {
                      return <li key={ tag.slug }>
                        <Link href={ "/tags/" + tag.slug }>
                          <a>
                            <ArticleTagView tag={ tag } />
                          </a>
                        </Link>
                      </li>
                    })
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className="text-container mb-4">
            <MDXRemote { ...source } components={ mdxComponents } />
          </div>

          <SocialButtons title={ article.title } url={ `https://mephi.dev/articles/${ article.slug }` } />
        </div>

        <Footer />
      </main>
    </>
  )
}
