import { readdirSync, readFileSync } from "fs"
import matter from "gray-matter"
import { GetStaticPaths, GetStaticProps } from "next"
import { join } from "path"
import { ARTICLES_PATH } from "../../contants"
import { TAGS } from "../../data/tags"
import { Article, ArticleTag } from "../../domain"

interface TagProps {
  tag: ArticleTag
  articles: readonly Article[]
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

  const articles: readonly Article[] = readdirSync(ARTICLES_PATH)
    .filter((path) => /\.mdx?$/.test(path))
    .map((fileName: string) => {
      const source: Buffer = readFileSync(join(ARTICLES_PATH, fileName))
      const frontMatterResult: matter.GrayMatterFile<Buffer> = matter(source)
      return frontMatterResult.data as Article
    })
    .filter((article: Article) => article.tags.includes(params.slug))

  return {
    props: {
      tag,
      articles
    }
  }
}

export default function Tag({ tag, articles }: TagProps) {
  return <div>
    <div>{ tag.slug }</div>
    <ul>
      { articles.map(v => v.title) }
    </ul>
  </div>
}
