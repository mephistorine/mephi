import { readdirSync, readFileSync } from "fs"
import matter from "gray-matter"
import { GetStaticPaths, GetStaticProps } from "next"
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote"
import { serialize } from "next-mdx-remote/serialize"
import { join } from "path"

const articlesPath = join(process.cwd(), "apps", "mephi.dev", "_articles")

interface ArticleProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  metadata: Record<string, any>
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths: { params: { slug: string } }[] = readdirSync(articlesPath)
    .filter((path) => /\.mdx?$/.test(path))
    .map((path) => path.replace(/\.mdx?$/, ''))
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps<ArticleProps, { slug: string }> = async ({ params }) => {
  const articleFilePath: string = join(articlesPath, `${ params.slug }.mdx`)
  const source: Buffer = readFileSync(articleFilePath)
  const frontMatterResult: matter.GrayMatterFile<Buffer> = matter(source)

  const mdxSerializeResult: MDXRemoteSerializeResult<Record<string, unknown>> = await serialize(frontMatterResult.content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: frontMatterResult.data,
  })

  return {
    props: {
      source: mdxSerializeResult,
      metadata: frontMatterResult.data
    }
  }
}

export default function Article({ source }) {
  return (
    <div>
      <MDXRemote {...source} />
    </div>
  )
}
