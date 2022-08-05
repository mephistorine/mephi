import { isStringHasEmoji, Maybe } from "../utils"

export interface PageIconProps {
  readonly icon: Maybe<string>
  readonly slug: Maybe<string>
  readonly size: string
  readonly emojiSize: string
}

export function PageIcon({ icon, slug, size, emojiSize }: PageIconProps) {
  if (icon.isEmpty()) {
    return null
  }

  const iconValue: string = icon.get()

  if (iconValue.startsWith("http")) {
    return <img className="rounded" draggable={ false } style={ { width: size, height: size } } src={ iconValue } alt="" />
  }

  if (isStringHasEmoji(iconValue)) {
    return <span className="article-icon leading-none px-4 select-none sm:px-0" style={ { fontSize: emojiSize } }>{ iconValue }</span>
  }

  if (slug.isEmpty()) {
    throw new Error("Slug prop must be defined")
  }

  return <img className="rounded"
              draggable={ false }
              style={ { width: size, height: size } }
              src={ `/articles/${ slug.get() }/${ iconValue }` }
              alt="" />
}
