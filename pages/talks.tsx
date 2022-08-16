import Head from "next/head"
import { Footer, Header } from "../components"
import { HOME_PAGE, TALKS_BREADCRUMB } from "../constants"
import { getAllConferences, getAllSpeaches, getAllTalks } from "../data"
import { Conference, Speach, Talk } from "../domain"

interface SpeachView extends Speach {
  conference: Readonly<Conference>
}

interface TalkView extends Talk {
  speaches: readonly Readonly<SpeachView>[]
}

function buildSpeachesForView(talks: readonly Readonly<Talk>[],
                              conferences: readonly Readonly<Conference>[],
                              speaches: readonly Readonly<Speach>[]): readonly Readonly<TalkView>[] {
  return talks
    .map((talk) => {
      const speachesByTalk = speaches.filter((speach) => speach.talkSlug === talk.slug)

      return {
        ...talk,
        speaches: speachesByTalk
          .map((speach) => {
            const conference: Readonly<Conference> | undefined = conferences.find((cn) => cn.slug === speach.conferenceSlug)

            if (typeof conference === "undefined") {
              throw new Error(`Conference with slug="${ speach.conferenceSlug }" not found`)
            }

            return {
              ...speach,
              conference
            }
          })
          .sort((a, b) => b.time.getTime() - a.time.getTime())
      }
    })
    .sort((a, b) => {
      if (typeof b.speaches.at(0) === "undefined" || typeof a.speaches.at(0) === "undefined") {
        return 1
      }

      // @ts-ignore
      return b.speaches.at(0).time.getTime() - a.speaches.at(0).time.getTime()
    })
}

export default function TalksPage() {
  const talks: readonly Readonly<Talk>[] = getAllTalks()
  const conferences: readonly Readonly<Conference>[] = getAllConferences()
  const speaches: readonly Readonly<Speach>[] = getAllSpeaches()

  const talksForView: readonly Readonly<TalkView>[] = buildSpeachesForView(talks, conferences, speaches)

  const speachCount: number = speaches.length

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
            <p className="text-sm">Количество выступлений: <strong>{ speachCount }</strong></p>
          </div>

          <section className="mb-4 overflow-auto flex flex-col gap-6">
            {
              talksForView.map((talk: TalkView) => {
                return <article key={ talk.slug } className="flex flex-col gap-2">
                  <h2 id={ talk.slug } className="group text-2xl font-bold">
                    <span>{ talk.title }</span>
                    <a className="invisible group-hover:visible ml-2" href={ `#${ talk.slug }` }>⌗</a>
                  </h2>

                  <div className="text-sm" dangerouslySetInnerHTML={ { __html: talk.description } }></div>

                  <div>
                    <ul className="flex flex-col gap-2 pl-4">
                      {
                        talk.speaches.map((speach: SpeachView) => {
                          return <li key={ speach.conferenceSlug } className="relative before:content-['—'] before:font-mono before:absolute before:-left-4">
                            <h3>
                              { speach.siteUrl.isPresent() &&
                                <a className="like-link" href={ speach.siteUrl.get() } target="_blank">{ speach.conference.name }</a> }
                              { speach.siteUrl.isEmpty() && <span>{ speach.conference.name }</span> }
                              <span className="select-none"> / </span>
                              <time dateTime={ speach.time.toISOString() }
                                    className="text-gray-500">{ speach.time.toLocaleString("ru-RU", { dateStyle: "long" }) }</time>
                              <span className="text-xs select-none bg-gray-200 px-1 py-0.5 rounded ml-1">{ speach.language }</span>
                            </h3>

                            <ul className="text-sm flex gap-4 text-gray-500">
                              { speach.slidesUrl.isPresent() && <li><a className="like-link" href={ speach.slidesUrl.get() } target="_blank">Слайды</a></li> }
                              { speach.videoUrl.isPresent() &&
                                <li><a className="like-link" href={ speach.videoUrl.get() } target="_blank">Видеозапись</a></li> }
                              { speach.notesUrl.isPresent() && <li><a className="like-link" href={ speach.notesUrl.get() } target="_blank">Заметки</a></li> }
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
