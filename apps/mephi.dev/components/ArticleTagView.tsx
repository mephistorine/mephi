import { ArticleTag } from "../domain"

interface TagProps {
  tag: ArticleTag
}

export default function ArticleTagView({ tag }: TagProps) {
  return <span
    title={ tag.name }
    style={{ backgroundColor: tag.backgroundColor }}
    className="block p-1 pt-0.5 rounded text-black text-sm leading-none">{ tag.slug }</span>
}
