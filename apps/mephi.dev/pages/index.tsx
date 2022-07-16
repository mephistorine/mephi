import Link from "next/link"

export default function Main() {
  return (
    <>
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
