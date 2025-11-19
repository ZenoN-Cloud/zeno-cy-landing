# PageSpeed Optimization Fixes

## Основные проблемы и решения

### 1. Largest Contentful Paint (LCP)

**Проблема:** Медленная загрузка главного контента

**Решения:**
- ✅ Font preload и font-display: swap
- ✅ Lazy loading некритичных компонентов
- ✅ Уменьшение blur effects на мобилках
- ⚠️ Нужно: Brotli compression в CloudFront
- ⚠️ Нужно: Preload критичных ресурсов

### 2. Total Blocking Time (TBT)

**Проблема:** Большой JavaScript bundle блокирует рендеринг

**Решения:**
- ✅ Code splitting (dynamic imports)
- ✅ Оптимизация импортов (lucide-react, framer-motion)
- ⚠️ Нужно: Уменьшить framer-motion bundle (320KB)

### 3. Cumulative Layout Shift (CLS)

**Проблема:** Элементы прыгают при загрузке

**Решения:**
- ✅ Width/height для изображений
- ⚠️ Нужно: Зарезервировать место для видео
- ⚠️ Нужно: Skeleton loaders для lazy компонентов

### 4. First Contentful Paint (FCP)

**Проблема:** Долгая загрузка первого контента

**Решения:**
- ✅ Preconnect к Google Fonts
- ✅ Уменьшение количества font weights
- ⚠️ Нужно: Inline critical CSS

## Критичные фиксы для CloudFront

### Enable Brotli (ОБЯЗАТЕЛЬНО!)

```
CloudFront Console → Distributions → Your Distribution
→ Behaviors → Edit Default (*)
→ Cache Policy → Create new policy:

Name: ZenoCY-Optimized
Compression: Gzip ✅ + Brotli ✅
TTL: Min=0, Max=31536000, Default=86400
```

**Результат:** -20-30% размера файлов

### Add Security Headers

```
Response Headers Policy → Create:

Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
```

**Результат:** +5 баллов к Security score

### Enable HTTP/3

```
Distribution Settings → General
Supported HTTP versions: HTTP/2 ✅, HTTP/3 ✅
```

**Результат:** Быстрее на медленных сетях

## Дополнительные оптимизации

### 1. Preload критичных ресурсов

Добавить в `layout.tsx`:

```tsx
<head>
  <link rel="preload" href="/logo_zeno.png" as="image" />
  <link rel="preload" href="/_next/static/chunks/a0bfc9938be27aec.js" as="script" />
</head>
```

### 2. Skeleton loaders

Для lazy компонентов добавить loading state:

```tsx
const FeatureRoadmap = dynamic(
  () => import("./FeatureRoadmap"),
  { loading: () => <div className="h-96 animate-pulse bg-white/5 rounded-3xl" /> }
);
```

### 3. Уменьшить framer-motion

Заменить на CSS animations где возможно:

```tsx
// Вместо
<motion.div animate={{ opacity: 1 }}>

// Использовать
<div className="animate-fade-in">
```

### 4. Optimize video

```tsx
<video
  poster="/demo/poster.jpg"  // Добавить poster
  preload="metadata"          // Вместо "none"
  width="1920"                // Явные размеры
  height="1080"
/>
```

### 5. Resource hints

```tsx
<head>
  <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
</head>
```

## Ожидаемые результаты

### До оптимизации CloudFront
- Desktop: ~70-80
- Mobile: ~60-70

### После CloudFront + Brotli
- Desktop: ~85-90
- Mobile: ~75-85

### После всех оптимизаций
- Desktop: ~90-95
- Mobile: ~85-90

## Приоритеты

1. **КРИТИЧНО:** Включить Brotli в CloudFront
2. **КРИТИЧНО:** Инвалидировать кеш
3. **ВАЖНО:** Добавить security headers
4. **ВАЖНО:** Включить HTTP/3
5. **ОПЦИОНАЛЬНО:** Skeleton loaders
6. **ОПЦИОНАЛЬНО:** Preload критичных ресурсов
7. **ОПЦИОНАЛЬНО:** Уменьшить framer-motion

## Команды для проверки

```bash
# Проверить Brotli
curl -H "Accept-Encoding: br" -I https://zeno-cy.com | grep content-encoding

# Проверить security headers
curl -I https://zeno-cy.com | grep -E "Strict-Transport|X-Content"

# Проверить HTTP/3
curl --http3 -I https://zeno-cy.com

# PageSpeed тест
open "https://pagespeed.web.dev/analysis/https-zeno-cy-com/"
```
