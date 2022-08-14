import { ABOUT_ME_PAGE, ARTICLES_BREADCRUMB, PROJECTS_BREADCRUMB, TALKS_BREADCRUMB } from "../constants"
import { getAllConferences, getAllTalks } from "../data"
import { SearchEntity, SearchEntityType } from "../domain"
import { getAllArticles } from "../entities"

export function makeSearchResult(value: string): readonly Readonly<SearchEntity<any>>[] {
  const articles: readonly Readonly<SearchEntity<SearchEntityType.article>>[] = getAllArticles()
    .filter((article) => article.title.toLowerCase().includes(value.toLowerCase()))
    .map((article) => ({ type: SearchEntityType.article, value: article }))

  const conferences: readonly Readonly<SearchEntity<SearchEntityType.conference>>[] = getAllConferences()
    .filter((conference) => conference.name.toLowerCase().includes(value.toLowerCase()))
    .map((conf) => ({ type: SearchEntityType.conference, value: conf }))

  const talks: readonly Readonly<SearchEntity<SearchEntityType.talk>>[] = getAllTalks()
    .filter((talk) => talk.title.toLowerCase().includes(value.toLowerCase()))
    .map((talk) => ({ type: SearchEntityType.talk, value: talk }))

  const pages: readonly Readonly<SearchEntity<SearchEntityType.page>>[] = [ TALKS_BREADCRUMB, ARTICLES_BREADCRUMB, PROJECTS_BREADCRUMB, ABOUT_ME_PAGE ]
    .filter((breadcrumb) => breadcrumb.name.toLowerCase().includes(value.toLowerCase()))
    .map((breadcrumb) => ({ type: SearchEntityType.page, value: breadcrumb }))

  return [
    ...articles,
    ...conferences,
    ...talks,
    ...pages
  ]
}
