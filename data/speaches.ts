import { Speach } from "../domain"
import { Maybe } from "../utils"

const speaches: readonly Speach[] = [
  {
    conferenceSlug: "sochi-evening-of-knowledge",
    talkSlug: "css-container-queries-and-units",
    language: "RU",
    time: new Date(""),
    slidesUrl: Maybe.empty(),
    videoUrl: Maybe.empty()
  }
]

export function getAllSpeaches(): readonly Readonly<Speach>[] {
  return speaches
}

export function getSpeachesByTalk(slug: string): readonly Readonly<Speach>[] {
  return speaches.filter((speach) => speach.talkSlug === slug)
}

export function getSpeachesByConference(slug: string): readonly Readonly<Speach>[] {
  return speaches.filter((speach) => speach.conferenceSlug === slug)
}
