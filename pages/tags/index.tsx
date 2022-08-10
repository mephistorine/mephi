import { GetStaticProps } from "next"
import Head from "next/head"
import Link from "next/link"
import { Footer, Header } from "../../components"
import { HOME_PAGE } from "../../constants"
import { TAGS } from "../../data"
import { ArticleTag } from "../../domain"
import { descSort } from "../../utils/desc-sort"

interface TagsPageProps {
  tags: readonly ArticleTag[]
}

export const getStaticProps: GetStaticProps<TagsPageProps> = () => {
  return {
    props: {
      tags: Array.from(TAGS.values())
    }
  }
}

export default function TagsPage({ tags }: TagsPageProps) {
  return <>
    <Head>
      <title>Метки – { HOME_PAGE.name }</title>
    </Head>
    <Header breadcrumbs={ [ HOME_PAGE ] } />
    <main>
      <div className="wrap sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">Метки</h1>

          <section className="mb-4 overflow-auto text-container">
            <ul>
              {
                tags
                  .slice()
                  .sort((a, b) => descSort(a, b, v => v.slug.charCodeAt(0)))
                  .map((tag) => {
                    return <li key={ tag.slug }>
                      <Link href={ `/tags/${ tag.slug }` }>
                        <a href={ `/tags/${ tag.slug }` }>{ tag.slug }</a>
                      </Link>
                    </li>
                  })
              }
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  </>
}
