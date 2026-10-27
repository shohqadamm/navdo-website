// Barcha matnlar Navdo biznes brifiga (21.10.2026) asoslangan.
import type { IconName } from '../components/ui/Icon3D'

// Brifda yo'q fakt qo'shmang. "TODO" belgilari — keyin to'ldiriladigan joylar.

export const contacts = {
  phoneDisplay: '+998 87 146 57 57',
  phoneHref: 'tel:+998871465757',
  instagram: { label: '@navdo.uz', href: 'https://instagram.com/navdo.uz' },
  telegram: { label: '@navdo_uz', href: 'https://t.me/navdo_uz' },
  site: 'navdo.uz',
  region: 'Samarqand viloyati',
}

export const nav = [
  { id: 'muammo', label: 'Muammo' },
  { id: 'yechim', label: 'Yechim' },
  { id: 'jarayon', label: 'Jarayon' },
  { id: 'paketlar', label: 'Paketlar' },
  { id: 'natijalar', label: 'Natijalar' },
  { id: 'savollar', label: 'Savollar' },
]

export const problems = [
  {
    icon: 'chart-down' as IconName,

    title: 'Bozor va ulgurji savdo pasaydi',
    text: 'Eski mijozlar kamroq olmoqda, yangi sotuv kanali kerak — lekin qaysi biri ishlashini bilmaysiz.',
  },
  {
    icon: 'package' as IconName,

    title: 'Ombor to‘lib qolgan',
    text: 'Tovar aylanmayapti. Ishlab chiqarilgan mahsulot pulga emas, yukga aylanmoqda.',
  },
  {
    icon: 'eyes' as IconName,

    title: 'Raqobatchi allaqachon Uzumda',
    text: 'Siz o‘xshash tovar ishlab chiqarasiz, lekin butun O‘zbekiston bo‘ylab xaridorni u olmoqda.',
  },
  {
    icon: 'store' as IconName,

    title: 'Do‘kon ochdik — sotilmadi',
    text: 'Uzumda do‘kon bor, kartochkalar yuklangan, ammo buyurtmalar deyarli yo‘q.',
  },
  {
    icon: 'briefcase' as IconName,

    title: 'Xodim yolladik — natija yo‘q',
    text: 'Marketpleysni “tushunadigan” odam topildi, maosh to‘landi, lekin savdo o‘smadi.',
  },
  {
    icon: 'money-wings' as IconName,

    title: 'Filial ochish qimmat',
    text: 'Butun O‘zbekistonga sotish istagi bor, ammo har viloyatda do‘kon va xodim ushlash qimmatga tushadi.',
  },
]

export const losses = [
  {
    icon: 'ice' as IconName,

    title: 'Ombordagi tovar — muzlab qolgan pul',
    text: 'Har bir sotilmagan partiya aylanma mablag‘ni band qiladi va yangi ishlab chiqarishni sekinlashtiradi.',
  },
  {
    icon: 'cart' as IconName,

    title: 'Xaridor raqobatchiga ketmoqda',
    text: 'Uzumda sizning toifangizdagi tovarni qidirgan odam boshqa sotuvchidan xarid qiladi. Bu sharh va reyting unga qoladi.',
  },
  {
    icon: 'hourglass' as IconName,

    title: 'Sinov va xatolar uchun vaqt',
    text: 'Hujjatlar, kartochka, foto, narx, reklama va logistikani mustaqil o‘rganish oylarni oladi — xatolar esa pulni.',
  },
  {
    icon: 'receipt' as IconName,

    title: 'Komissiya hisobsiz narx — foydasiz savdo',
    text: 'Uzum komissiyasi va logistika narxga to‘g‘ri kiritilmasa, sotuv bo‘ladi, lekin foyda qolmaydi.',
  },
]

export const solutionItems = [
  'Toifa tahlili va assortiment',
  'Narx strategiyasi (komissiya va logistika bilan)',
  'Hujjatlar va do‘kon ochish',
  'Sexda fotosessiya va infografika',
  'To‘liq to‘ldirilgan kartochkalar',
  'Uzum ichki reklamasi',
  'Zaxira, sharhlar va FBO/FBS logistika',
  'Oylik hisobot',
]

export const advantages = [
  {
    icon: 'puzzle' as IconName,

    title: 'Hammasi bir joyda',
    text: 'Do‘kon ochishdan reklamagacha. Korxona faqat tovar beradi.',
  },
  {
    icon: 'card-index' as IconName,

    title: 'Har bir kartochka to‘liq',
    text: 'Barcha maydonlar to‘ldiriladi, mahsulot infografika bilan chiqadi.',
  },
  {
    icon: 'money-bag' as IconName,

    title: 'Foyda yo‘qolmaydigan narx',
    text: 'Narx Uzum komissiyasi va logistikani hisobga olib qo‘yiladi.',
  },
  {
    icon: 'magnifier' as IconName,

    title: 'Shaffof hisob',
    text: '“Sof foyda” formulasi va tannarx shartnomada oldindan yoziladi.',
  },
]

export const steps = [
  {
    icon: 'handshake' as IconName,

    when: '1-kun',
    title: 'Shartnoma',
    text: 'Shartnoma imzolanadi va oldindan to‘lov qilinadi. “Sof foyda” formulasi, tannarx va maxfiylik shartlari shu yerda yoziladi.',
    output: 'Imzolangan shartnoma',
  },
  {
    icon: 'bar-chart' as IconName,

    when: '1-hafta',
    title: 'Toifa tahlili va narx strategiyasi',
    text: 'Toifangizdagi raqobatni o‘rganamiz, qaysi tovarlardan boshlashni tanlaymiz va komissiya hamda logistikani hisobga olgan narx siyosatini tuzamiz.',
    output: 'Assortiment va narx rejasi',
  },
  {
    icon: 'department-store' as IconName,

    when: '1–2-hafta',
    title: 'Hujjatlar va do‘kon ochish',
    text: 'Hujjatlaringizni tekshiramiz va Uzum Market’da do‘konni korxonangiz nomiga ochamiz.',
    output: 'Korxona nomidagi do‘kon',
  },
  {
    icon: 'camera' as IconName,

    when: '2–3-hafta',
    title: 'Sexda fotosessiya va infografika',
    text: 'Sexingizga kelamiz, tovarni joyida ko‘ramiz va suratga olamiz. Har bir mahsulot uchun infografika tayyorlanadi.',
    output: 'Foto va infografika',
  },
  {
    icon: 'check' as IconName,

    when: '3-hafta',
    title: 'Kartochkalar va moderatsiya',
    text: 'To‘liq to‘ldirilgan kartochkalarni yuklaymiz va Uzum moderatsiyasidan o‘tkazamiz.',
    output: 'Faol kartochkalar',
  },
  {
    icon: 'truck' as IconName,

    when: '3–4-hafta',
    title: 'Ombor va reklama',
    text: 'Birinchi partiya Uzum omboriga topshiriladi va ichki reklama ishga tushiriladi.',
    output: 'Birinchi sotuvlar',
  },
  {
    icon: 'chart-up' as IconName,

    when: 'Keyin',
    title: 'Savdoni yuritish',
    text: 'Start: 1 oy savdoni yuritamiz va xodimingizni o‘qitamiz, keyin 1 oy bepul konsultatsiya. Kalit topshirish: doimiy boshqaruv va har oyning 5-sanasigacha hisobot.',
    output: 'Barqaror boshqaruv',
  },
]

export type PackageId = 'start' | 'kalit'

export const packages: {
  id: PackageId
  name: string
  tagline: string
  forWhom: string
  highlights: string[]
  after: string
}[] = [
  {
    id: 'start',
    name: 'Start',
    tagline: 'Do‘konni yo‘lga qo‘yamiz va sizga topshiramiz',
    forWhom: 'Do‘konni keyinchalik o‘z xodimi bilan yuritmoqchi bo‘lgan korxonalar uchun.',
    highlights: [
      'Do‘kon ochish',
      'Kartochkalar: foto, infografika, to‘liq to‘ldirish',
      '1 oy savdoni biz yuritamiz',
      'Korxona xodimini o‘qitamiz',
      'Keyin 1 oy bepul konsultatsiya',
    ],
    after: 'Shundan so‘ng do‘konni korxona o‘zi yuritadi.',
  },
  {
    id: 'kalit',
    name: 'Kalit topshirish',
    tagline: 'Do‘konni doimiy ravishda to‘liq biz boshqaramiz',
    forWhom: 'Marketpleys bilan o‘zi shug‘ullanishni istamaydigan korxonalar uchun.',
    highlights: [
      'Do‘kon ochish va kartochkalar',
      'Reklama, narx va zaxira nazorati',
      'Sharhlar bilan ishlash',
      'Har oyning 5-sanasigacha hisobot',
      'Daromadimiz sizning foydangizga bog‘liq',
    ],
    after: 'Siz tovar ishlab chiqarasiz, savdo bilan jamoamiz shug‘ullanadi.',
  },
]

export type Cell = boolean | string

export const comparison: { row: string; start: Cell; kalit: Cell }[] = [
  { row: 'Do‘kon ochish (korxona nomiga)', start: true, kalit: true },
  { row: 'Toifa tahlili va narx strategiyasi', start: true, kalit: true },
  { row: 'Sexda foto va infografika', start: true, kalit: true },
  { row: 'Kartochkalarni to‘liq to‘ldirish', start: true, kalit: true },
  { row: 'Savdoni yuritish', start: '1 oy', kalit: 'Doimiy' },
  { row: 'Uzum ichki reklamasi', start: '1 oy', kalit: 'Doimiy' },
  { row: 'Zaxira va sharhlar nazorati', start: '1 oy', kalit: 'Doimiy' },
  { row: 'Korxona xodimini o‘qitish', start: true, kalit: false },
  { row: 'Bepul konsultatsiya', start: '1 oy', kalit: false },
  { row: 'Oylik hisobot', start: false, kalit: 'Har oy 5-sanagacha' },
  { row: 'Do‘kon va kartochkalar korxonaniki', start: true, kalit: true },
]

export const results = [
  {
    value: '10×',
    label: 'oylik savdo o‘sishi',
    detail: 'Jamoamiz boshqargan bitta do‘kon: taxminan 40 mln so‘mdan 400 mln so‘mgacha.',
  },
  {
    value: '7 600+',
    label: 'sotuv oyiga',
    detail: 'Jamoa a’zolarining eng katta loyihasida.',
  },
  {
    value: '2+ yil',
    label: 'Uzumda tajriba',
    detail: 'Jamoaning har bir a’zosi Uzum Market’da 2 yildan ortiq savdo qilgan.',
  },
  {
    value: '4',
    label: 'kishilik jamoa',
    detail: 'Do‘kon, kartochka, foto, narx, reklama va logistika bo‘yicha mutaxassislar.',
  },
]

export const guarantees = [
  'Kelishilgan muddatlarda ish',
  'Har oylik shaffof hisobot',
  'Tannarx va savdo ma’lumotlarining maxfiyligi',
  'Do‘kon va kartochkalar doim korxonaniki bo‘lib qoladi',
  'Bir sohada faqat siz bilan ishlash',
]

export const objections = [
  {
    q: '“Qimmat”',
    a: 'Narxni o‘z xarajatimizdan kelib chiqib qo‘yganmiz. Ko‘p agentliklar barcha xarajatni korxonaga yuklab, foydani 50/50 bo‘lishadi. Bundan tashqari, qaror qilishdan oldin bepul auditda tovaringiz qancha foyda qoldirishi mumkinligini hisoblab beramiz — xizmat o‘zini oqlaydimi, raqamlarda ko‘rasiz.',
  },
  {
    q: '“O‘zimiz qila olamiz”',
    a: 'Albatta, bu mumkin. Lekin hujjatlar, kartochka, foto, infografika, komissiyani hisobga olgan narx, ichki reklama va FBO/FBS logistikani noldan o‘rganish vaqt va xatolar talab qiladi. Jamoamiz har birida 2 yildan ortiq tajriba bor. Agar keyin o‘zingiz yuritmoqchi bo‘lsangiz — Start paketida xodimingizni o‘qitamiz.',
  },
  {
    q: '“Uzum komissiyasi katta, foyda qolmaydi”',
    a: 'Foyda komissiya tufayli emas, noto‘g‘ri narx tufayli yo‘qoladi. Biz narxni Uzum komissiyasi va logistikani hisobga olib qo‘yamiz. Auditda aynan sizning tovaringiz bo‘yicha sof foydani oldindan hisoblab beramiz.',
  },
  {
    q: '“Bizning tovar internetda sotilmaydi”',
    a: 'Buni taxmin emas, raqamlar hal qiladi. Auditda tovaringizning Uzum’da sotilish imkoniyatini tekshiramiz. Asosiy yo‘nalishimiz — oziq-ovqat bo‘lmagan, uzoq saqlanadigan tovarlar: tekstil, kiyim, kosmetika, maishiy kimyo.',
  },
  {
    q: '“Sizga qanday ishonaman?”',
    a: 'Ish shartnoma asosida boshlanadi: muddatlar, “sof foyda” formulasi va tannarx oldindan yoziladi. Do‘kon har doim korxona nomida qoladi. Biz Samarqanddamiz — sexingizga kelamiz, tovarni joyida ko‘ramiz. Har oy shaffof hisobot olasiz.',
  },
  {
    q: '“Natijani kafolatlaysizmi?”',
    a: 'Savdo hajmini kafolatlamaymiz — buni hech kim halol kafolatlay olmaydi. Kafolatlaymiz: kelishilgan muddatlarda ish, har oylik shaffof hisobot, ma’lumotlaringiz maxfiyligi, do‘konning sizniki bo‘lib qolishi va bir sohada faqat siz bilan ishlash.',
  },
  {
    q: '“Tannarx va raqamlarimizni ko‘rsatgim kelmaydi”',
    a: 'Tannarx va savdo ma’lumotlarining maxfiyligi shartnomada yoziladi. Bundan tashqari, bir sohada faqat bitta korxona bilan ishlaymiz — raqobatchingiz do‘konini boshqarmaymiz.',
  },
]

export const salesChannels = [
  'Bozor yoki ulgurji savdo',
  'O‘z do‘konim / showroom',
  'Uzum Market’da sotyapman',
  'Instagram / Telegram',
  'Hozircha sotuv kanali yo‘q',
  'Boshqa',
]

export const faq = [
  {
    q: 'Qaysi hududlarda ishlaysiz?',
    a: 'Hozircha faqat Samarqand viloyatidagi korxonalar bilan ishlaymiz. Jamoamiz shu yerda — sexingizga kelib, tovarni joyida ko‘ramiz va suratga olamiz.',
  },
  {
    q: 'Qanday tovarlar bilan ishlaysiz?',
    a: 'Asosan oziq-ovqat bo‘lmagan, uzoq saqlanadigan tovarlar: tekstil, kiyim, kosmetika, maishiy kimyo. Oziq-ovqat bilan ishlamaymiz, istisno holatlar alohida ko‘rib chiqiladi.',
  },
  {
    q: 'Tovarimni sotib olib, qayta sotasizmi?',
    a: 'Yo‘q. Tovar sizniki bo‘lib qoladi, do‘kon korxonangiz nomiga ochiladi. Biz savdoni yo‘lga qo‘yish va boshqarish xizmatini ko‘rsatamiz.',
  },
  {
    q: 'Birinchi sotuvlar qachon boshlanadi?',
    a: 'Ish rejasiga ko‘ra birinchi partiya omborga topshirilib, reklama 3–4-haftada ishga tushadi. Aniq muddatlar shartnomada kelishiladi.',
  },
  {
    q: 'Xizmat narxi qancha?',
    a: 'Narx tovarlar soni, kartochkalar, variantlar va tanlangan paketga bog‘liq. Bepul auditdan keyin aniq hisob-kitob bilan yozma taklif beramiz.',
  },
  {
    q: 'Uzumda do‘konim bor, lekin sotilmayapti. Yordam berasizmi?',
    a: 'Ha, bu bizning ikkinchi asosiy auditoriyamiz. Auditda mavjud do‘koningiz va tovarlaringizni ko‘rib chiqamiz va qaysi yo‘l mosligini aytamiz.',
  },
  {
    q: 'Raqobatchimiz bilan ham ishlaysizmi?',
    a: 'Yo‘q. Bir sohada faqat bitta korxona bilan ishlaymiz.',
  },
  {
    q: 'Boshqa marketpleyslarga ham chiqarasizmi?',
    a: 'Hozir asosiy yo‘nalish — Uzum Market. Kelajakda Yandex Market, Ozon, Wildberries va Amazon’ga ham chiqarishni rejalashtirganmiz.',
  },
]
