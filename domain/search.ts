import { ArticleLike } from "./article"
import { BreadcrumbItem } from "./breadcrumbs"
import { Talk } from "./talk"

interface SearchEntityMap {
  [ SearchEntityType.article ]: ArticleLike
  [ SearchEntityType.talk ]: Talk
  [ SearchEntityType.page ]: BreadcrumbItem
}

export enum SearchEntityType {
  article = "ARTICLE",
  talk = "TALK",
  page = "PAGE"
}

export interface SearchEntity<T extends SearchEntityType> {
  type: T
  value: SearchEntityMap[ T ]
}

export interface SearchResult {
  entities: readonly Readonly<SearchEntity<any>>[]
}
