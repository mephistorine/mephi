import { Maybe } from "../utils"

export interface BreadcrumbItem {
  url: string
  icon: Maybe<string>
  name: string
  slug: Maybe<string>
}
