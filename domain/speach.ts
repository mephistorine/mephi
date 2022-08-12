import { Maybe } from "../utils"

export interface Speach {
  conferenceSlug: string
  talkSlug: string
  time: Date
  slidesUrl: Maybe<string>
  videoUrl: Maybe<string>
  language: "RU" | "EN"
}
