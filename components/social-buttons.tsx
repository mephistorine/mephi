interface SocialButtonsProps {
  title: string
  url: string
}

export function SocialButtons(props: SocialButtonsProps) {
  const twitterUrl = new URL("https://twitter.com/intent/tweet")
  twitterUrl.searchParams.set("text", props.title)
  twitterUrl.searchParams.set("url", props.url)

  const vkUrl = new URL("https://vk.com/share.php")
  vkUrl.searchParams.set("title", props.title)
  vkUrl.searchParams.set("url", props.url)

  return <div className="flex gap-2 overflow-x-auto">
    <a className="px-2 py-1 whitespace-nowrap border rounded hover:bg-gray-200" href="/rss.xml" target="_blank">Подписаться на RSS</a>
    <a className="px-2 py-1 whitespace-nowrap border rounded hover:bg-gray-200" href={ twitterUrl.toString() } target="_blank" rel="noreferrer">Твитнуть</a>
    <a className="px-2 py-1 whitespace-nowrap border rounded hover:bg-gray-200" href={ vkUrl.toString() } target="_blank" rel="noreferrer">Поделиться в ВК</a>
    {/*<a href="https://boosty.to/mephistorine" target="_blank" rel="noreferrer">Поддержать</a>*/ }
  </div>
}
