import { ArticleLike } from "./article"
import { BreadcrumbItem } from "./breadcrumbs"
import { Conference } from "./conference"
import { Speach } from "./speach"
import { Talk } from "./talk"

interface SearchEntityMap {
  [ SearchEntityType.article ]: ArticleLike
  [ SearchEntityType.conference ]: Conference
  [ SearchEntityType.speach ]: Speach
  [ SearchEntityType.talk ]: Talk
  [ SearchEntityType.page ]: BreadcrumbItem
}

export enum SearchEntityType {
  article = "ARTICLE",
  talk = "TALK",
  speach = "SPEACH",
  conference = "CONFERENCE",
  page = "PAGE"
}

export interface SearchEntity<T extends SearchEntityType> {
  type: T
  value: SearchEntityMap[ T ]
}

export interface SearchResult {
  entities: readonly Readonly<SearchEntity<any>>[]
}
