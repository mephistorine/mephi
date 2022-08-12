import { Conference } from "../domain"
import { Maybe } from "../utils"

const conferences: readonly Conference[] = [
  {
    name: "Evening of Knowledge",
    slug: "sochi-evening-of-knowledge",
    url: Maybe.of("https://itsochi.pro/events/july-meetup-evening-of-knowledge/")
  }
]

export function getAllConferences(): readonly Readonly<Conference>[] {
  return conferences
}

export function getConference(slug: string): Maybe<Readonly<Conference>> {
  return Maybe.ofNullable(conferences.find((conference) => conference.slug === slug))
}
