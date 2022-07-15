export function isStringHasEmoji(target: string): boolean {
  return /\p{Extended_Pictographic}/u.test(target)
}

export function formatDate(date: Date) {
  return date.toLocaleString("ru-RU", {
    dateStyle: "long",
    timeStyle: "short"
  })
}
