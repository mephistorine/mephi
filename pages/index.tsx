import Head from "next/head"
import Link from "next/link"
import { Footer, Header, PageIcon } from "../components"
import { ABOUT_ME_PAGE, ARTICLES_BREADCRUMB, HOME_PAGE, PROJECTS_BREADCRUMB, TALKS_BREADCRUMB } from "../constants"

export default function Home() {
  return <>
    <Head>
      <title>Главная – { HOME_PAGE.name }</title>
    </Head>
    <Header breadcrumbs={ [ HOME_PAGE ] } />
    <main>
      <div className="icon-container mb-4">
        <div className="wrap">
          <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">
            <PageIcon icon={ HOME_PAGE.icon } />
          </p>
        </div>
      </div>
      <div className="wrap sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ HOME_PAGE.name }</h1>

          <section className="mb-8">
            <ul className="flex justify-between gap-4">
              <li>
                <Link href={ TALKS_BREADCRUMB.url }>
                  <a className="interactive" href={ TALKS_BREADCRUMB.url }>
                    <PageIcon icon={ TALKS_BREADCRUMB.icon } slug={ TALKS_BREADCRUMB.slug } size="1rem" emojiSize="1rem" />
                    <span>{ TALKS_BREADCRUMB.name }</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={ ARTICLES_BREADCRUMB.url }>
                  <a className="interactive" href={ ARTICLES_BREADCRUMB.url }>
                    <PageIcon icon={ ARTICLES_BREADCRUMB.icon } slug={ ARTICLES_BREADCRUMB.slug } size="1rem" emojiSize="1rem" />
                    <span>{ ARTICLES_BREADCRUMB.name }</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={ PROJECTS_BREADCRUMB.url }>
                  <a className="interactive" href={ PROJECTS_BREADCRUMB.url }>
                    <PageIcon icon={ PROJECTS_BREADCRUMB.icon } slug={ PROJECTS_BREADCRUMB.slug } size="1rem" emojiSize="1rem" />
                    <span>{ PROJECTS_BREADCRUMB.name }</span>
                  </a>
                </Link>
              </li>
              <li>
                <Link href={ ABOUT_ME_PAGE.url }>
                  <a className="interactive" href={ ABOUT_ME_PAGE.url }>
                    <span>{ ABOUT_ME_PAGE.name }</span>
                  </a>
                </Link>
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
    <Footer />
  </>
}
