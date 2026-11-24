/**
 * Editorial layer for the visit posts.
 *
 * visits-source.md holds Tariel's original text, exactly as extracted from
 * Red Rose.pages. This file holds everything that had to be *written*: a
 * descriptive title per post per locale, an excerpt, the subject tags, the
 * archive sequence, and faithful translations into the two locales the post
 * was not written in.
 *
 * The original-language body always comes from visits-source.md and is never
 * duplicated here — `body` carries translations only.
 *
 * No dates. The source carries a usable date for two posts out of forty-four,
 * so the archive is ordered editorially by `order` instead. See DESIGN.md §0.
 */

export type Lang = 'ka' | 'en' | 'ru';
export type Tag = 'guests' | 'vineyard' | 'wine' | 'family' | 'feast';

export interface VisitEntry {
  /** Post number in visits-source.md. */
  post: number;
  slug: string;
  /** Position in the archive, 1 first. */
  order: number;
  /** The language Tariel wrote it in. */
  lang: Lang;
  tags: Tag[];
  /** Country keys, matching messages → countries. */
  country?: string[];
  guestCount?: number;
  title: Record<Lang, string>;
  excerpt: Record<Lang, string>;
  /** Translations only; the original language is read from the source file. */
  body: Partial<Record<Lang, string>>;
}

export const visits: VisitEntry[] = [
  {
    post: 29,
    slug: 'a-train-from-prague',
    order: 1,
    lang: 'ka',
    tags: ['guests'],
    country: ['cz'],
    guestCount: 85,
    title: {
      ka: 'მატარებელი პრაღიდან',
      en: 'A train from Prague',
      ru: 'Поезд из Праги',
    },
    excerpt: {
      ka: 'ბატონ იაკუბს საკუთარი სარკინიგზო კომპანია და საკუთარი მატარებლები ჰყავს. 2-3 ივლისს 85 ჩეხთან ერთად ჩამოდის.',
      en: 'Mr Jakub owns a railway company, and his own trains. On the 2nd and 3rd of July he arrives with eighty-five young Czechs.',
      ru: 'У господина Якуба своя железнодорожная компания и свои поезда. 2–3 июля он приезжает с восемьюдесятью пятью чехами.',
    },
    body: {
      en: `An unprecedented piece of news in the history of Georgian tourism.

This is Mr Jakub. An energetic young man from Prague who — imagine this — has his own railway company, and his own trains, in Czechia. When he stayed with me last year we made a plan to help each other along with something new: travelling by your own train. No, you did not mishear.

Those plans are about to take flesh. On the 2nd and 3rd of July Mr Jakub will come to Georgia and Armenia with a group of eighty-five young Czechs, on his own train. The train sets off soon, and the preparations have already started in our marani RED ROSE.

This really is unprecedented in the history of Baghdati. And an honour for us. In short — we are demanding a station of our own: Tsitelkhevi No. 2.`,
      ru: `Небывалая новость в истории грузинского туризма.

Это господин Якуб. Энергичный молодой человек из Праги, у которого — представьте себе — есть собственная железнодорожная компания и даже собственные поезда в Чехии. Когда он гостил у меня в прошлом году, мы задумали помочь друг другу в новом деле: путешествие на собственном поезде. Нет, вам не послышалось.

Эти планы вот-вот обретут плоть. Второго и третьего июля господин Якуб приедет в Грузию и Армению с группой из восьмидесяти пяти молодых чехов, на своём поезде. Поезд скоро тронется, а подготовка в нашем марани RED ROSE уже началась.

Для истории Багдати это и вправду небывалый случай. И честь для нас. Словом — требуем собственную станцию: Цительхеви-2.`,
    },
  },
  {
    post: 26,
    slug: 'ninety-guests-off-one-train',
    order: 2,
    lang: 'ka',
    tags: ['guests'],
    country: ['cz'],
    guestCount: 90,
    title: {
      ka: 'ოთხმოცდაათი სტუმარი ერთ დღეში',
      en: 'Ninety guests in one day',
      ru: 'Девяносто гостей за один день',
    },
    excerpt: {
      ka: 'მთელი მატარებელი — 90 ვიზიტორი. გამოწვევას მოვერიეთ, ბოლოს კი ტაშზე ავცრემლდი.',
      en: 'A whole trainload — ninety visitors. We met the challenge, and the applause at the end had me in tears.',
      ru: 'Целый поезд — девяносто гостей. Мы справились, а на аплодисментах в конце я прослезился.',
    },
    body: {
      en: `They brought me the T-shirt they had promised. There was a lunch, and then the evening too.

We hosted a whole train properly — ninety visitors. We met the challenge, and groups that size went away thoroughly pleased, off by train again towards the next adventure.

Out of pride, and out of the great warmth that comes from being with people, and above all at the burst of applause at the end, I found myself in tears. "The train was leaving"... Go safely, all of you. Until we meet again.`,
      ru: `Мне вручили обещанную футболку. Был обед, а потом и вечер.

Мы приняли как положено целый поезд — девяносто гостей. С вызовом справились, и такие большие группы уехали крайне довольные, снова поездом, навстречу следующим приключениям.

От гордости, от того огромного тепла, которое даёт общение с людьми, и особенно от горячих аплодисментов под конец я прослезился. «Уходил поезд»... Счастливого вам пути. До новых встреч.`,
    },
  },
  {
    post: 27,
    slug: 'day-one-i-made-myself-tamada',
    order: 3,
    lang: 'ka',
    tags: ['guests'],
    country: ['cz'],
    title: {
      ka: 'დღე პირველი — თამადად თავი დავაყენე',
      en: 'Day one, and I made myself tamada',
      ru: 'День первый: тамадой я назначил себя',
    },
    excerpt: {
      ka: 'ვკითხე, ვინ ზის მატარებლის საჭესთან-მეთქი. ჩეხებმა სერიოზული სახით მიპასუხეს — მატარებელში დავტოვეთო.',
      en: 'I asked who was driving the train, so I would not press drink on them. The Czechs replied, straight-faced, that they had left them on the train.',
      ru: 'Я спросил, кто за рулём поезда, чтобы не наливать им. Чехи с серьёзным видом ответили: машинистов оставили в поезде.',
    },
    body: {
      en: `"The train was leaving"... Day one. I appointed myself tamada.

Then I asked the guests: you do agree, don't you, nobody objects? Nobody did. So I wrapped that up as Georgian democracy and set off with the toast to God.

Then I asked whoever was sitting at the controls of the train to raise a hand, so I would know and not press drink on them. The Czechs answered me with entirely serious faces: we left them on the train.

A good group. The good feeling will stay with me a long while. Tomorrow I am expecting T-shirts and caps with the company logo as a present. A word is a word, and it has to be kept.`,
      ru: `«Уходил поезд»... День первый. Тамадой я назначил себя сам.

Потом спросил у гостей: вы ведь согласны, никто не против? Никто не был против. Я упаковал это как грузинскую демократию и начал с тоста «за Господа».

Потом попросил поднять руку тех, кто сидит за управлением поезда, — чтобы знать и не наливать им. Чехи ответили мне с совершенно серьёзными лицами: машинистов мы оставили в поезде.

Хорошая была группа. Доброе чувство останется со мной надолго. Завтра жду в подарок футболки и кепки с логотипом компании. Слово есть слово, его надо держать.`,
    },
  },
  {
    post: 38,
    slug: 'they-chose-a-family-not-a-chateau',
    order: 4,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'ოჯახი აირჩიეს და არა შატო',
      en: 'They chose a family, not a château',
      ru: 'Они выбрали семью, а не шато',
    },
    excerpt: {
      ka: '„უამრავი არჩევანი გვქონდა... მაგრამ ჩვენ ოჯახში მოსვლა ვარჩიეთ.“ ევროპელი ასაკოვანი ადამიანების ჯგუფი.',
      en: '"We had many options... but we chose to come into a family." A group of older European visitors.',
      ru: '«У нас был огромный выбор... но мы предпочли приехать в семью». Группа пожилых европейцев.',
    },
    body: {
      en: `You know, I often go back over the moments that made an impression on me, the ones I hold dear and that give me a push.

This group of older European people, with their orderliness, their gentlemanly qualities, their dignity. These are the people for whom what is valuable really is valuable. What humanity has gathered up as good, so far.

One of them said to me: "We had many options. Industrial châteaux, tourist sites loaded with tourists, new wine factories where we would have met dozens of industrial wines. But we chose to come into a quiet place like this, into a family, so we could better understand the Georgian character, the authentic nature of Georgians, and the traditions. We could not have learned this better anywhere else. Thank you for that, thank you for keeping the traditions."

That is what Europe is to me. That is what the human race has stood on, stands on, and will go on standing on for a great many million years.`,
      ru: `Знаете, я часто возвращаюсь к моментам, которые меня поразили, — тем, что мне дороги и что придают сил.

Эта группа пожилых европейцев, с их порядком, джентльменскими качествами, достоинством. Это те люди, для которых ценно то, что действительно ценно. То доброе, что человечество накопило до сих пор.

Один из них сказал мне: «У нас был огромный выбор. Индустриальные шато, туристические объекты, забитые туристами, новые винные заводы, где мы познакомились бы с десятками промышленных вин. Но мы предпочли приехать в такое тихое место, в семью, чтобы лучше узнать грузинский характер, подлинную природу грузин и традиции. Лучше этого мы бы нигде об этом не узнали. Спасибо за это, спасибо, что храните традиции».

Вот что для меня Европа. Вот на чём стоял, стоит и ещё много миллионов лет будет стоять род человеческий.`,
    },
  },
  {
    post: 19,
    slug: 'the-group-from-moscow',
    order: 5,
    lang: 'ka',
    tags: ['guests'],
    country: ['ru'],
    title: {
      ka: 'ახალგაზრდები მოსკოვიდან',
      en: 'The young people from Moscow',
      ru: 'Молодёжь из Москвы',
    },
    excerpt: {
      ka: '„ბოდიში ყველაფრისათვის, რაც დაგიშავეთ.“ ცრემლიანი საღამო და უამრავი თბილი სიტყვა.',
      en: '"Forgive us for everything my nation has done to you." A tearful evening, and a great many warm words.',
      ru: '«Простите за всё, что мой народ вам причинил». Вечер со слезами и множеством тёплых слов.',
    },
    body: {
      en: `A group of young people from Moscow. I do not have the words for what I felt.

How did so many fine young men and women come to find each other? In short — one of the girls began her thank-you toast like this: "You are astonishing people. Astonishing. Despite everything my nation has done to you, you meet us with such warmth. Forgive us for everything we have done to you..." And a great many tears followed from her own friends. A great many thanks, a great many warm words. It was an evening that moved my heart.

These thoughtful young people met the toast I made with silent tears. At the mention of Ukraine — I said that this fratricidal war is the equal of suicide, and that no reason on earth can justify that suicide — even the young men's eyes filled quietly.

Many warm and heartfelt words from these boys and girls. That is Russia's future, the future that will certainly change everything. I am unimaginably happy, and proud too, that I am Georgian. Yes, this is hope. Hope that the world will change for the better. And every river that has thrown itself out of its gorge will one day, without fail, return to its own bed. The Lord reigns.`,
      ru: `Группа молодых людей из Москвы. У меня не хватает слов, чтобы описать, что я чувствовал.

Как столько прекрасных ребят и девушек нашли друг друга? Коротко: одна девушка начала свой благодарственный тост так: «Вы удивительные люди. Удивительные. Несмотря на то, сколько всего мой народ вам причинил, вы встречаете нас так тепло. Простите за всё, что мы вам сделали...» И следом — множество слёз от её же друзей. Множество благодарностей, множество тёплых слов. Это был вечер, который тронул моё сердце.

Эти думающие молодые люди встретили мой тост молчаливыми слезами. На упоминании Украины — я сказал, что эта братоубийственная война равна самоубийству и что у этого самоубийства не может быть никакого оправдания, — даже у ребят тихо навернулись слёзы.

Много тёплых и сердечных слов от этих девушек и юношей. Вот оно, будущее России, то будущее, которое непременно всё изменит. Я невероятно счастлив и горд тем, что я грузин. Да, это надежда. Надежда на то, что мир изменится к лучшему. И всякая река, вырвавшаяся из своего ущелья, однажды непременно вернётся в собственное русло. Господь царствует.`,
    },
  },
  {
    post: 39,
    slug: 'the-georgians-of-fereydan',
    order: 6,
    lang: 'ka',
    tags: ['guests'],
    country: ['ir'],
    title: {
      ka: 'ფერეიდნელი ქართველები',
      en: 'The Georgians of Fereydan',
      ru: 'Ферейданские грузины',
    },
    excerpt: {
      ka: 'მათ წყაროს წყალივით სუფთა თვალებში 400 წლის წინანდელი საქართველო დავინახე.',
      en: 'In their eyes, clear as spring water, I saw the Georgia of four hundred years ago.',
      ru: 'В их глазах, чистых как родниковая вода, я увидел Грузию четырёхсотлетней давности.',
    },
    body: {
      en: `In far-off Iran, in the region of Fereydan, they say that if you can manage to crawl under a rainbow your dearest wish will come true and you will return to Georgia.

Yesterday I made my own dearest wish come true — I hosted the Georgians of Fereydan, led by Sofi Onikashvili.

It was an extraordinarily happy day, because in the eyes of these people, clear as spring water, I saw the Georgia of four hundred years ago: full of open, honest, sincere people. If the Fereydanians are searching for scattered and lost Georgian pearls and taking them up so hungrily, it would do us no harm either to look into these people's eyes and find something of our own that we had lost.

Glory to God. A good day dawned for me.`,
      ru: `В далёком Иране, в области Ферейдан, говорят: если сумеешь проползти под радугой, твоё заветное желание сбудется и ты вернёшься в Грузию.

Вчера я исполнил своё заветное желание — принимал ферейданских грузин во главе с Софи Оникашвили.

Это был необыкновенно счастливый день, потому что в глазах этих людей, чистых как родниковая вода, я увидел Грузию четырёхсотлетней давности: полную открытых, честных, искренних людей. Если ферейданцы ищут рассеянные и утраченные грузинские жемчужины и так жадно их вбирают, то и нам не помешало бы заглянуть этим людям в глаза и найти что-то своё, потерянное.

Слава Господу. Хороший у меня выдался день.`,
    },
  },
  {
    post: 41,
    slug: 'the-group-from-germany',
    order: 7,
    lang: 'ka',
    tags: ['guests'],
    country: ['de'],
    title: {
      ka: 'ჯგუფი გერმანიიდან',
      en: 'The group from Germany',
      ru: 'Группа из Германии',
    },
    excerpt: {
      ka: 'ბატონი შტეფანი ჯერ 12 წლისაა და კომპოტით სავსე ბოკალი დამირახუნა. სრულწლოვანებაზე დავპირდი საუკეთესო ღვინოს.',
      en: 'Mr Stefan is twelve and clinked a glass of fruit compote with me. I promised him the best wine when he comes of age.',
      ru: 'Господину Штефану двенадцать, и он чокнулся со мной стаканом компота. Я пообещал ему лучшее вино к совершеннолетию.',
    },
    body: {
      en: `A group of guests who left a particular love behind them. A group from Germany.

How Ms Irine and these older people cheered me up that day. The young lad in the bottom left corner, Mr Stefan — I took to him as a friend. He is only twelve, but he dreams of the day he will get drunk on wine. For now he only clinked a glass full of fruit compote with me. I promised him that when he comes of age we will drink the best wine together. "Good man, brother..."

But then something got into me, and the devil pulled out of my mouth that famous line from the old German films — "Oh, mein lieber Führer..." This cheeky lad wagged a strict finger at me and said: "For saying that in Germany they would give you a proper beating."

That is the mark fascism left on the order-loving Germans.

And? I am invited. For life, no less.`,
      ru: `Группа гостей, оставившая после себя особую любовь. Группа из Германии.

Как же меня обрадовали в тот день госпожа Ирине и эти пожилые люди. Паренёк в левом нижнем углу, господин Штефан, пришёлся мне по душе как друг. Ему всего двенадцать, но он мечтает о дне, когда напьётся вина. Пока он чокнулся со мной лишь стаканом, полным компота. Я пообещал ему, что, когда он станет совершеннолетним, мы вместе выпьем лучшее вино. «Молодец, брат...»

А потом что-то на меня нашло, и чёрт вытащил у меня изо рта известную фразу из старых немецких фильмов — «О, майн либер фюрер...» Этот озорник строго погрозил мне пальцем и сказал: «За такие слова в Германии вас как следует поколотят».

Вот какой след оставил фашизм на любящих порядок немцах.

И что же? Я приглашён. Причём бессрочно.`,
    },
  },
  {
    post: 45,
    slug: 'independence-day-with-jason',
    order: 8,
    lang: 'ka',
    tags: ['guests', 'feast'],
    country: ['us', 'gb-sct', 'hu'],
    title: {
      ka: 'დამოუკიდებლობის დღე ჯეისონთან ერთად',
      en: 'Independence Day with Jason',
      ru: 'День независимости вместе с Джейсоном',
    },
    excerpt: {
      ka: 'მისტერ ჯეისონ ლაბატემ ორწლიანი ინტერვალის შემდეგ მეორედ მომილოცა დამოუკიდებლობის დღე.',
      en: 'Mr Jason LaBatte congratulated me on Independence Day for a second time, after a two-year gap.',
      ru: 'Господин Джейсон Лабатт во второй раз, спустя два года, поздравил меня с Днём независимости.',
    },
    body: {
      en: `Mr Jason LaBatte — a decorated American serviceman, an officer, now retired — congratulated me on Georgia's Independence Day for a second time, after an interval of two years.

Across the table from me, Jason himself. On his left his wife, on his right a relative, a most warm-hearted lady — they are descendants of the Apache people. On my own left a very good young Scotsman, and on my right an erudite Hungarian agricultural engineer.

In such high spirits, and from such pleasant surroundings, I wish you a happy Independence Day. Marani RED ROSE. "God bless America" and Georgia.`,
      ru: `Господин Джейсон Лабатт — заслуженный американский военный, офицер в отставке — во второй раз, спустя два года, поздравил меня с Днём независимости Грузии.

Напротив меня — сам Джейсон. Слева от него супруга, справа — родственница, теплейшая женщина; они потомки индейцев апачей. Слева от меня очень хороший молодой шотландец, справа — эрудированный венгерский агроинженер.

В таком приподнятом настроении и из такой приятной обстановки поздравляю вас с Днём независимости. Марани RED ROSE. «God bless America» и Грузию.`,
    },
  },
  {
    post: 44,
    slug: 'a-wonderful-day-in-a-guests-own-words',
    order: 9,
    lang: 'en',
    tags: ['guests'],
    country: ['us', 'hu'],
    title: {
      ka: 'სტუმრის სიტყვებით',
      en: "A wonderful day, in a guest's own words",
      ru: 'Прекрасный день — словами гостя',
    },
    excerpt: {
      ka: 'ერთადერთი ჩანაწერი, რომელიც ტარიელს არ დაუწერია. მისი სტუმრის სიტყვებია.',
      en: 'The one entry Tariel did not write. These are his guest’s words.',
      ru: 'Единственная запись, написанная не Тариэлом. Это слова его гостя.',
    },
    body: {
      ka: `მშვენიერი დღე — ვჭამდით გემრიელ ქართულ საჭმელს და ვსვამდით შესანიშნავ ღვინოს Rose Winery-დან. აღვნიშნეთ ჩვენი კავშირი და ღრმად განცდილი მეგობრობა ამდენ ქვეყანასა და კულტურას შორის. მადლობა, ჩემო მეგობარო ტარიელ მიქაბაძევ. და ჩემო მეგობრებო ჯეისონ და პეტერ ჩიზმადია. ჩვენ მშვენივრად გავატარეთ დრო, ვზეიმობდით მშვიდობასა და ურთიერთსიყვარულს — სულერთია, საიდანაც უნდა ვიყოთ. ღმერთმა ყველანი გვაკურთხოს.`,
      ru: `Чудесный день: ели вкусную грузинскую еду и пили превосходное вино из Rose Winery. Отметили нашу связь и глубоко прочувствованную дружбу поверх стольких стран и культур. Спасибо, мой друг Тариэл Микабадзе. И мои друзья Джейсон и Петер Чизмадия. Мы прекрасно провели время, празднуя мир и взаимную любовь — неважно, откуда мы родом. Благослови нас всех Господь.`,
    },
  },
  {
    post: 16,
    slug: 'friends-from-vilnius',
    order: 10,
    lang: 'ka',
    tags: ['guests'],
    country: ['lt'],
    title: {
      ka: 'მეგობრები ვილნიუსიდან',
      en: 'Friends from Vilnius',
      ru: 'Друзья из Вильнюса',
    },
    excerpt: {
      ka: 'კაცი, რომელსაც წლის წინ შევხვდი, მომინახულა. მინდა ქართული სადღეგრძელოების სკოლა დავაფუძნო წითელხევში.',
      en: 'A man I met a year ago came back to find me. I want to found a school of Georgian toasts here in Tsitelkhevi.',
      ru: 'Человек, которого я встретил год назад, приехал меня навестить. Хочу основать в Цительхеви школу грузинских тостов.',
    },
    body: {
      en: `What a good day I had. Friends from Vilnius.

I cannot hide what I felt — this was one of the standout groups of the whole year. It feels to me as though an old dream has come true. A man I met a year ago, to whom I handed my contact details in passing while we were luxuriating in the sulphur waters of the village of Amaghleba, sipping my exclusive nine-year-old Eristavi cognac, came to visit me. And in spite of that cold Baltic climate he brought a great warmth into my house.

I had a good day. And here is an idea — I want to found a school of Georgian toasts at my place, here in Tsitelkhevi. The guests are the ones who pushed me towards it.

Once again I am convinced that the whole point of people existing is love. Glory to Thee, O Lord.`,
      ru: `Какой же хороший у меня был день. Друзья из Вильнюса.

Не могу скрыть своих чувств — это была одна из самых особенных групп за весь год. Мне кажется, будто сбылась старая мечта. Человек, которого я встретил год назад и которому мимоходом отдал свои контакты, пока мы нежились в сернистых водах села Амаглеба, потягивая мой эксклюзивный девятилетний коньяк «Эриставы», приехал меня навестить. И, несмотря на тот холодный балтийский климат, принёс в мой дом большое тепло.

Хороший был день. И вот идея — хочу основать у себя, здесь, в Цительхеви, школу грузинских тостов. Меня к этому подтолкнули сами гости.

Ещё раз убеждаюсь, что весь смысл существования людей — в любви. Слава Тебе, Господи.`,
    },
  },
  {
    post: 11,
    slug: 'niko-the-finnish-theologian',
    order: 11,
    lang: 'ka',
    tags: ['guests'],
    country: ['fi'],
    title: {
      ka: 'ნიკო, ფინელი თეოლოგი',
      en: 'Niko, the Finnish theologian',
      ru: 'Нико, финский теолог',
    },
    excerpt: {
      ka: 'სადღეგრძელოები ვასწავლე და ჯერ ფინურად, მერე ლათინურად დაიწყო მათი თარგმნა.',
      en: 'I taught him the toasts and he began translating them, first into Finnish, then into Latin.',
      ru: 'Я научил его тостам, и он начал переводить их — сперва на финский, потом на латынь.',
    },
    body: {
      en: `A Finnish theologian by the name of Niko. He knows his wines splendidly. I taught him the toasts and he set about translating them, first into Finnish and then into Latin.

He has been in Georgia a week and already loves this country. He is delighted by the culture, the traditions, and by how we hold our faith. He respects our views on the family and on... maidenhood. You did not mishear — he mentioned that word a good ten times. I told him I would marry him to a Georgian girl. By all means, he said, but she must be a maiden.

Now what are we to do with this one?`,
      ru: `Финский теолог по имени Нико. Прекрасно разбирается в винах. Я научил его тостам, и он принялся их переводить — сначала на финский, потом на латынь.

Он в Грузии неделю и уже любит эту страну. Он в восторге от культуры, от традиций и от того, как мы относимся к вере. Уважает наши взгляды на семью и на... девичество. Вам не послышалось — это слово он помянул раз десять. Я сказал ему, что сосватаю ему грузинку. Извольте, говорит, но она должна быть девицей.

И что нам теперь с ним делать?`,
    },
  },
  {
    post: 21,
    slug: 'the-mushroom-inspector',
    order: 12,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'სოკოს ზედამხედველი',
      en: 'The mushroom inspector',
      ru: 'Грибной инспектор',
    },
    excerpt: {
      ka: 'თურმე ევროპაში მოპოვებული სოკო სპეციალურ სამსახურს უნდა შეამოწმებინო. ჩვენს ნიყვს იქ ცეზარის სოკოს ეძახიან.',
      en: 'In Europe, it turns out, you must have your picked mushrooms checked by a special service. Our nikvi is called Caesar’s mushroom there.',
      ru: 'Оказывается, в Европе собранные грибы нужно сдавать на проверку в особую службу. Наш никви там зовут цезарским грибом.',
    },
    body: {
      en: `Mr Marko, head of the service that supervises the picking of mushrooms in the forest, and our mutual friends Kurt, Gerold and Regina.

So there is a job like that in Europe: you have to take the mushrooms you have picked to a special service to be checked as fit to eat, and only then carry them home. We talked a great deal about the strange world of mushrooms. Our nikvi, it turns out, is called Caesar's mushroom over there.

It was a good day. Let it stay here as a memory.`,
      ru: `Господин Марко, начальник службы надзора за сбором грибов в лесу, и общие друзья Курт, Герольд и Регина.

Оказывается, в Европе есть и такая служба: собранные грибы нужно отдать на проверку в особое ведомство, убедиться, что они годны в пищу, и только потом нести домой. Мы много говорили о странном мире грибов. Наш никви, как выяснилось, там называют цезарским грибом.

Хороший был день. Пусть останется здесь как воспоминание.`,
    },
  },
  {
    post: 23,
    slug: 'the-gagauz-from-moldova',
    order: 13,
    lang: 'ka',
    tags: ['guests'],
    country: ['md'],
    title: {
      ka: 'მოლდაველი გაგაუზები',
      en: 'The Gagauz from Moldova',
      ru: 'Гагаузы из Молдовы',
    },
    excerpt: {
      ka: 'ისე მოხერხებულად ხუმრობენ ერთმანეთთან, როგორც ჩვენ. „ისე გავიზარდეთ, ერთი ტრუსიკი გვეცვაო.“',
      en: 'They joke with each other about as deftly as we do. "We grew up so close we shared one pair of pants."',
      ru: 'Они шутят друг с другом примерно так же ловко, как мы. «Мы выросли так, что носили одни трусы на двоих».',
    },
    body: {
      en: `Gagauz from Moldova. Cheerful people, physically handsome — a Turkic-speaking nation mixed in among the Moldovans — and they joke with one another about as deftly as we do.

One said of the other: we grew up so close we wore one pair of pants between us.

Which, put our way, comes out as: we grew up in the same pair of pants.`,
      ru: `Гагаузы из Молдовы. Весёлые, физически красивые люди — тюркоязычный народ, перемешанный с молдаванами, — и шутят они друг с другом примерно так же ловко, как мы.

Один сказал про другого: мы выросли так близко, что носили одни трусы на двоих.

Что по-нашему звучит так: мы выросли в одних трусах.`,
    },
  },
  {
    post: 24,
    slug: 'a-belgian-father-and-son',
    order: 14,
    lang: 'ka',
    tags: ['guests'],
    country: ['be'],
    title: {
      ka: 'ბელგიელი მამა-შვილი',
      en: 'A Belgian father and son',
      ru: 'Бельгиец с сыном',
    },
    excerpt: {
      ka: 'ბევრი ვისაუბრეთ ბელგიურ ლუდზე და ქართულ ღვინოზე. მსიამოვნებს, როცა სტუმარი ერკვევა.',
      en: 'We talked a lot about Belgian beer and Georgian wine. I enjoy it when a guest knows the subject.',
      ru: 'Много говорили о бельгийском пиве и грузинском вине. Мне нравится, когда гость разбирается.',
    },
    body: {
      en: `A neat Belgian family, father and son. We talked a great deal about Belgian beer and Georgian wine.

It always gives me pleasure when a guest knows the subject, and knows it well — I get competitive about wine talk.

A good, family sort of evening it turned out to be. Tamtush, bravo. Welcome to the tourism business. You are my brother.`,
      ru: `Аккуратная бельгийская семья, отец и сын. Много говорили о бельгийском пиве и грузинском вине.

Мне всегда приятно, когда гость разбирается, и разбирается хорошо, — в разговорах о вине я вхожу в азарт.

Вечер вышел хороший, семейный. Тамтуш, браво. Добро пожаловать в туристический бизнес. Ты мне брат.`,
    },
  },
  {
    post: 32,
    slug: 'wine-people-from-the-old-world',
    order: 15,
    lang: 'ka',
    tags: ['guests', 'wine'],
    country: ['it'],
    title: {
      ka: 'ღვინისმცოდნეები ძველი სამყაროდან',
      en: 'Wine people from the Old World',
      ru: 'Виноделы из Старого Света',
    },
    excerpt: {
      ka: 'განსაკუთრებულად ვღელავ, როცა ღვინის ძველი სამყაროდან მეწვევიან. ვივა იტალია.',
      en: 'I get especially nervous when they come from the old world of wine. Viva Italia.',
      ru: 'Особенно волнуюсь, когда приезжают из старого винного мира. Viva Italia.',
    },
    body: {
      en: `I get especially nervous when people who know wine come to me from the old world of wine.

And at the end I am beyond glad when they give my life's work the best marks there are.

Viva Italia.`,
      ru: `Я особенно волнуюсь, когда ко мне приезжают знатоки вина из старого винного мира.

А под конец безмерно радуюсь, когда они ставят делу моей жизни наивысшие оценки.

Viva Italia.`,
    },
  },
  {
    post: 20,
    slug: 'the-shortest-tour-i-have-given',
    order: 16,
    lang: 'ka',
    tags: ['guests', 'wine'],
    country: ['baltic'],
    guestCount: 2,
    title: {
      ka: 'ყველაზე მოკლე ტური',
      en: 'The shortest tour I have given',
      ru: 'Самая короткая экскурсия',
    },
    excerpt: {
      ka: 'უცებ დამადგნენ თავზე, პირუტყვის სადგომს რომ ვასწორებდი. ხემსი, ერთი ბოთლი — და უკან ბათუმისკენ.',
      en: 'They turned up unannounced while I was tidying the livestock shed. A snack, one bottle, and back to Batumi.',
      ru: 'Они свалились как снег на голову, когда я приводил в порядок хлев. Закуска, одна бутылка — и обратно в Батуми.',
    },
    body: {
      en: `We had a married couple staying, from the shores of the Baltic, by the surname of Kets.

They came down on my head quite unexpectedly, with no warning, at a moment when I was putting the livestock shed in order. They had been recommended to us in Batumi. I could tell they also knew what good wine costs.

They limited themselves to a snack and a tasting of one bottle, bought wines of various grape varieties and styles — expensive ones among them — posed for photographs themselves beside this five-century Imeretian sachache qvevri of twelve and a half cubic metres, awarded me a "picture" of my own, rewarded me with a warm hug as well, and set off back towards Batumi.

I was left a little stunned. I have never had such a short tour.`,
      ru: `У нас гостила супружеская пара с берегов Балтики, по фамилии Кец.

Они свалились мне на голову совершенно неожиданно, без предупреждения, как раз когда я приводил в порядок хлев. Им нас порекомендовали в Батуми. Я заметил, что цену хорошему вину они тоже знают.

Они ограничились закуской и дегустацией одной бутылки, купили вина разных сортов и стилей — в том числе дорогие, — сами попозировали у этого пятивекового имеретинского квеври-сачаче объёмом двенадцать с половиной кубометров, «сфотографировали» и меня, наградили ещё и тёплыми объятиями и отправились обратно в Батуми.

Я остался слегка ошарашенным. Такой короткой экскурсии у меня ещё не бывало.`,
    },
  },
  {
    post: 9,
    slug: 'they-waited-a-whole-year',
    order: 17,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'მთელი წელი ველოდითო',
      en: 'They waited a whole year',
      ru: 'Мы ждали целый год',
    },
    excerpt: {
      ka: 'გუშინდელი ჯგუფიდან რამდენიმე მეორედ მესტუმრა. „მთელი წელი ველოდით, რომ აქ მოვსულიყავითო.“',
      en: 'Several from yesterday’s group were here for the second time. "We waited a whole year to come back."',
      ru: 'Несколько человек из вчерашней группы приехали во второй раз. «Мы целый год ждали, чтобы сюда вернуться».',
    },
    body: {
      en: `I was so glad. Once again I was convinced that kindness does not disappear without a trace. "Do a good thing, lay a stone, walk on and you will meet it ahead of you..."

Out of yesterday's team of visitors I discovered that several of them had come to me for a second time. I was glad, glad from the heart, truly, truly. When they told me they had waited a whole year to come here, it went straight to me.

I was charged with feeling, and together we made a most beautiful day. We are hopeful; we will make some corrections for the future and next year we will make our guests' time in the marani lovelier still.`,
      ru: `Я так обрадовался. Ещё раз убедился, что добро не пропадает бесследно. «Сделай добро, положи камень, иди дальше — оно встретится тебе впереди...»

Из вчерашней команды гостей я обнаружил, что несколько человек приехали ко мне уже во второй раз. Я обрадовался, обрадовался сердцем, правда, правда. А когда они сказали, что целый год ждали, чтобы сюда приехать, меня это проняло.

Я зарядился чувствами, и вместе у нас вышел прекраснейший день. Мы полны надежд: внесём кое-какие поправки на будущее и в следующем году сделаем пребывание наших гостей в марани ещё красивее.`,
    },
  },
  {
    post: 7,
    slug: 'three-groups-in-four-days',
    order: 18,
    lang: 'ka',
    tags: ['guests'],
    country: ['at', 'hu'],
    title: {
      ka: 'სამი ჯგუფი ოთხ დღეში',
      en: 'Three groups in four days',
      ru: 'Три группы за четыре дня',
    },
    excerpt: {
      ka: 'სუფრაზე „ვეფხისტყაოსანი“ წავიკითხეთ. ერთი სტუმარი კი წარმოშობით ქართველი აღმოჩნდა.',
      en: 'We read Rustaveli aloud at the table. And one guest turned out to be Georgian by descent.',
      ru: 'За столом читали «Витязя в тигровой шкуре». А один гость оказался грузином по происхождению.',
    },
    body: {
      en: `It so happened that I received three different large European groups one after another over four days. Because our "camera operator" — the chef of our kitchen, my wife, Ms Mariam — is very often too busy, a great many lovely and interesting moments stay outside the frame.

One evening, for instance (the tamada being unchangeably me, of course), I mentioned in a toast our great Shota and his Knight in the Panther's Skin. I mentioned him as an unequalled preacher of ideas belonging to all humanity, five centuries before Shakespeare. They had the great work brought to us, and these young people listened to those brilliant, sweet-flowing stanzas without a trace of boredom, with real pleasure.

And here is one more thing. One of them, a rather striking curly-haired young man from another group, turned out to be Georgian by descent. His great-grandfather stayed behind in Austria during the First World War and married a Hungarian girl. The surname had been changed — I could not make it resemble anything Georgian. He talked with me a long time, gave my Gio a beautiful bracelet, and at the end asked me to teach him something he could say to a Georgian he met in Europe, to make him smile. Fine, I said. If you see a Georgian with a moustache, ask him "where are you from, boy" — from the motifs of a well-known, slightly vulgar joke. And if he has no moustache, tell him "what have you done with your moustache, boy".

Right up until he left, and even until the door of the coach was shut, he kept repeating it. Heaven help me if some unknown Georgian in great Europe remembers me badly for it.`,
      ru: `Так совпало, что за четыре дня я принял три разные большие европейские группы одну за другой. Поскольку наш «оператор» — шеф-повар нашей кухни, моя жена, госпожа Мариам — очень часто занята, множество красивых и интересных моментов остаётся за кадром.

Например, в один из вечеров (тамада, разумеется, неизменно я) я помянул в тосте нашего великого Шоту и его «Витязя в тигровой шкуре». Помянул как непревзойдённого проповедника общечеловеческих идей за пять веков до Шекспира. Нам принесли это великое произведение, и эти молодые люди без всякой скуки, с настоящим удовольствием слушали гениальные, сладкозвучные строфы.

И ещё одно. Один из них, довольно видный кудрявый молодой человек из другой группы, оказался грузином по происхождению. Его прадед остался в Австрии во время Первой мировой и женился на венгерке. Фамилия изменена — я никак не смог найти в ней грузинского. Он долго со мной разговаривал, подарил моему Гио красивый браслет и напоследок попросил научить его чему-нибудь такому, что можно сказать грузину при встрече в Европе, чтобы тот улыбнулся. Хорошо, говорю. Увидишь усатого грузина — спроси: «ты откуда, парень?» (по мотивам известного, слегка вульгарного анекдота). А если он без усов — скажи: «куда усы дел, парень?»

До самого отъезда, и даже пока не закрылась дверь автобуса, он это повторял. Не дай бог какой-нибудь незнакомый грузин в великой Европе помянет меня недобрым словом.`,
    },
  },
  {
    post: 8,
    slug: 'three-days-and-the-marani-is-full',
    order: 19,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'მესამე დღეა სავსეა ჩემი მარანი',
      en: 'Three days now, and the marani is full',
      ru: 'Третий день марани полон',
    },
    excerpt: {
      ka: 'ცოტა გადავიღალეთ, მაგრამ საოცარი შეგრძნებაა უცხო კულტურას ეხებოდე და შენსას აცნობდე.',
      en: 'We are a little worn out, but it is an extraordinary feeling to touch another culture and show them yours.',
      ru: 'Мы немного вымотались, но это удивительное чувство — прикасаться к чужой культуре и показывать свою.',
    },
    body: {
      en: `Three days now and my marani is full.

We are a little worn out, but this is an extraordinary feeling — to touch another culture and introduce them to your own. To be proud of what is yours and to make much of your guest's at the same time.

I am pleasantly tired. I will share more of what I am feeling.`,
      ru: `Третий день мой марани полон.

Мы немного вымотались, но это удивительное чувство — прикасаться к чужой культуре и знакомить с собственной. Гордиться своим и одновременно бережно относиться к тому, что дорого гостю.

Я приятно устал. Ещё поделюсь тем, что чувствую.`,
    },
  },
  {
    post: 12,
    slug: 'our-guests-share-the-mourning',
    order: 20,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'გლოვას სტუმრებიც იზიარებენ',
      en: 'Our guests share the mourning',
      ru: 'Гости разделяют траур',
    },
    excerpt: {
      ka: 'საგალობლების ფონზე ევროპელები ფეხზე დამდგარი პატივს მიაგებენ და გვისამძიმრებენ.',
      en: 'To the sound of the chants, the Europeans stood and paid their respects.',
      ru: 'Под песнопения европейцы встали и отдали дань уважения.',
    },
    body: {
      en: `Our guests share the mourning too.

To the sound of the chants, the Europeans stood once again and paid their respects to our Patriarch, gave us their condolences and were gentle with us.

"Lord, have mercy upon us..." "Thou art a vineyard..."`,
      ru: `Наши гости тоже разделяют траур.

Под песнопения европейцы снова встали и отдали дань уважения нашему Патриарху, выразили нам соболезнования и были к нам ласковы.

«Господи, помилуй нас...» «Ты еси лоза виноградная...»`,
    },
  },
  {
    post: 30,
    slug: 'a-guest-with-tears-in-her-eyes',
    order: 21,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'სიხარულისგან აცრემლებული სტუმარი',
      en: 'A guest with tears of joy',
      ru: 'Гостья со слезами радости',
    },
    excerpt: {
      ka: 'ეს იყოს აქ — კიდევ ერთი ლამაზი საღამოს მოსაგონრად.',
      en: 'Let this stay here — in memory of another beautiful evening.',
      ru: 'Пусть это останется здесь — на память ещё об одном красивом вечере.',
    },
    body: {
      en: `Let this stay here. In memory of another beautiful evening, and of a guest whose eyes filled with tears of joy.`,
      ru: `Пусть это останется здесь. На память ещё об одном красивом вечере и о гостье, у которой глаза наполнились слезами радости.`,
    },
  },
  {
    post: 6,
    slug: 'the-waterfall-the-museum-and-tolerance',
    order: 22,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'ჩანჩქერი, მუზეუმი და ტოლერანტობა',
      en: 'A waterfall, a museum, and tolerance',
      ru: 'Водопад, музей и терпимость',
    },
    excerpt: {
      ka: 'ხანის ჩანჩქერმოვლილი, ვანის მუზეუმგამოვლილი, ძლიერ გადაღლილი ჯგუფი.',
      en: 'A group who had done the Khani waterfall and the Vani museum, and were thoroughly worn out.',
      ru: 'Группа, обошедшая Ханский водопад и музей в Вани и вконец вымотавшаяся.',
    },
    body: {
      en: `A group who had been round the Khani waterfall and through the museum at Vani, thoroughly worn out — and talk about religious tolerance.

RED ROSE`,
      ru: `Группа, обошедшая Ханский водопад и музей в Вани, вконец вымотавшаяся, — и разговоры о религиозной терпимости.

RED ROSE`,
    },
  },
  {
    post: 25,
    slug: 'no-words-just-the-photograph',
    order: 23,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'უსიტყვოდ',
      en: 'No words, just the photograph',
      ru: 'Без слов, только фотография',
    },
    excerpt: {
      ka: 'ტარიელს ამ ჩანაწერისთვის ტექსტი არ დაუწერია — მხოლოდ ფოტო.',
      en: 'Tariel wrote no text for this one — only the photograph.',
      ru: 'К этой записи Тариэл не написал текста — только фотография.',
    },
    body: {
      en: '',
      ru: '',
    },
  },
  {
    post: 40,
    slug: 'why-there-are-no-old-chateaux-here',
    order: 24,
    lang: 'ka',
    tags: ['wine'],
    title: {
      ka: 'რატომ არ არის აქ ძველი შატოები',
      en: 'Why there are no old châteaux here',
      ru: 'Почему здесь нет старых шато',
    },
    excerpt: {
      ka: 'იმერელი კაცი იძულებული იყო ღვინო ქვევრითურთ ტყეში დაემალა. მაინც შემორჩა ხუთსაუკუნოვანი საჭაჭე.',
      en: 'An Imeretian had to hide his wine, qvevri and all, in the forest. A five-century sachache survived anyway.',
      ru: 'Имеретинцу приходилось прятать вино вместе с квеври в лесу. Пятивековое сачаче всё же уцелело.',
    },
    body: {
      en: `When foreign guests come to me, one question often troubles them: why are there no old châteaux in Imereti, or in the west at all, of the kind they have in the old wine countries? Or why is it hard to find artefacts more than a century old here, and why is everything newly made?

I answer that we were surrounded by the Muslim world for a great many centuries, and because of the frequent invasions they not only left no stone upon stone in the old marani — the Imeretian man was forced to hide his wine, qvevri and all, away from the house, somewhere in the forest, so that it would not be defiled. Everyone knew perfectly well that the Georgian man had been raised on the roots of the vine.

In spite of that, a few unique old artefacts of winemaking have survived here and there among us. Here is one: a five- or six-century Imeretian sachache. A churi-shaped vessel of 800 pood — twelve and a half tonnes — for making household wine and storing chacha, kept in excellent condition.

When I touch its edges, built up out of lime mortar, it feels to me as though the souls of my ancestors are speaking to me from the country on the other side. And they are binding my heart too, with mortar and lime, into firmness.`,
      ru: `Когда ко мне приезжают иностранные гости, их часто мучает один вопрос: почему в Имерети, да и вообще на западе, нет таких старых шато, как в старых винных странах? И почему здесь трудно найти артефакты старше века, почему всё сделано заново?

Я отвечаю, что мы много веков были окружены мусульманским миром и из-за частых нашествий в старых марани не только камня на камне не оставляли — имеретинец был вынужден прятать вино вместе с квеври подальше от дома, где-нибудь в лесу, чтобы его не осквернили. Все прекрасно знали, что грузин вырос на корнях лозы.

Несмотря на это, кое-где у нас всё же уцелели уникальные старые артефакты виноделия. Вот один из них: имеретинское сачаче пяти-шести веков. Сосуд в форме чури ёмкостью 800 пудов — двенадцать с половиной тонн — для домашнего вина и хранения чачи, сохранившийся в превосходном состоянии.

Когда я прикасаюсь к его краям, выведенным известковым раствором, мне кажется, что души предков говорят со мной с той стороны. И моё сердце они тоже скрепляют раствором и известью — на твёрдость.`,
    },
  },
  {
    post: 18,
    slug: 'the-press-four-generations-made',
    order: 25,
    lang: 'ka',
    tags: ['wine', 'family'],
    title: {
      ka: 'საწნეხი, რომელიც ოთხმა თაობამ გააკეთა',
      en: 'The press four generations made',
      ru: 'Пресс, который делали четыре поколения',
    },
    excerpt: {
      ka: 'ქვა წინაპრებმა მოიტანეს, სადგარი ბაბუამ შეკრა, ხე მამამ გაახლა, ზედა კონსტრუქცია ჩვენ დავამატეთ.',
      en: 'The stone came from my ancestors, the stand from my grandfather, the wood from my father. We added the top.',
      ru: 'Камень принесли предки, станину собрал дед, дерево обновил отец. Верх добавили мы.',
    },
    body: {
      en: `When novelty lives alongside the innovations of the past. A three-century pressing rig, the otsintsari.

The megalithic stone was brought by my great ancestors. My grandfather assembled the massive iron stand. My father renewed the wooden part. My friend Zura and I added the upper iron structure and made the work easier — we put the press on what they call a jack.

And so the Tsolikouri juice comes trickling down over a three-hundred-year-old stone, rik-rik-rik, giving no thought to any of this, thinking perhaps only of filling every vessel its owner has.

Many autumns to Georgia.`,
      ru: `Когда новое сосуществует с инновациями прошлого. Трёхвековое давильное устройство — оцинцари.

Мегалитический камень принесли мои великие предки. Дед собрал массивную железную станину. Отец обновил деревянную часть. Мы с моим другом Зурой добавили верхнюю железную конструкцию и облегчили работу — перевели пресс на так называемый домкрат.

И вот сок цоликоури журчит по трёхсотлетнему камню, рик-рик-рик, вовсе об этом не думая, — думая разве что о том, как бы наполнить хозяину всю посуду до единой.

Многих осеней тебе, Грузия.`,
    },
  },
  {
    post: 5,
    slug: 'the-hundred-year-old-kunkula',
    order: 26,
    lang: 'ka',
    tags: ['wine'],
    title: {
      ka: 'ასწლოვანი კუნკულა',
      en: 'The hundred-year-old kunkula',
      ru: 'Столетняя кункула',
    },
    excerpt: {
      ka: 'მთელი 2 წუთი და დიდი მოთმინება სჭირდება მის დაცლას. ცერზე დაკაკუნებაც ვასწავლე.',
      en: 'It takes a full two minutes and a good deal of patience to empty. I taught them the tap on the thumb, too.',
      ru: 'На то, чтобы её опустошить, уходят целых две минуты и немало терпения. Научил и стуку о большой палец.',
    },
    body: {
      en: `This hundred-year-old Imeretian kunkula has become very popular among our guests.

They ask me for it outright now — where do you keep it, we want to drink this toast out of that vessel. They do not even hesitate, in spite of the fact that emptying it takes a full two minutes and a great deal of patience.

I have taught them the tap on the thumb as well, to confirm whether it really did come out empty.

May it do you good. Marani RED ROSE wishes you a happy feast of the Transfiguration.`,
      ru: `Эта столетняя имеретинская кункула стала очень популярна среди наших гостей.

Теперь они прямо просят: где она у тебя, этот тост хотим выпить из неё. И даже не колеблются, хотя на то, чтобы её опустошить, уходят целых две минуты и немало терпения.

Научил их и стуку о большой палец — чтобы подтвердить, действительно ли она опустела.

На здоровье. Марани RED ROSE поздравляет вас с праздником Преображения.`,
    },
  },
  {
    post: 31,
    slug: 'without-vakhtanguri-there-is-no-supra',
    order: 27,
    lang: 'ka',
    tags: ['wine'],
    title: {
      ka: 'ვახტანგურის გარეშე სუფრა არ გამოდის',
      en: 'Without vakhtanguri there is no supra',
      ru: 'Без вахтангури супра не выходит',
    },
    excerpt: {
      ka: 'ოოო, ნეტა ჭინჭილას შესმა გენახათ. ჩვენ ერთად ვაშენებთ ჩვენი შვილების მომავალს.',
      en: 'Oh, if you had seen the chinchila being drunk. We are building our children’s future together.',
      ru: 'О, видели бы вы, как пьют из чинчилы. Мы вместе строим будущее наших детей.',
    },
    body: {
      en: `Without vakhtanguri a supra does not come off. Perhaps it cannot. Oh, if only you had seen the chinchila being drunk...

I have always put the emphasis on human relations, and the stake I placed on friendship has always been very large for me. "The candle and the incense will not lose their way..." And, as an old proverb has it, "in a holy place there is never emptiness..."

We are building our children's future together, laying love in the foundation like mortar and stone.

Bravo Ira.`,
      ru: `Без вахтангури супра не получается. Наверное, и не может. О, видели бы вы, как пьют из чинчилы...

Я всегда делал упор на человеческих отношениях, и ставка на дружбу всегда была для меня очень высокой. «Свеча и ладан своей дороги не потеряют...» И, как гласит старая пословица, «в святом месте пустоты не бывает...»

Мы вместе строим будущее наших детей, закладывая любовь в основание, как раствор и камень.

Браво, Ира.`,
    },
  },
  {
    post: 13,
    slug: 'fifty-year-old-salkhino',
    order: 28,
    lang: 'ka',
    tags: ['wine'],
    title: {
      ka: 'ორმოცდაათი წლის „სალხინო“',
      en: 'Fifty-year-old Salkhino',
      ru: 'Пятидесятилетнее «Салхино»',
    },
    excerpt: {
      ka: 'ვარციხის სიამაყე, შვიდჯერ ოქროს მედალოსანი. კოლექციაში რამდენიმე ბოთლი შემომრჩა.',
      en: 'The pride of Vartsikhe, seven times a gold medallist. A few bottles are left in my collection.',
      ru: 'Гордость Варцихе, семикратный золотой медалист. В коллекции осталось несколько бутылок.',
    },
    body: {
      en: `We had the honour of tasting, together with my friend, a fifty-year-old fortified wine — Salkhino — seven times a gold medallist at international exhibitions, the pride of Baghdati and, to be more precise, of the village of Vartsikhe. It seems to be a habit of ours, somehow.

Yes, yes. You are not mistaken — a few bottles have stayed with me in the collection.

Aromas beyond words, flowering in the glass.`,
      ru: `Нам выпала честь вместе с моим другом попробовать пятидесятилетнее креплёное вино «Салхино» — семикратного золотого медалиста международных выставок, гордость Багдати и, точнее сказать, села Варцихе. Похоже, у нас это уже вошло в привычку.

Да-да. Вы не ошибаетесь — несколько бутылок у меня в коллекции сохранилось.

Ароматы, не поддающиеся описанию, расцветают в бокале.`,
    },
  },
  {
    post: 37,
    slug: 'freedom-my-first-work-2006',
    order: 29,
    lang: 'ka',
    tags: ['wine'],
    title: {
      ka: '„თავისუფლება“ — ჩემი პირველი ნამუშევარი',
      en: 'Freedom — my first work, 2006',
      ru: '«Свобода» — моя первая работа, 2006',
    },
    excerpt: {
      ka: 'პირველი ნამუშევარი, რომელიც ამაყად ამშვენებს მარნის ისტორიას. 2006 წელი.',
      en: 'The first thing I made, and it still proudly adorns the history of the marani. 2006.',
      ru: 'Первое, что я сделал, и оно до сих пор с гордостью украшает историю марани. 2006 год.',
    },
    body: {
      en: `"Freedom, thou art the haven of peoples..."

My first work, which proudly adorns the history of marani RED ROSE.

2006.`,
      ru: `«Свобода, ты пристанище народов...»

Моя первая работа, которая с гордостью украшает историю марани RED ROSE.

2006 год.`,
    },
  },
  {
    post: 2,
    slug: 'aladasturi-rose-for-the-eighth-of-march',
    order: 30,
    lang: 'ka',
    tags: ['wine'],
    title: {
      ka: 'ალადასტურის როზე — 8 მარტისთვის',
      en: 'Aladasturi rosé, for the eighth of March',
      ru: 'Розе из аладастури — к восьмому марта',
    },
    excerpt: {
      ka: 'ნახევრადმშრალი პეტ-ნატი, საექსპედიციო ლიქიორის დამატებით. ვარდისფერი ბუჩქი — „წითელი ვარდი“ 2025.',
      en: 'A semi-dry pét-nat with a liqueur d’expédition. A pink bush — "Red Rose" 2025.',
      ru: 'Полусухой пет-нат с экспедиционным ликёром. Розовый куст — «Красная роза» 2025.',
    },
    body: {
      en: `Aladasturi rosé, semi-dry. A pét-nat, arrived at by adding a special liqueur d'expédition.

It suited the mood of the eighth of March very well indeed. A pink bush.

"Red Rose" — 2025.`,
      ru: `Розе из аладастури, полусухое. Пет-нат, полученный добавлением особого экспедиционного ликёра.

Настроению восьмого марта подошло как нельзя лучше. Розовый куст.

«Красная роза» — 2025.`,
    },
  },
  {
    post: 22,
    slug: 'everything-on-this-table-is-from-here',
    order: 31,
    lang: 'ka',
    tags: ['family'],
    title: {
      ka: 'ამ მაგიდაზე ყველაფერი აქაურია',
      en: 'Everything on this table is from here',
      ru: 'Всё на этом столе — отсюда',
    },
    excerpt: {
      ka: 'უსასუქო პომიდორი, კეცის ჭადი, საკუთარი ძროხის ჭყინტი ყველი და ცოლიკოურის შხეფიანი ღვინო.',
      en: 'Unfertilised tomatoes, chadi off the ketsi, fresh cheese from our own cow, and spritzy Tsolikouri.',
      ru: 'Помидоры без удобрений, чади с кеци, свежий сыр от своей коровы и игристое цоликоури.',
    },
    body: {
      en: `A Georgian pink one — someone told me it is called khariskula.

Your own tomato, grown without fertiliser, brought to the table. Hot chadi off the clay ketsi. Fresh chkinti cheese, drawn with rennet from the milk of your own cow. Herbs. And a spritzy Tsolikouri wine.

What more could a man wish for?`,
      ru: `Грузинский розовый — кто-то сказал мне, что он называется харискула.

Свой помидор, выращенный без удобрений, принесённый к столу. Горячий чади с глиняного кеци. Свежий сыр чкинти, вытянутый на сычуге из молока собственной коровы. Зелень. И игристое вино цоликоури.

Чего ещё желать человеку?`,
    },
  },
  {
    post: 28,
    slug: 'sardinia-and-the-georgian-table',
    order: 32,
    lang: 'ka',
    tags: ['family'],
    country: ['it'],
    title: {
      ka: 'სარდინია და ქართული სუფრა',
      en: 'Sardinia and the Georgian table',
      ru: 'Сардиния и грузинский стол',
    },
    excerpt: {
      ka: 'იქნებ იმიტომ, რომ ჩემია — ვთვლი, რომ ქართული სუფრა შეუდარებელია.',
      en: 'Perhaps it is only because it is mine — but I think the Georgian supra is beyond compare.',
      ru: 'Может, лишь потому, что оно моё, — но я считаю грузинскую супру несравненной.',
    },
    body: {
      en: `While I was in Italy, on the island of Sardinia, among very good people, my Sardinian friends fed us the local dishes and remarked that the whole of Europe travels to Sardinia for its outstanding cooking.

Of course every country has its own traditional marks in the kitchen. I respect that and I value it. But — perhaps only because it is mine — I hold that the Georgian supra, with its many fragrant, mouth-watering dishes, is beyond compare.

Time will probably pass and they will say of Georgia what they say of Sardinia, if they are not saying it already.

God strengthen the arm and the mind of the Georgian housewife.`,
      ru: `Когда я был в Италии, на острове Сардиния, среди очень хороших людей, сардинские друзья угощали нас местными блюдами и замечали, что вся Европа едет на Сардинию ради её выдающейся кухни.

Конечно, у каждой страны свои традиционные приметы на кухне. Я это уважаю и ценю. Но — возможно, лишь потому, что оно моё, — я считаю, что грузинская супра с её множеством ароматных, слюнки вызывающих блюд несравненна.

Пройдёт, наверное, время, и о Грузии будут говорить то же, что говорят о Сардинии, если уже не говорят.

Да укрепит Господь руку и разум грузинской хозяйки.`,
    },
  },
  {
    post: 14,
    slug: 'bush-bush-bush',
    order: 33,
    lang: 'ka',
    tags: ['guests'],
    title: {
      ka: 'ესეც ბუჩქი',
      en: 'Bush, bush, bush',
      ru: 'Буш, буш, буш',
    },
    excerpt: {
      ka: 'ესეც ბუჩქი... ანუ ინგლისურად — „ბუშ, ბუშ, ბუშ...“',
      en: 'Here is another bunch — or, in English, "bush, bush, bush..."',
      ru: 'И это куст... то есть по-английски — «буш, буш, буш...»',
    },
    body: {
      en: `And here is another bush. Which in English comes out as — "bush, bush, bush..."`,
      ru: `И это куст. Что по-английски звучит как — «буш, буш, буш...»`,
    },
  },
  {
    post: 43,
    slug: 'twenty-years-of-looking-after-soil',
    order: 34,
    lang: 'ka',
    tags: ['vineyard'],
    title: {
      ka: 'ოცი წელი ნიადაგზე ზრუნვა',
      en: 'Twenty years of looking after soil',
      ru: 'Двадцать лет заботы о почве',
    },
    excerpt: {
      ka: 'კოლექტივიზაციის შემდეგ ნიადაგის ბიოაქტიურობა თითქმის ნულს გაუტოლდა. მე და დედა ბუნებამ ერთად ვიზრუნეთ.',
      en: 'After collectivisation the soil’s biological activity was near zero. Mother nature and I looked after it together.',
      ru: 'После коллективизации биологическая активность почвы была почти нулевой. Мы с матерью-природой взялись за неё вместе.',
    },
    body: {
      en: `For a good twenty years now the chief object of my care has been my land — the soil.

In the era of collectivisation, in the time of my youth, I found the biological activity of the soil on my father's and grandfather's plots levelled almost to zero. Degenerate in structure, and with what looked like a hopeless, harvestless prospect ahead of it.

Mother nature and I took care of it together, and here is the result: vines planted only forty days or so ago, and maize raised without mineral fertilisers — "nitrogen-free", as we say in Imeretian.

It gladdens my heart to go down to my plots. A very great deal of practice in reading the symbiosis of plants, the right methods of observation, and innovative ways of solving problems. That is what brought me this far.

"My good country, what have they done to you — if the present does not favour you, the future is yours..."`,
      ru: `Вот уже добрых двадцать лет главный предмет моей заботы — моя земля, почва.

В эпоху коллективизации, во времена моей молодости, я застал биологическую активность почвы на отцовских и дедовских участках сведённой почти к нулю. С выродившейся структурой и, казалось, безнадёжной, бесплодной перспективой.

Мы с матерью-природой позаботились о ней вместе, и вот результат: лоза, посаженная всего дней сорок назад, и кукуруза, выращенная без минеральных удобрений — «безазотная», как говорят по-имеретински.

Мне радостно спускаться на свои участки. Очень большая практика в понимании симбиоза растений, верные методы наблюдения и новаторские способы решения задач. Вот что привело меня сюда.

«Страна моя добрая, до чего же тебя довели, — если настоящее к тебе не благосклонно, будущее твоё...»`,
    },
  },
  {
    post: 3,
    slug: 'mycorrhiza-and-seven-hundred-million-years',
    order: 35,
    lang: 'ka',
    tags: ['vineyard'],
    title: {
      ka: 'მიკორიზა და შვიდასი მილიონი წელი',
      en: 'Mycorrhiza, and seven hundred million years',
      ru: 'Микориза и семьсот миллионов лет',
    },
    excerpt: {
      ka: 'ბევრი მთხოვს, ნიადაგის ბიოაქტიურობაზე ვისაუბრო. ეს პარტნიორობა 700 მილიონი წელია ძალაშია.',
      en: 'Many ask me to talk about soil bioactivity. That partnership has been in force for seven hundred million years.',
      ru: 'Многие просят рассказать о биоактивности почвы. Это партнёрство действует уже семьсот миллионов лет.',
    },
    body: {
      en: `Many people ask me to talk more often about the bioactivity of soil, about the symbiosis that exists in nature between plants. "Mycorrhiza arbuscularum". That is the name of a whole class of underground fungi present in living soil with a high coefficient of bioactivity. They are characterised by forming unique mycosymbiotic relationships with highly developed plant species.

Let me say at the very outset that about 700 million years ago the plant forms of life existed only in water, and the first step onto the soilless barrens of the earth was taken by fungi. Then, out of the symbiosis between them and the green cyanobacteria, plant forms — first primitive, then bearing impressive crowns — conquered the earth. And this would have been impossible without those most ancient mycorrhizal fungi. Their mycelia wrapped themselves around the cyanobacteria like a thick net and protected them from drying out; the fungus broke down mineral rock and supplied the primitive plant with phosphorus and nitrogen compounds in dissolved form, along with a great many micro-elements. In exchange the cyanobacterium supplied its strange partner with glucose — a critically necessary source of energy for a fungus.

And this profitable bargain grew so strong that over millions of years they created soils; a thousand kinds of soil. And the plant forms, undergoing evolutionary change, became ever stronger and more various.

So many millions of years have passed, and this partnership is still in force. In our forests, in the meadows, on the cliffs and in the vineyards, millions of mycorrhiza are still weaving their mycelia through the soil and giving the strength of life to a great many plants. Among them, to our vine.

And what should we bear in mind in order to help these micro-organisms develop?

1. Mycorrhizal fungi do not like ultraviolet rays.
2. They do not like fungicides — these should be used in the most optimal doses possible and with no waste — nor mineral fertilisers, whose use can weaken them badly.
3. Herbicides must not be used, because they lead to total destruction.
4. They take comparatively less pleasure in a dry, oxygen-poor environment.

If we observe these principles more or less, we will have living soil in our vineyard, with good structure, a porous mass of high-class granulometric composition, and a hardened vine with high immunity. The fungus itself will hold pathogenic fungi and nematodes in a state of suspension. And the enormous network of mycelia will hinder the erosion and washing away of the soil that happens under frequent rainfall.

Health to you, to your vine, and to the land that feeds us.`,
      ru: `Многие просят меня чаще говорить о биоактивности почвы, о том симбиозе, который существует в природе между растениями. «Mycorrhiza arbuscularum». Так называется целый класс подземных грибов, присутствующих в живой почве с высоким коэффициентом биоактивности. Они отличаются тем, что образуют уникальные микосимбиотические связи с высокоразвитыми видами растений.

Скажу с самого начала: около 700 миллионов лет назад растительные формы жизни существовали только в воде, и первый шаг на лишённые почвы пустоши земли сделали грибы. Затем из симбиоза между ними и зелёными цианобактериями растительные формы — сперва примитивные, а потом и с внушительными кронами — завоевали землю. И это было бы невозможно без тех древнейших микоризных грибов. Их мицелии оплетали цианобактерии, будто густая сеть, и защищали их от высыхания; гриб разрушал минеральные породы и поставлял примитивному растению фосфорные и азотные соединения в растворённом виде вместе с множеством микроэлементов. Взамен цианобактерия давала своему странному партнёру глюкозу — критически необходимый грибу источник энергии.

И эта выгодная сделка настолько окрепла, что за миллионы лет они создали почвы; тысячу видов почв. А растительные формы, переживая эволюционные изменения, становились всё сильнее и разнообразнее.

Прошло столько миллионов лет, а это партнёрство всё ещё в силе. В наших лесах, на лугах, на скалах и в виноградниках всё так же миллионы микориз сплетают в почве свои мицелии и дают силу жизни множеству растений. В том числе нашей лозе.

А что нам следует учитывать, чтобы помочь этим микроорганизмам развиваться?

1. Микоризные грибы не любят ультрафиолетовых лучей.
2. Они не любят фунгициды — их надо применять в максимально оптимальных дозах и без потерь — и минеральные удобрения, применение которых способно сильно их ослабить.
3. Гербициды применять нельзя, потому что они доводят до полного уничтожения.
4. Им сравнительно меньше нравится сухая, бедная кислородом среда.

Если мы будем более или менее соблюдать эти принципы, у нас в винограднике будет живая почва с хорошей структурой, пористой массой высокого гранулометрического состава, и закалённая лоза с высоким иммунитетом. Сам гриб будет держать патогенные грибы и нематод в состоянии анабиоза. А огромная сеть мицелиев помешает эрозии и смыву почвы, которые случаются при частых осадках.

Здоровья вам, вашей лозе и нашей кормилице-земле.`,
    },
  },
  {
    post: 1,
    slug: 'mushrooms-under-the-krakhuna',
    order: 36,
    lang: 'ka',
    tags: ['vineyard'],
    title: {
      ka: 'სოკო კრახუნას ძირში',
      en: 'Mushrooms under the Krakhuna',
      ru: 'Грибы под крахуной',
    },
    excerpt: {
      ka: 'ზეით ყურძენი, ქვეით კიდო სოკო. ეს ჩემი ექსპერიმენტული ნაკვეთია.',
      en: 'Grapes above, mushrooms below. This is my experimental plot.',
      ru: 'Сверху виноград, снизу грибы. Это мой экспериментальный участок.',
    },
    body: {
      en: `I did tell you, didn't I, I did tell you.

This is my experimental plot — a parasol mushroom at the foot of a Krakhuna vine. When you use fungicides in the vineyard (preparations against fungal disease) and they end up gathering in the soil, then if their quantity goes beyond every biodynamic limit that exists in nature, you can rule out the existence of such beautiful creations of life in a vineyard like that.

This is not the first case this year. It has grown big enough to fill a frying pan, and I shall have a good supper with the family this evening.

Grapes above, and mushrooms below. How about that.`,
      ru: `Я же вам говорил, говорил же.

Это мой экспериментальный участок — гриб-зонтик у подножия лозы крахуны. Когда в винограднике применяют фунгициды (препараты против грибковых болезней) и они в итоге скапливаются в почве, то, если их количество выходит за всякий существующий в природе биодинамический предел, о таких прекрасных творениях жизни в подобном винограднике можно забыть.

В этом году это не первый случай. Вырос он такой, что хватит на целую сковороду, и вечером у нас будет хороший семейный ужин.

Сверху виноград, снизу грибы. Каково?`,
    },
  },
  {
    post: 42,
    slug: 'the-aleksandrouli-coloured-early',
    order: 37,
    lang: 'ka',
    tags: ['vineyard'],
    title: {
      ka: 'ალექსანდროული ადრე შეიფერა',
      en: 'The Aleksandrouli coloured early',
      ru: 'Александроули окрасилось рано',
    },
    excerpt: {
      ka: 'გაუგონრად ადრე, 10 ივლისიდან, მარცვლის შეფერადება დაიწყო. გაიხარეს ჩიტუნებმაც.',
      en: 'Unheard-of early — the berries began colouring on the tenth of July. The little birds were pleased too.',
      ru: 'Неслыханно рано — ягода начала окрашиваться с десятого июля. Птахи тоже обрадовались.',
    },
    body: {
      en: `The extreme change in the climate has handed us one more surprising reality — my Aleksandrouli began colouring its berries unheard-of early, from the tenth of July.

The little birds were pleased as well. But Celentano and I can settle matters with them in exactly the same way. "In short, Simon..."

"Sure — then listen: a couple of kilometres beyond the river there is a beautiful piece of uncultivated land that was abandoned by the people who went off to the city, about two hectares, maybe more, where you and your black friends can find everything you want, clear? Go!"

In short: a kilometre away, he says, there is a lazy man's vineyard, he says; the man is half in the city, he says, and does not tend it; hybrid vines mostly planted there, he says. So off you go there, instead of eating this Aleksandrouli of mine that is like my own sunshine.

And off they went.`,
      ru: `Экстремальное изменение климата подарило нам ещё одну удивительную реальность — моё александроули начало окрашивать ягоду неслыханно рано, с десятого июля.

Птахи тоже обрадовались. Но мы с Челентано умеем решать с ними дела совершенно одинаково. «Короче, Симон...»

«Конечно — тогда слушай: в паре километров за рекой есть прекрасный невозделанный участок, брошенный теми, кто уехал в город, гектара два, а может, и больше, где ты и твои чёрные друзья найдёте всё, что захотите, ясно? Отправляйтесь!»

Короче: в километре, говорит, есть виноградник одного ленивого человека, говорит; сам он наполовину в городе, говорит, и за ним не следит; посажены там в основном гибридные лозы, говорит. Вот туда и ступайте, вместо того чтобы есть моё александроули, которое мне как собственное солнце.

И отправились.`,
    },
  },
  {
    post: 34,
    slug: 'our-swallows-serve-the-guests',
    order: 38,
    lang: 'ka',
    tags: ['family'],
    title: {
      ka: 'ჩვენი მერცხლები სტუმრებს ემსახურებიან',
      en: 'Our swallows serve the guests',
      ru: 'Наши ласточки обслуживают гостей',
    },
    excerpt: {
      ka: 'ეს ჩვენი მომავალია — უპრეტენზიო, იმედითა და სიყვარულით სავსე.',
      en: 'This is our future — unassuming, and full of hope and love.',
      ru: 'Это наше будущее — непритязательное, полное надежды и любви.',
    },
    body: {
      en: `This is our future. Unassuming, and full of hope and love.

Our swallows serve the guests in cook's aprons. Our future.`,
      ru: `Это наше будущее. Непритязательное, полное надежды и любви.

Наши ласточки обслуживают гостей в поварских фартуках. Наше будущее.`,
    },
  },
  {
    post: 33,
    slug: 'ninichkas-work',
    order: 39,
    lang: 'ka',
    tags: ['family'],
    title: {
      ka: 'ნინიჩკას ნამუშევარი',
      en: "Ninichka's work",
      ru: 'Работа Нинички',
    },
    excerpt: {
      ka: 'მის გემოვნებას დავეყრდენით ყველა. მგონი, ლამაზი გამოვიდა.',
      en: 'We all relied on her taste. I think it came out beautiful.',
      ru: 'Мы все положились на её вкус. По-моему, вышло красиво.',
    },
    body: {
      en: `Ah, how is it? This is Ninichka's creation — we all relied on her taste.

I think it came out beautiful.`,
      ru: `Ну как? Это творение Ниничкы — мы все положились на её вкус.

По-моему, вышло красиво.`,
    },
  },
  {
    post: 36,
    slug: 'a-rare-range-of-colour',
    order: 40,
    lang: 'ka',
    tags: ['family'],
    title: {
      ka: 'ფერთა იშვიათი გამა',
      en: 'A rare range of colour',
      ru: 'Редкая гамма цветов',
    },
    excerpt: {
      ka: 'ფოტოხელოვნების ნიმუში. მართლა ძაან ლამაზი კადრია და აქ დარჩეს მინდა.',
      en: 'A specimen of photographic art. A really beautiful frame, and I want it to stay here.',
      ru: 'Образец фотоискусства. По-настоящему красивый кадр, и я хочу, чтобы он остался здесь.',
    },
    body: {
      en: `A specimen of photographic art. A rare range of colour.

It really is a very beautiful frame, and I want it to stay here.`,
      ru: `Образец фотоискусства. Редкая гамма цветов.

Кадр и вправду очень красивый, и я хочу, чтобы он остался здесь.`,
    },
  },
  {
    post: 35,
    slug: 'the-power-went-off',
    order: 41,
    lang: 'ka',
    tags: ['family'],
    title: {
      ka: 'გამეირთო დენი',
      en: 'The power went off',
      ru: 'Отключили свет',
    },
    excerpt: {
      ka: '„უუხ უზბეკია...“ გამახსენა ძველი ხუმრობა ჩემმა კაი ბაღდათელმა კაცმა.',
      en: '"Ooh, Uzbekia..." A good Baghdati man reminded me of the old joke.',
      ru: '«Ух, Узбекия...» Один хороший багдатец напомнил мне старую шутку.',
    },
    body: {
      en: `Here I am, sitting in the middle of a good time, with good people, and — the power went off.

"Ooh, Uzbekia..." A good Baghdati man of mine reminded me of the old joke. What, he says, Uzbekia? At our place too, he says, over there in Poznań, the head of the networks is some "Uzbek" — he cuts our power off just as often.

Ah, this is the one they say it about: the earth is round.`,
      ru: `Сижу я себе посреди хорошего застолья, с хорошими людьми, и — отключили свет.

«Ух, Узбекия...» Один мой хороший багдатец напомнил мне старую шутку. Что, говорит, Узбекия? И у нас, говорит, там, в Познани, начальник сетей — некий «узбек»; он нам тоже свет отключает не реже.

А, вот про это и говорят: земля круглая.`,
    },
  },
  {
    post: 10,
    slug: 'independence-day',
    order: 42,
    lang: 'ka',
    tags: ['feast'],
    title: {
      ka: 'დამოუკიდებლობის დღე',
      en: 'Independence Day',
      ru: 'День независимости',
    },
    excerpt: {
      ka: 'მარანი RED ROSE გილოცავთ დამოუკიდებლობის დღეს. გილოცავ, ჩემო საქართველო.',
      en: 'Marani RED ROSE wishes you a happy Independence Day. Congratulations, my Georgia.',
      ru: 'Марани RED ROSE поздравляет вас с Днём независимости. Поздравляю, моя Грузия.',
    },
    body: {
      en: `Marani RED ROSE wishes you a happy Independence Day.

Congratulations, my Georgia.`,
      ru: `Марани RED ROSE поздравляет вас с Днём независимости.

Поздравляю, моя Грузия.`,
    },
  },
  {
    post: 15,
    slug: 'the-new-year-will-come-anyway',
    order: 43,
    lang: 'ka',
    tags: ['feast', 'family'],
    title: {
      ka: 'ახალი წელი მაინც მოვა',
      en: 'The New Year will come anyway',
      ru: 'Новый год всё равно придёт',
    },
    excerpt: {
      ka: 'დაძაბული მდგომარეობის მიუხედავად პატარები მაინც მხიარულობენ და ახალ წელს ელიან.',
      en: 'In spite of everything, the little ones are cheerful and waiting for the New Year.',
      ru: 'Несмотря ни на что, малыши веселятся и ждут Нового года.',
    },
    body: {
      en: `Despite the tense political situation in the country, the little ones are cheerful all the same; they are waiting for the New Year.

And the New Year will come anyway. It will come in spite of everything happening around us. It will come with new things, with new strength and energy.`,
      ru: `Несмотря на напряжённую политическую обстановку в стране, малыши всё равно веселятся; они ждут Нового года.

И Новый год всё равно придёт. Придёт, несмотря на всё, что творится вокруг нас. Придёт с новостями, с новыми силами и энергией.`,
    },
  },
];
