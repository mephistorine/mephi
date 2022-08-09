import { HOME_PAGE } from "../constants"

export function Title({ children }: any) {
  return <title>{ children } – { HOME_PAGE.name }</title>
}
