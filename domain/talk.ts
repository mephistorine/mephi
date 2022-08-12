import { Maybe } from "../utils"

export interface Talk {
  title: string
  slug: string
  description: Maybe<string>
}
