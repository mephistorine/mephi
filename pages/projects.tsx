import Head from "next/head"
import { Footer, Header } from "../components"
import { HOME_PAGE, PROJECTS_BREADCRUMB } from "../constants"

export default function ProjectsPage() {
  return <>
    <Head>
      <title>Проекты – { HOME_PAGE.name }</title>
    </Head>
    <Header breadcrumbs={ [ HOME_PAGE, PROJECTS_BREADCRUMB ] } />
    <main>
      <div className="wrap sm:py-4">
        <div>
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Проекты</h1>
          </div>

          <section className="mb-4 overflow-auto">
            <p>Пока что проектов нет, но они скоро тут появятся. :D</p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  </>
}
