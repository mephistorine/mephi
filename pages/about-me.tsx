import { Footer, Header } from "../components"
import { ABOUT_ME_PAGE, ARTICLES_BREADCRUMB, HOME_PAGE } from "../constants"

export default function Page() {
  return <>
    <Header breadcrumbs={ [ HOME_PAGE, ARTICLES_BREADCRUMB, ABOUT_ME_PAGE ] } />
    <main>
      <div className="wrap sm:py-4">
        <div>
          <h1 className="text-4xl font-bold mb-8">{ ABOUT_ME_PAGE.name }</h1>

          <section className="mb-8 overflow-auto text-container">
            <p>Привет, я Сэм 😺 Глава фронтенд направления в <a href="https://github.com/waliot">Waliot</a>, 3 года пишу на <a
              href="https://angular.io">Angular</a> и застал еще первые его версии, и раз уж пишу на Angular, то само собой познакомился с <a
              href="https://rxjs.dev">RxJS</a>, от которого я в восторге, и теперь просто от него не отлипаю. Из-за чего решил помочь начинающим и начал <a
              href="https://learnrxjs.ru">переводить документацию на русский язык</a> там уже 50+ переведенных операторов, так что, приходите помочь, буду
              только рад 😊</p>

            <p>Помимо перевода документации пишу приложение для организации тренировок цикличных видов спорта — <a href="https://becycled.me">beCycled</a>,
              чистый OpenSource все под MIT 😇. Стараюсь активно участвовать в развитии сообщества выступая на конференциях — обожаю это делать. Так же являюсь
              участником подкаста <a href="https://github.com/ngRuAir/ngruair">NgRuAir</a>.</p>

            <p>Когда я не занят разработкой, то я либо катаюсь на роликах, либо читаю мангу или смотрю аниме, либо читаю научную фантастику.</p>

            <p>Роликовые коньки это моя вторая жизнь, уже 6 лет я прыгаю и падаю ради удовольствия, будете в Краснодаре и захотите покататься на чем угодно, то
              зовите 😁.</p>

            <p>Я очень люблю японскую культуру да и Японию в целом, мечтаю как-нибудь туда съездить, поэтому люблю мангу и аниме, если вы знаток или
              увлекаетесь, то мы обязаны пообщаться, может быть поделитесь со мной интересным произведением или я с вами.</p>

            <p>Хоть сейчас и реже, но я читаю художественные книги, чаще научную фантастику, если вы читали трилогию «Память о прошлом Земли» <a
              href="https://ru.wikipedia.org/wiki/%D0%9B%D1%8E_%D0%A6%D1%8B%D1%81%D0%B8%D0%BD%D1%8C">Лю Цысиня</a> — то я думаю вы уже знаете, что делать 😹. Ну
              вот как-то так!</p>

            <h3 id="contacts">Контакты</h3>
            <p>Практически везде меня можно найти под ником <code>mephistorine</code></p>
            <ul>
              <li><a href="https://twitter.com/mephistorine">Твиттер</a></li>
              <li><a href="https://github.com/mephistorine">Гитхаб</a></li>
              <li><a href="https://instagram.com/mephistorine">Инстаграм</a></li>
              <li><a href="https://t.me/mephistorine">Телеграм</a></li>
              <li><a href="https://mephi.dev/feed.xml">RSS</a></li>
            </ul>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
}
