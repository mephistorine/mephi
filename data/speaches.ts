import { Speach } from "../domain"
import { Maybe } from "../utils"

const speaches: readonly Speach[] = [
  {
    conferenceSlug: "sochi-evening-of-knowledge",
    talkSlug: "css-container-queries-and-units",
    language: "RU",
    time: new Date("2022-08-13T11:54:53.201Z"),
    slidesUrl: Maybe.of("https://mephistorine.github.io/talks/evening-of-knowledge-2022-sochi-css-container-queries/index.html"),
    videoUrl: Maybe.of("https://youtu.be/kXp7rb7GiDw"),
    siteUrl: Maybe.of("https://itsochi.pro/events/july-meetup-evening-of-knowledge/"),
    notesUrl: Maybe.empty()
  },
  {
    conferenceSlug: "krddevdays-3",
    talkSlug: "seven-future-wonders-of-css",
    language: "RU",
    time: new Date("2018-09-15T00:00:00.000Z"),
    slidesUrl: Maybe.of("https://disk.yandex.ru/i/60KVEbMG-6IqIw"),
    videoUrl: Maybe.of("https://youtu.be/sWmkzPB7VAo"),
    siteUrl: Maybe.of("https://krd.dev/events/1"),
    notesUrl: Maybe.empty()
  },
  {
    conferenceSlug: "web-standards-days-2019",
    talkSlug: "seven-future-wonders-of-css",
    language: "RU",
    time: new Date("2019-04-13T00:00:00.000Z"),
    slidesUrl: Maybe.of("https://wsd.events/2019/04/13/pres/future-css/"),
    videoUrl: Maybe.of("https://youtu.be/dcG3BKnVIhg"),
    siteUrl: Maybe.of("https://wsd.events/2019/04/13/#sam-bulatov"),
    notesUrl: Maybe.empty()
  },
  {
    conferenceSlug: "rnd-tech-conf-2021",
    talkSlug: "rxjs-schedulers",
    language: "RU",
    time: new Date("2021-09-03T00:00:00.000Z"),
    slidesUrl: Maybe.empty(),
    videoUrl: Maybe.empty(),
    siteUrl: Maybe.empty(),
    notesUrl: Maybe.empty()
  },
  {
    conferenceSlug: "404-fest-2021",
    talkSlug: "rxjs-schedulers",
    language: "RU",
    time: new Date("2021-09-26T00:00:00.000Z"),
    slidesUrl: Maybe.of("https://mephistorine.github.io/talks/rxjs-404/index.html"),
    videoUrl: Maybe.empty(),
    siteUrl: Maybe.of("https://2021.404fest.ru/program/reports/frontend/?sessionId=256740"),
    notesUrl: Maybe.empty()
  },
  {
    conferenceSlug: "ng-rostov-2019",
    talkSlug: "nestjs-for-frontend-devs",
    language: "RU",
    time: new Date("2019-08-10T00:00:00.000Z"),
    slidesUrl: Maybe.of("https://mephistorine.github.io/talks/ng-rostov2019__nestjs-for-frontend-devs/index.html"),
    videoUrl: Maybe.empty(),
    siteUrl: Maybe.empty(),
    notesUrl: Maybe.empty()
  },
  {
    conferenceSlug: "frontendconf-2021",
    talkSlug: "deep-dive-into-reactive-workshop",
    language: "RU",
    time: new Date("2021-10-11T00:00:00.000Z"),
    slidesUrl: Maybe.empty(),
    videoUrl: Maybe.empty(),
    siteUrl: Maybe.of("https://frontendconf.ru/moscow/2021/meetups#3921172"),
    notesUrl: Maybe.empty()
  },
  {
    conferenceSlug: "merge-conf-2021",
    talkSlug: "simplify-life-with-rxjs",
    language: "RU",
    time: new Date("2021-11-14T00:00:00.000Z"),
    slidesUrl: Maybe.of("https://mephistorine.github.io/talks/deep-dive-in-rxjs-frontendconf-2021/index.html"),
    videoUrl: Maybe.empty(),
    siteUrl: Maybe.empty(),
    notesUrl: Maybe.empty()
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
