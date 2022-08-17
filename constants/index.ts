import { join } from "path"
import { BreadcrumbItem } from "../domain"
import { Maybe } from "../utils"

export * from "./base-url"

export const ARTICLES_PATH: string = join(process.cwd(), "_articles")
export const TALKS_PATH: string = join(process.cwd(), "_talks")

export const ARTICLES_BREADCRUMB: BreadcrumbItem = {
  name: "Статьи",
  icon: Maybe.of("📚"),
  url: "/articles/",
  slug: Maybe.of("articles")
}

export const TALKS_BREADCRUMB: BreadcrumbItem = {
  name: "Доклады",
  icon: Maybe.of("🗣"),
  url: "/talks/",
  slug: Maybe.of("talks")
}

export const PROJECTS_BREADCRUMB: BreadcrumbItem = {
  name: "Проекты",
  icon: Maybe.of("🩼"),
  url: "/projects/",
  slug: Maybe.of("projects")
}

export const ABOUT_ME_PAGE: BreadcrumbItem = {
  name: "Обо мне",
  icon: Maybe.empty(),
  url: "/about-me/",
  slug: Maybe.of("about-me")
}

export const TAGS_BREADCRUMB: BreadcrumbItem = {
  name: "Метки",
  icon: Maybe.of("🏷"),
  url: "/tags/",
  slug: Maybe.of("tags")
}

export const HOME_PAGE: BreadcrumbItem = {
  name: "Сэм Булатов",
  icon: Maybe.of("/assets/images/favicon.png"),
  url: "/",
  slug: Maybe.empty()
}
