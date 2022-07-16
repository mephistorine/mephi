export default function Header() {
  return <header className="flex justify-between p-4 text-xs">
    <div>
      <ul className="flex justify-between items-center gap-2">
        <li className="breadcrumbs-item flex">
          <a href="" className="special-link flex items-center gap-2 interactive">
            <span>😹</span>
            <span>Сэм Булатов — Блог</span>
          </a>
        </li>

        <li className="breadcrumbs-item flex">
          <a href="" className="special-link flex items-center gap-2 interactive">
            <span>👍</span>
            <span>Статьи</span>
          </a>
        </li>

        <li className="breadcrumbs-item flex">
          <a href="" className="special-link flex items-center gap-2 interactive">
            <span>👿</span>
            <span>Как бороться с реактивщиной</span>
          </a>
        </li>
      </ul>
    </div>

    <div className="flex gap-2">
      <button className="interactive flex gap-1 items-center">
        <object className="not-sr-only text-black pointer-events-none" data="/assets/icons/search.svg" type="image/svg+xml">
          <img className="not-sr-only" src="/assets/icons/search.svg" />
        </object>

        <span className="hidden sm:block">Найти</span>
      </button>

      <button className="interactive flex gap-1">
        <object className="not-sr-only text-black pointer-events-none" data="/assets/icons/share.svg" type="image/svg+xml">
          <img className="not-sr-only" src="/assets/icons/share.svg" />
        </object>

        <span className="hidden sm:block">Поделиться</span>
      </button>
    </div>
  </header>
}
