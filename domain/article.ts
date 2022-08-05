import { Maybe } from "../utils"

export interface ArticleSource {
  readonly title: string
  readonly url: string
}

export interface ArticlePosterSource {
  authorName: string
  authorSourceUrl: string
}

export interface ArticlePoster {
  readonly src: string
  // readonly author: Maybe<ArticlePosterSource>
}

export interface Article {
  readonly title: string
  readonly slug: string
  readonly createTime: string
  readonly updateTime: string
  readonly tags: readonly string[]
  readonly poster: Maybe<ArticlePoster>
  readonly icon: Maybe<string>
  readonly source: Maybe<ArticleSource>
}

export interface ArticleLike {
  readonly title: string
  readonly slug: string
  readonly createTime: string
  readonly updateTime: string
  readonly tags: readonly string[]
  readonly poster: ArticlePoster | null
  readonly icon: string | null
  readonly source: ArticleSource | null
}
