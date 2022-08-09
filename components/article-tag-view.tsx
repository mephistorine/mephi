import { ArticleTag } from "../domain"

interface ArticleTagViewProps {
  tag: ArticleTag
}

export function ArticleTagView({ tag }: ArticleTagViewProps) {
  return <span
    title={ tag.name }
    style={{ backgroundColor: tag.backgroundColor }}
    className="block p-1 pt-0.5 rounded text-black text-sm leading-none">{ tag.slug }</span>
}
