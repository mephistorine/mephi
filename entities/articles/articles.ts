import { readdirSync, readFileSync } from "fs"
import matter from "gray-matter"
import { join } from "path"
import { ARTICLES_PATH } from "../../constants"
import { ArticleLike } from "../../domain"

export function getAllArticles(): readonly ArticleLike[] {
  const articleFileNames: readonly string[] = readdirSync(ARTICLES_PATH)
  const articles: ArticleLike[] = []

  for (const articleFileName of articleFileNames) {
    const source: Buffer = readFileSync(join(ARTICLES_PATH, articleFileName))
    const frontMatterResult: matter.GrayMatterFile<Buffer> = matter(source)
    const metadata = JSON.parse(JSON.stringify(frontMatterResult.data))
    articles.push(metadata)
  }

  return articles
}

export function getArticleBySlug(slug: string): ArticleLike {
  const articleFilePath: string = join(ARTICLES_PATH, `${ slug }.mdx`)
  const source: Buffer = readFileSync(articleFilePath)
  const frontMatterResult: matter.GrayMatterFile<Buffer> = matter(source)
  return JSON.parse(JSON.stringify(frontMatterResult.data))
}
