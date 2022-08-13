import { Conference, ConferenceRole } from "../domain"
import { Maybe } from "../utils"

const conferences: readonly Conference[] = [
  {
    name: "Evening of Knowledge",
    slug: "sochi-evening-of-knowledge",
    url: Maybe.of("https://itsochi.pro/events/july-meetup-evening-of-knowledge/"),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Сочи",
      coordinates: [ 43.401462, 39.947538 ]
    }
  },
  {
    name: "RndTechConf 2021",
    slug: "rnd-tech-conf-2021",
    url: Maybe.of(""),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Ростов-на-Дону",
      coordinates: [ 47.222078, 39.720358 ]
    }
  },
  {
    name: "MergeConf 2021",
    slug: "merge-conf-2021",
    url: Maybe.of(""),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Казань; Иннополис",
      coordinates: [ 55.752093, 48.744601 ]
    }
  },
  {
    name: "404 Fest 2021",
    slug: "404-fest-2021",
    url: Maybe.of(""),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Самара",
      coordinates: [ 53.195878, 50.100202 ]
    }
  },
  {
    name: "FrontendConf 2021",
    slug: "frontendconf-2021",
    url: Maybe.of(""),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Москва",
      coordinates: [ 55.755819, 37.617644 ]
    }
  },
  {
    name: "KrdDevDays 3",
    slug: "krddevdays-3",
    url: Maybe.of(""),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Краснодар",
      coordinates: [ 45.035470, 38.975313 ]
    }
  },
  {
    name: "NgRostov 2019",
    slug: "ng-rostov-2019",
    url: Maybe.of(""),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Ростов-на-Дону",
      coordinates: [ 47.222078, 39.720358 ]
    }
  },
  {
    name: "Web Standards Days 2019",
    slug: "web-standards-days-2019",
    url: Maybe.of(""),
    role: ConferenceRole.speaker,
    location: {
      country: "Россия",
      city: "Москва",
      coordinates: [ 55.755819, 37.617644 ]
    }
  }
]

export function getAllConferences(): readonly Readonly<Conference>[] {
  return conferences
}

export function getConference(slug: string): Maybe<Readonly<Conference>> {
  return Maybe.ofNullable(conferences.find((conference) => conference.slug === slug))
}
