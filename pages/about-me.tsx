import { Footer, Header } from "../components"
import { ABOUT_ME_PAGE, ARTICLES_BREADCRUMB, HOME_PAGE } from "../constants"

export default function Page() {
  return <>
    <Header breadcrumbs={ [ HOME_PAGE, ARTICLES_BREADCRUMB, ABOUT_ME_PAGE ] } />
    <main>
      <div className="wrap sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ ABOUT_ME_PAGE.name }</h1>

          <section className="mb-8 overflow-auto text-container">
            <h1>Hello</h1>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
}
