import { ArticleTag } from "../domain"

const tags: Map<string, ArticleTag> = new Map()

tags.set(
  "css",
  {
    name: "CSS",
    slug: "css",
    createTime: "2022-06-22",
    backgroundColor: "hsl(217,91%,60%, 50%)",
    textColor: ""
  }
)

tags.set(
  "angular",
  {
    name: "Angular",
    slug: "angular",
    createTime: "2022-06-22",
    backgroundColor: "hsla(358,100%,65%,0.5)",
    textColor: ""
  }
)

tags.set(
  "html",
  {
    name: "HTML",
    slug: "html",
    createTime: "2022-06-22",
    backgroundColor: "hsla(358,100%,65%,0.5)",
    textColor: ""
  }
)

export {
  tags as TAGS
}
