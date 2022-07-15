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
  readonly author?: ArticlePosterSource
}

export interface Article {
  readonly title: string
  readonly slug: string
  readonly createTime: string
  readonly updateTime: string
  readonly tags: readonly string[]
  readonly poster?: ArticlePoster
  readonly icon?: string
  readonly source?: ArticleSource
}
