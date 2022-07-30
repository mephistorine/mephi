import { join } from "path"
import { BreadcrumbItem } from "../components/Header"

export const ARTICLES_PATH: string = join(process.cwd(), "apps", "mephi.dev", "_articles")

export const ARTICLES_BREADCRUMB: BreadcrumbItem = {
  name: "Статьи",
  icon: "📚",
  url: "/articles/",
  slug: null
}
