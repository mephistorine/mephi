import Link from "next/link"
import ArticleTagView from "../../components/ArticleTagView"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import { TAGS_BREADCRUMB } from "../../contants"
import { TAGS } from "../../data/tags"

export default function TagsPage() {
  return <>
    <Header breadcrumbs={ [ TAGS_BREADCRUMB ] } />
    <main>
      <div className="icon-container mb-4">
        <div className="wrap">
          <p className="article-icon text-[5rem] leading-none px-4 sm:px-0">{ TAGS_BREADCRUMB.icon }</p>
        </div>
      </div>
      <div className="wrap sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ TAGS_BREADCRUMB.name }</h1>

          <section className="mb-8">
            <ul className="flex gap-1">
              {
                Array.from(TAGS.values()).map((tag) => {
                  return <li>
                    <Link href={ "/tags/" + tag.slug }>
                      <a href={ "/tags/" + tag.slug }>
                        <ArticleTagView tag={ tag } />
                      </a>
                    </Link>
                  </li>
                })
              }
            </ul>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
}
