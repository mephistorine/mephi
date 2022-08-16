import Link from "next/link"
import { FormEvent, KeyboardEvent, MouseEvent, useCallback, useEffect, useState } from "react"
import { ARTICLES_BREADCRUMB, TALKS_BREADCRUMB } from "../constants"
import { SearchEntity, SearchEntityType, Talk } from "../domain"
// import ArrowEnterIcon from "../public/assets/icons/arrow-enter.svg"
// import ArrowDownUpIcon from "../public/assets/icons/arrows-down-up.svg"
// import ArrowMacCommandIcon from "../public/assets/icons/command.svg"
import SearchIcon from "../public/assets/icons/search.svg"
import { Maybe } from "../utils"
import { PageIcon } from "./page-icon"

interface Props {
  onClose: () => void
}

export function makeResultString(value: number): string {
  const valueAsString: string = value.toString()
  const root: string = `${ value } результат`

  if (valueAsString.endsWith("0") || (value >= 10 && value <= 20)) {
    return `${ root }ов`
  }

  if (valueAsString.endsWith("1")) {
    return root
  }

  if ([ 2, 3, 4 ].some((v) => valueAsString.endsWith(v.toString()))) {
    return `${ root }а`
  }

  return `${ root }ов`
}

export function SearchDialog(props: Props) {
  const [ searchString, setSearchString ] = useState<string>("")
  const [ resultEntities, setResultEntities ] = useState<readonly SearchEntity<any>[]>([])

  useEffect(() => {
    if (searchString.length <= 0) {
      setResultEntities([])
      return
    }

    fetch(`/api/search?s=${ searchString }`)
      .then((res) => res.json())
      .then((result: readonly SearchEntity<any>[]) => setResultEntities(result))
      .catch(() => {
      })
  }, [ searchString ])

  const closeMe = useCallback(() => {
    if (typeof props.onClose === "function") {
      props.onClose()
    }
  }, [ props.onClose ])

  const onInputHandler = useCallback((event: FormEvent) => setSearchString((event.target as any).value), [])

  const onKeyDown = useCallback((event: KeyboardEvent<any>) => {
    if (event.key === "Escape") {
      closeMe()
    }
  }, [])

  const onClickContainer = useCallback((event: MouseEvent<any>) => {
    if (event.currentTarget === event.target) {
      closeMe()
    }
  }, [])

  const results = resultEntities.map((entity) => {
    if (entity.type === SearchEntityType.article) {
      return {
        title: entity.value.title,
        slug: entity.value.slug,
        icon: Maybe.ofNullable<string>(entity.value.icon).or(() => Maybe.of("⚫️")),
        parentPageTitle: Maybe.of<string>(ARTICLES_BREADCRUMB.name),
        url: `${ ARTICLES_BREADCRUMB.url }${ entity.value.slug }`
      }
    }

    if (entity.type === SearchEntityType.page) {
      return {
        title: entity.value.name,
        slug: entity.value.slug,
        icon: Maybe.ofNullable<string>(entity.value.icon).or(() => Maybe.of("⚫️")),
        parentPageTitle: Maybe.empty<string>(),
        url: entity.value.url
      }
    }

    return {
      title: (entity.value as Talk).title,
      slug: (entity.value as Talk).slug,
      icon: Maybe.of("📑"),
      parentPageTitle: Maybe.empty<string>(),
      url: `${ TALKS_BREADCRUMB.url }#${ entity.value.slug }`
    }
  })

  return <div className="fixed top-0 left-0 w-full h-full bg-gray-700/70 flex justify-center items-center"
              onKeyDown={ onKeyDown }
              onClick={ onClickContainer }>
    <div className="flex flex-col justify-between bg-white rounded overflow-hidden w-[450px]">
      <header className="flex items-center border-b relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-2 w-6">
          <SearchIcon />
        </div>

        <input className="flex-grow outline-0 p-2 pl-10"
               onInput={ onInputHandler }
               autoFocus={ true }
               type="text"
               placeholder="Тот кто ищет – всегда найдет..." />
      </header>

      <div className="flex-grow p-2 h-[250px] overflow-auto">
        {
          results.length > 0 && <ul className="divide-y">
            {
              results.map((entity) => {
                return <li key={ entity.slug } onClick={ closeMe }>
                  <Link href={ entity.url }>
                    <a href={ entity.url } className="flex items-start gap-3 p-2 hover:bg-gray-100 cursor-pointer">
                      <div>
                        <PageIcon icon={ entity.icon } />
                      </div>
                      <div>
                        <p>{ entity.title }</p>
                        { entity.parentPageTitle.isPresent() && <p className="text-sm text-gray-400">{ entity.parentPageTitle.get() }</p> }
                      </div>
                    </a>
                  </Link>
                </li>
              })
            }
          </ul>
        }
      </div>

      <footer className="text-gray-400 select-none p-2 border-t">
        <ul className="flex gap-6 text-xs">
          <li>{ makeResultString(results.length) }</li>

          {/*<li className="flex gap-0.5 items-center leading-none">
            <div className="pointer-events-none w-[1em]"><ArrowDownUpIcon /></div>
            <span>Выбрать</span>
          </li>

          <li className="flex gap-0.5 items-center leading-none">
            <div className="pointer-events-none w-[1em]"><ArrowEnterIcon /></div>
            <span>Открыть</span>
          </li>

          <li className="flex gap-0.5 items-center leading-none">
            { isMac && <div className="pointer-events-none w-[1em]"><ArrowMacCommandIcon /></div> }
            { !isMac && <kbd className="border">ctrl</kbd> }
            <div className="pointer-events-none w-[1em]"><ArrowEnterIcon /></div>
            <span>Открыть в новой вкладке</span>
          </li>*/ }
        </ul>
      </footer>
    </div>
  </div>
}
