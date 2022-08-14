import { NextApiRequest, NextApiResponse } from "next"
import { ABOUT_ME_PAGE, ARTICLES_BREADCRUMB, PROJECTS_BREADCRUMB, TALKS_BREADCRUMB } from "../../constants"
import { getAllConferences, getAllTalks } from "../../data"
import { SearchEntity, SearchEntityType } from "../../domain"
import { getAllArticles } from "../../entities"
import { Maybe } from "../../utils"

export default function handler(request: NextApiRequest, response: NextApiResponse) {
  const searchQuery: Maybe<string> = Maybe.ofNullable(request.query.s as string)

  if (searchQuery.isEmpty()) {
    return response
      .status(400)
      .json({
        message: `Query parameter "s" required`
      })
  }

  const searchQueryValue: string = searchQuery.get()

  const articles: readonly Readonly<SearchEntity<SearchEntityType.article>>[] = getAllArticles()
    .filter((article) => article.title.toLowerCase().includes(searchQueryValue.toLowerCase()))
    .map((article) => ({ type: SearchEntityType.article, value: article }))

  const conferences: readonly Readonly<SearchEntity<SearchEntityType.conference>>[] = getAllConferences()
    .filter((conference) => conference.name.toLowerCase().includes(searchQueryValue.toLowerCase()))
    .map((conf) => ({ type: SearchEntityType.conference, value: conf }))

  const talks: readonly Readonly<SearchEntity<SearchEntityType.talk>>[] = getAllTalks()
    .filter((talk) => talk.title.toLowerCase().includes(searchQueryValue.toLowerCase()))
    .map((talk) => ({ type: SearchEntityType.talk, value: talk }))

  const pages: readonly Readonly<SearchEntity<SearchEntityType.page>>[] = [ TALKS_BREADCRUMB, ARTICLES_BREADCRUMB, PROJECTS_BREADCRUMB, ABOUT_ME_PAGE ]
    .filter((breadcrumb) => breadcrumb.name.toLowerCase().includes(searchQueryValue.toLowerCase()))
    .map((breadcrumb) => ({ type: SearchEntityType.page, value: breadcrumb }))

  const result: readonly Readonly<SearchEntity<any>>[] = [
    ...articles,
    ...conferences,
    ...talks,
    ...pages
  ]

  return response
    .status(200)
    .json(result)
}
