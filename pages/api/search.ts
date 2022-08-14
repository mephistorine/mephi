import { NextApiRequest, NextApiResponse } from "next"
import { SearchEntity } from "../../domain"
import { Maybe } from "../../utils"
import { makeSearchResult } from "../../utils/make-search-result"

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

  const result: readonly Readonly<SearchEntity<any>>[] = makeSearchResult(searchQueryValue)

  return response
    .status(200)
    .json(result)
}
