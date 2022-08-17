import RSSIcon from "../public/assets/icons/rss.svg"

export function Footer() {
  return <div className="wrap py-4 border-t border-gray-200 flex justify-between">
    <p>Сэм &copy; 2022+</p>
    <div>
      <a href="/rss/feed.xml" className="flex items-center gap-2">
        <span className="inline-block w-[1em]"><RSSIcon /></span>
        <span>rss</span>
      </a>
    </div>
  </div>
}
