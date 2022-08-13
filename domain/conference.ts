import { Maybe } from "../utils"

export enum ConferenceRole {
  organizer = "ORGANIZER",
  speaker = "SPEAKER",
  participant = "PARTICIPANT"
}

export interface ConferenceLocation {
  country: string
  city: string
  coordinates: [ latitude: number, longitude: number ]
}

export interface Conference {
  name: string
  slug: string
  url: Maybe<string>
  role: ConferenceRole
  location: ConferenceLocation | "ONLINE"
}
