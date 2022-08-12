import Head from "next/head"
import { Footer, Header } from "../../components"
import { HOME_PAGE, TALKS_BREADCRUMB } from "../../constants"
import { getAllTalks } from "../../data"
import { Talk } from "../../domain"

interface TalksPageProps {

}

/*export const getStaticProps: GetStaticProps<TalksPageProps> = () => {

}*/

export default function TalksPage(props: TalksPageProps) {
  const talks: readonly Readonly<Talk>[] = getAllTalks()

  return <>
    <Head>
      <title>Доклады – { HOME_PAGE.name }</title>
    </Head>
    <Header breadcrumbs={ [ HOME_PAGE, TALKS_BREADCRUMB ] } />
    <main>
      <div className="wrap sm:py-4">
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Доклады</h1>
            <p className="text-sm">Количество выступлений: <strong>65</strong></p>
          </div>

          <section className="mb-4 overflow-auto flex flex-col gap-6">
            {
              [ 1, 2, 3 ].map((i) => {
                return <article key={ i } className="flex flex-col gap-2">
                  <h2 id="test" className="text-2xl font-bold ">
                    <span>CSS Container Queries and Units</span>
                    <a href="#test"> ⌗</a>
                  </h2>

                  <div className="text-sm">
                    <p>С годами популяризации интернета интерфейсы становились все сложнее, но вместе с этим развивались и инструменты, которые мы используем
                      для создания этих самых интерфейсов. В этом докладе я хочу вам рассказать об еще одном таком инструменте «CSS Container Queries» и «CSS
                      Container units».</p>
                    <p>В будущем эти возможности языка CSS помогут нам делать наши интерфейсы удобнее и адаптивнее.</p>
                  </div>

                  <div>
                    <ul className="flex flex-col gap-2 pl-4">
                      {
                        [ 1, 2, 3 ].map(() => {
                          return <li className="relative before:content-['—'] before:font-mono before:absolute before:-left-4">
                            <h3>
                              <a className="like-link" href="" target="_blank">Evening of Knowledge</a>
                              <span className="select-none"> / </span>
                              <time className="text-gray-500">18 июл 2022</time>
                              <span className="text-xs select-none bg-gray-200 px-1 py-0.5 rounded">RU</span>
                            </h3>

                            <ul className="text-sm flex gap-4 text-gray-500">
                              <li><a className="like-link" href="" target="_blank">Слайды</a></li>
                              <li><a className="like-link" href="" target="_blank">Видеозапись</a></li>
                              <li><a className="like-link" href="" target="_blank">Заметки</a></li>
                            </ul>
                          </li>
                        })
                      }
                    </ul>
                  </div>
                </article>
              })
            }
          </section>
        </div>
      </div>

      <Footer />
    </main>
  </>
}
