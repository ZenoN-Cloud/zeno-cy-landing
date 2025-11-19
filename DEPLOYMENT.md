# Deployment Guide

## Проблема

Сайт использует Next.js API Routes (`/api/request-access`) для Notion интеграции.
API Routes не работают со static export на S3.

## Решение

Сайт работает локально с `npm run dev` и формы отправляются в Notion.

### Опции деплоя:

#### 1. Vercel (Рекомендуется) ✅

```bash
# Установи Vercel CLI
npm i -g vercel

# Деплой
vercel

# Production
vercel --prod
```

**Плюсы:**
- API Routes работают из коробки
- Автодеплой при push
- Бесплатно для hobby проектов
- Env variables в UI

**Настройка:**
1. Добавь env variables в Vercel Dashboard:
   - `NOTION_TOKEN`
   - `NOTION_DATABASE_ID`

#### 2. AWS Amplify

```bash
# Через AWS Console
1. AWS Amplify → New app → GitHub
2. Выбери репозиторий
3. Build settings: автоматически определит Next.js
4. Environment variables:
   - NOTION_TOKEN
   - NOTION_DATABASE_ID
```

#### 3. Static Export на S3 (без форм)

Если не нужна Notion интеграция:

```ts
// next.config.ts
const nextConfig: NextConfig = {
  output: 'export', // Добавить обратно
  // ...
};
```

Тогда форма будет использовать mailto вместо API.

## Текущий статус

- ✅ Локально работает: `npm run dev`
- ✅ Notion интеграция работает
- ❌ GitHub Actions отключен (не работает с API routes)
- ⚠️ Нужен деплой на Vercel или Amplify

## Quick Deploy на Vercel

```bash
# 1. Установи Vercel CLI
npm i -g vercel

# 2. Логин
vercel login

# 3. Деплой
vercel

# 4. Добавь env variables
vercel env add NOTION_TOKEN
vercel env add NOTION_DATABASE_ID

# 5. Production deploy
vercel --prod
```

## Альтернатива: Hybrid подход

Можно оставить лендинг на S3, а API на отдельном serverless:
- Лендинг: S3 + CloudFront (static)
- API: AWS Lambda + API Gateway
- Форма отправляет на Lambda URL

Но это сложнее - проще использовать Vercel.
