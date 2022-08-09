import { ascSort } from "./asc-sort"

export function descSort<T>(a: T, b: T, getter: (value: T) => number) {
  return ascSort(a, b, getter) * -1
}
