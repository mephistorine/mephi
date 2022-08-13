import { Talk } from "../domain"
import { Maybe } from "../utils"

const talks: readonly Talk[] = [
  {
    title: "CSS Container Queries and Units",
    slug: "css-container-queries-and-units",
    description: `
      <p>С годами популяризации интернета интерфейсы становились все сложнее, но вместе с этим развивались и инструменты, которые
      мы используем для создания этих самых интерфейсов. В этом докладе я хочу вам рассказать об еще одном таком инструменте «CSS
      Container Queries» и «CSS Container units».</p>
      <p>В будущем эти возможности языка CSS помогут нам делать наши интерфейсы удобнее и адаптивнее.</p>
    `
  },
  {
    title: "Семь Будущих Чудес CSS",
    slug: "seven-future-wonders-of-css",
    description: `Как часто вы читаете спецификации? Не очень? Да не проблема. Уже догадались, к чему идёт? Развитие спецификаций, стадии и процесс утверждения. Семь интереснейших спецификаций, связанные с доступностью, смешиванием цветов, управлением прокруткой, CSS-фигурами и другим. А вишенкой на торте — декларативный подход к написанию CSS в JS.`
  },
  {
    title: "NestJS - бэкенд для фронтедеров",
    slug: "nestjs-for-frontend-devs",
    description: "NodeJS показал миру что можно писать серверные приложение на JS. За последующие годы Node стал лучше и стабильнее. С появлением Express. Писать приложения для веба, стало еще проще. Я расскажу про NestJS - молодой и амбициозный фреймворк, написанный на Typescript и быстро набирающий популярность и признание среди разработчиков."
  },
  {
    title: "Таинственные шедулеры RxJS в море асинхронных чудовищ",
    slug: "rxjs-schedulers",
    description: "Буду разбирать внутренности того как RxJS работает с асинхронщиной, какие могут встретиться подводные камни и когда их нужно использовать, буду затрагивать тему шуделеров и операторов по типу observeOn. Комбинация опыта работы с RxJS и объяснения внутренной реализации."
  },
  {
    title: "Введение в реактивное программирование",
    slug: "reactive-programming-intro",
    description: "<p>Поведую вам о принципах реактивного программирования, зачем оно появилось и почему мы теперь об этом говорим и так или иначе слышим. Разберем какая может быть от этого польза или не стоит этим пользоваться вовсе.</p><p>Говорить о теории реактивности можно долго, поэтому на примере RxJS — самой популярной библиотеки реактивного программирования, посмотрим примеры того как можно сделать небольшое приложение с использованием этой библиотеки.</p>"
  },
  {
    title: "Глубокое погружение в реактивное программирование на примере RxJS",
    slug: "deep-dive-into-reactive-workshop",
    description: "Вы слышали про RxJS? Возможно, но это не точно. А про реактивное программирование? Скорее да. А вот про такую характеристику как «Реактивность» вы слышали наверняка! Но что это такое? Зачем это нужно? Кому это может быть полезным? На этом воркшопе я отвечу на эти вопросы, а так же научу вас этим пользоваться! Погружаемся в реактивщину :)"
  },
  {
    title: "Упрощаем жизнь с RxJS. Что это такое и зачем это нужно?",
    slug: "simplify-life-with-rxjs",
    description: ""
  }
]

export function getAllTalks(): readonly Readonly<Talk>[] {
  return talks
}

export function getTalk(slug: string): Maybe<Readonly<Talk>> {
  return Maybe.ofNullable(talks.find((talk) => talk.slug === slug))
}
