export const translations = {
  en: {
    hero: {
      eyebrow: "Privacy-first automation",
      headline: "Stop wasting 5 hours a week cleaning bank CSVs.",
      subcopy: "Zeno normalises bank statements without pushing data to third-party clouds. Built for European compliance.",
      ctaLabel: "Join private beta",
      privacyNote: "Data processed locally. We'll reply within 24 hours.",
      perWeekSavings: "3–5 hours back every week",
    },
    founderCta: {
      eyebrow: "Founder's Circle", 
      headline: "20 early slots with concierge onboarding",
      subcopy: "Help us prioritise banking integrations, get white-glove setup, and influence our next features.",
      ctaLabel: "Request access",
      privacyNote: "No spam. We follow up manually within a day.",
      slotsRemaining: "12 of 20 founder seats left",
      conciergeDetails: "Includes tailored setup call, migration help, and roadmap votes.",
    },
    privacy: {
      title: "Your data never leaves your computer",
      badge: "Designed for EU compliance",
      pillars: {
        zeroStorage: {
          title: "Zero data storage",
          description: "We never replicate your ledgers to the cloud—everything lives on your machine.",
        },
        localProcessing: {
          title: "100% local processing",
          description: "All parsing happens in a secure desktop runtime optimised for banking formats.",
        },
        noTracking: {
          title: "No tracking",
          description: "No scripts, pixels, or third-party cookies. You decide what's shared.",
        },
      },
    },
    roadmap: {
      eyebrow: "BUILD ROADMAP",
      title: "Shipping weekly with your feedback",
      subtitle: "Have a feature request? Add it in the form below.",
      currentTitle: "In the demo today",
      upcomingTitle: "Coming soon",
      current: [
        { label: "CSV upload", description: "Drop Hellenic, BoC, Alpha exports and normalise columns instantly." },
        { label: "Instant preview", description: "Review cleaned rows with filters before exporting." },
        { label: "Secure exports", description: "Generate audit-ready CSV or XLSX locally." },
      ],
      upcoming: [
        { label: "Invoice parsing", description: "Match statements to invoices for faster reconciliations." },
        { label: "VAT handling", description: "Automate Cyprus VAT tags per transaction." },
        { label: "PDF support", description: "Bring in scanned statements with OCR pipeline." },
      ],
    },
  },
  ru: {
    hero: {
      eyebrow: "Автоматизация с приватностью",
      headline: "Перестаньте тратить 5 часов в неделю на очистку банковских CSV.",
      subcopy: "Zeno нормализует банковские выписки без передачи данных в сторонние облака. Создано для европейского соответствия.",
      ctaLabel: "Присоединиться к бета-тесту",
      privacyNote: "Данные обрабатываются локально. Ответим в течение 24 часов.",
      perWeekSavings: "3–5 часов экономии каждую неделю",
    },
    founderCta: {
      eyebrow: "Круг основателей",
      headline: "20 ранних мест с персональной настройкой", 
      subcopy: "Помогите нам приоритизировать банковские интеграции, получите индивидуальную настройку и влияйте на новые функции.",
      ctaLabel: "Запросить доступ",
      privacyNote: "Никакого спама. Отвечаем вручную в течение дня.",
      slotsRemaining: "Осталось 12 из 20 мест основателей",
      conciergeDetails: "Включает персональный звонок настройки, помощь с миграцией и голосование по дорожной карте.",
    },
    privacy: {
      title: "Ваши данные никогда не покидают ваш компьютер",
      badge: "Разработано для соответствия ЕС",
      pillars: {
        zeroStorage: {
          title: "Нулевое хранение данных",
          description: "Мы никогда не копируем ваши реестры в облако—всё остается на вашей машине.",
        },
        localProcessing: {
          title: "100% локальная обработка",
          description: "Вся обработка происходит в безопасной среде, оптимизированной для банковских форматов.",
        },
        noTracking: {
          title: "Никакого отслеживания",
          description: "Никаких скриптов, пикселей или сторонних куки. Вы решаете, чем делиться.",
        },
      },
    },
    roadmap: {
      eyebrow: "ДОРОЖНАЯ КАРТА",
      title: "Выпускаем еженедельно с вашими отзывами",
      subtitle: "Есть запрос на функцию? Добавьте его в форму ниже.",
      currentTitle: "В демо сегодня",
      upcomingTitle: "Скоро",
      current: [
        { label: "Загрузка CSV", description: "Загружайте выписки Hellenic, BoC, Alpha и нормализуйте колонки мгновенно." },
        { label: "Мгновенный просмотр", description: "Просматривайте очищенные строки с фильтрами перед экспортом." },
        { label: "Безопасный экспорт", description: "Генерируйте готовые для аудита CSV или XLSX локально." },
      ],
      upcoming: [
        { label: "Парсинг счетов", description: "Сопоставляйте выписки со счетами для быстрой сверки." },
        { label: "Обработка НДС", description: "Автоматизируйте теги НДС для каждой транзакции." },
        { label: "Поддержка PDF", description: "Загружайте отсканированные выписки с OCR обработкой." },
      ],
    },
  },
};
