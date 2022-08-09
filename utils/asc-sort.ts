export function ascSort<T>(a: T, b: T, getter: (value: T) => number) {
  const computedA = getter(a)
  const computedB = getter(b)
  return computedA - computedB
}
