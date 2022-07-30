import Link from "next/link"
import Header from "../components/Header"

/*export const getStaticProps: GetStaticProps = () => {
  const articleFileNames: string[] = readdirSync(ARTICLES_PATH)

}*/

export default function Main() {
  return (
    <>
      <Header />
      <main>
        <div>
          <img className="max-h-[300px] w-full object-cover object-center" src="/assets/images/promare-night-city.png" alt="" />
        </div>
        <div className="icon-container mb-4">
          <div className="wrap">
            <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">👿</p>
          </div>
        </div>
        <div className="wrap sm:py-4">
          <div>
            <h1 className="text-4xl font-bold mb-8">Сэм Булатов — Блог</h1>

            <section className="mb-8">
              <ul className="flex justify-between gap-4">
                <li>
                  <Link href="/projects"><a className="interactive" href="/projects">Проекты</a></Link>
                </li>
                <li>
                  <Link href="/articles"><a className="interactive" href="/articles">Статьи</a></Link>
                </li>
                <li>
                  <Link href="/talks"><a className="interactive" href="/talks">Доклады</a></Link>
                </li>
                <li>
                  <Link href="/about"><a className="interactive" href="/about">Обо мне</a></Link>
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
