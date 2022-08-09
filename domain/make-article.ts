import { Maybe } from "../utils"
import { Article, ArticleLike } from "./article"

export function makeArticle(articleLike: ArticleLike): Article {
  return {
    slug: articleLike.slug,
    createTime: articleLike.createTime,
    updateTime: articleLike.updateTime,
    tags: articleLike.tags,
    title: articleLike.title,
    icon: Maybe.ofNullable(articleLike.icon),
    poster: Maybe.ofNullable(articleLike.poster),
    source: Maybe.ofNullable(articleLike.source)
  }
}
