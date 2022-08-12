import { Maybe } from "../utils"

export interface Conference {
  name: string
  slug: string
  url: Maybe<string>
}
