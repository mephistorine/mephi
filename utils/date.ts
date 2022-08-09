export function formatDate(date: Date) {
  return date.toLocaleString("ru-RU", {
    dateStyle: "long",
    timeStyle: "short"
  })
}
