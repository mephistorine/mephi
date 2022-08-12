import { Talk } from "../domain"
import { Maybe } from "../utils"

const talks: readonly Talk[] = [
  {
    title: "CSS Container Queries and Units",
    slug: "css-container-queries-and-units",
    description: Maybe.of(`<strong>Hello</strong>`)
  }
]

export function getAllTalks(): readonly Readonly<Talk>[] {
  return talks
}

export function getTalk(slug: string): Maybe<Readonly<Talk>> {
  return Maybe.ofNullable(talks.find((talk) => talk.slug === slug))
}
