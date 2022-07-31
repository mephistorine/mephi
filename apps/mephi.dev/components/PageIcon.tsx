import { isStringHasEmoji } from "../utils"

export interface PageIconProps {
  readonly icon: string | null
  readonly slug: string
  readonly size: string
  readonly emojiSize: string
}

export default function PageIcon({ icon, slug, size, emojiSize }: PageIconProps) {
  if (icon === null) {
    return null
  }

  if (icon.startsWith("http")) {
    return <img className="rounded" draggable={false} style={{ width: size, height: size }} src={ icon } alt="" />
  }

  if (isStringHasEmoji(icon)) {
    return <span className="article-icon leading-none px-4 select-none sm:px-0" style={{ fontSize: emojiSize }}>{ icon }</span>
  }

  return <img className="rounded" draggable={false} style={{ width: size, height: size }} src={ `/articles/${ slug }/${ icon }` } alt="" />
}
