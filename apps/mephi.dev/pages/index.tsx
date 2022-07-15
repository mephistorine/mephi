import Link from "next/link"

export default function Main() {
  return (
    <>
      <header className="flex justify-between p-4">
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
      <main>
        <div>
          <img className="max-h-[300px] w-full object-cover object-center" src="/assets/images/promare-night-city.png" alt="" />
        </div>
        <div className="have-poster">
          <div className="wrap">
            <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">👿</p>
          </div>
        </div>
        <div className="wrap">
          <div>
            <h1 className="text-4xl font-bold mb-8">Сэм Булатов — Блог</h1>

            <section className="mb-8">
              <ul className="flex justify-between gap-4">
                <li>
                  <Link href="/projects"><a href="/projects">Проекты</a></Link>
                </li>
                <li>
                  <Link href="/talks"><a href="/talks">Доклады</a></Link>
                </li>
                <li>
                  <Link href="/about"><a href="/about">Обо мне</a></Link>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-3xl font-bold">Привет 👋</h2>
              <p>Тут я делюсь своим опытом, в разработке приложений и не только. Технический стек Angular, Typescript, RxJS и Leaflet.</p>
            </section>
          </div>
        </div>
      </main>
    </>
  )
}
