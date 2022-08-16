export class NoSuchElementError extends Error {
}

export class Maybe<T> {
  private readonly value: T | null

  private constructor(value: T | null | undefined) {
    this.value = typeof value === "undefined" ? null : value
  }

  public static empty<U>(): Maybe<U> {
    return new Maybe<U>(null)
  }

  public static of<G>(target: G): Maybe<G> {
    return new Maybe(target)
  }

  public static ofNullable<G>(target: G | null | undefined): Maybe<G> {
    return new Maybe(target)
  }

  public get(): T {
    if (this.value === null) {
      throw new NoSuchElementError()
    }

    return this.value
  }

  public isPresent(): boolean {
    return this.value !== null
  }

  public isEmpty(): boolean {
    return this.value === null
  }

  public ifPresent(action: (value: T) => void): void {
    if (this.value === null) {
      return
    }

    action(this.value)
  }

  public ifPresentOrElse(action: (value: T) => void, emptyAction: () => void) {
    if (this.value === null) {
      emptyAction()
      return
    }

    action(this.value)
  }

  public map<G>(mapper: (value: T) => G): Maybe<G> {
    if (this.value === null) {
      return Maybe.empty()
    }

    return Maybe.ofNullable(mapper(this.value))
  }

  public filter(predicate: (value: T) => boolean): Maybe<T> {
    if (this.value === null) {
      return this
    }

    if (predicate(this.value)) {
      return this
    }

    return Maybe.empty()
  }

  public flatMap<U>(mapper: (value: T) => Maybe<U>): Maybe<U> {
    if (this.value === null) {
      return Maybe.empty()
    }

    return mapper(this.value)
  }

  public or<G extends Maybe<T>>(supplier: () => G) {
    if (this.value === null) {
      return supplier()
    }

    return Maybe.ofNullable(this.value)
  }

  public orElse(other: T): T {
    if (this.value === null) {
      return other
    }

    return this.value
  }

  public orElseGet(supplier: () => T): T {
    if (this.value === null) {
      return supplier()
    }

    return this.value
  }

  public orElseThrow(): T {
    if (this.value === null) {
      throw new NoSuchElementError()
    }

    return this.value
  }

  public toString() {
    return this.value === null ? this.value : (this.value as any).toString()
  }

  public toJSON() {
    return this.value
  }
}
