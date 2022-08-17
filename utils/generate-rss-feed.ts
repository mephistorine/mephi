import { Feed } from "feed"
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs"
import matter from "gray-matter"
import { join } from "path"

export function generateRssFeed() {
  console.log(`RSS generate start`)
  const now = new Date()
  const siteUrl = "https://mephi.dev"

  const author = {
    name: "Сэм Булатов",
    email: "mephistorine@gmail.com",
    link: "https://twitter.com/mephistorine"
  }

  const feed = new Feed({
    title: "Сэм Булатов",
    description: "",
    id: siteUrl,
    link: siteUrl,
    image: `${ siteUrl }/assets/images/favicon.png`,
    favicon: `${ siteUrl }/assets/images/favicon.png`,
    copyright: `Все права защищены ${ now.getFullYear() }, Сэм Булатов.`,
    updated: now,
    feedLinks: {
      rss2: `${ siteUrl }/rss/feed.xml`,
      json: `${ siteUrl }/rss/feed.json`
    },
    author
  })

  const articlesDir = join(process.cwd(), "_articles")

  for (const fileName of readdirSync(articlesDir)) {
    const fileContent = readFileSync(join(articlesDir, fileName))
    const frontMatter = matter(fileContent)
    const frontMatterData = frontMatter.data

    const articleUrl = `${ siteUrl }/articles/${ frontMatterData.slug }`

    feed.addItem({
      title: frontMatterData.title,
      id: articleUrl,
      link: articleUrl,
      description: frontMatter.excerpt,
      content: frontMatter.excerpt,
      author: [ author ],
      contributor: [ author ],
      date: new Date(frontMatterData.createTime)
    })
  }

  mkdirSync("./public/rss", { recursive: true })
  writeFileSync("./public/rss/feed.xml", feed.rss2())
  writeFileSync("./public/rss/feed.json", feed.json1())

  console.log(`RSS generate complete successfully`)
}
