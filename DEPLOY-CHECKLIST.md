# Deploy Checklist ✅

## Статус деплоя

✅ **S3 синхронизирован** - все файлы залиты
✅ **CloudFront работает** - сайт доступен на https://zeno-cy.com
✅ **Gzip включен** - компрессия работает
⚠️ **Brotli** - нужно включить в CloudFront (лучше чем gzip)
⚠️ **Cache invalidation** - нужен DISTRIBUTION_ID

## Что сделано

### Code Optimization
- ✅ Lazy loading компонентов (DemoLink, PrivacyHook, FeatureRoadmap, FoundersCircle)
- ✅ Code splitting (server/client components)
- ✅ Font optimization (меньше весов, font-display: swap)
- ✅ Bundle optimization (optimizePackageImports)

### Mobile Optimization
- ✅ Viewport metadata
- ✅ Blur effects уменьшены (180px→80px на мобилках)
- ✅ Video autoplay отключен на мобилках
- ✅ Быстрые анимации (0.3s вместо 0.6s)

### Infrastructure
- ✅ S3 bucket настроен
- ✅ CloudFront раздаёт контент
- ✅ Gzip compression работает
- ✅ robots.txt добавлен

## Что нужно доделать

### 1. CloudFront Distribution ID
Найди ID дистрибуции:
```bash
# В AWS Console
https://console.aws.amazon.com/cloudfront/v3/home#/distributions

# Или через CLI (если настроен)
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'zeno-cy.com')].Id" --output text
```

Затем инвалидируй кеш:
```bash
export CLOUDFRONT_ID=YOUR_DISTRIBUTION_ID
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
```

### 2. CloudFront Optimization (КРИТИЧНО для PageSpeed!)

#### A. Enable Brotli Compression
1. CloudFront Console → Distributions → твоя дистрибуция
2. Behaviors → Edit default behavior
3. Cache Policy → Create new policy:
   - Name: `ZenoCY-Optimized`
   - Enable: `Gzip` ✅ и `Brotli` ✅
   - TTL: Min=0, Max=31536000, Default=86400

#### B. Response Headers Policy
1. CloudFront Console → Policies → Response headers
2. Create policy → Security headers:
   ```
   Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
   X-Content-Type-Options: nosniff
   X-Frame-Options: DENY
   X-XSS-Protection: 1; mode=block
   Referrer-Policy: strict-origin-when-cross-origin
   ```

#### C. Enable HTTP/3
1. Distribution Settings → General
2. Supported HTTP versions: ✅ HTTP/2, ✅ HTTP/3

### 3. GitHub Actions Secrets
Добавь в Settings → Secrets and variables → Actions:
```
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_REGION=us-east-1
DISTRIBUTION_ID=xxx
```

## Быстрый деплой

```bash
# Билд + деплой в S3
./deploy.sh

# Или вручную
npm run build
aws s3 sync ./out s3://zeno-cy-landing --delete
```

## Тестирование

### Desktop
```bash
# PageSpeed
https://pagespeed.web.dev/analysis/https-zeno-cy-com/

# Ожидаемые результаты после CloudFront оптимизации:
# Performance: > 90
# LCP: < 2.5s
# FCP: < 1.5s
# TBT: < 200ms
```

### Mobile
```bash
# PageSpeed Mobile
https://pagespeed.web.dev/analysis/https-zeno-cy-com/?form_factor=mobile

# Ожидаемые результаты:
# Performance: > 85
# LCP: < 3.5s
# FCP: < 2s
```

### Manual Testing
```bash
# Проверить компрессию
curl -H "Accept-Encoding: br,gzip" -I https://zeno-cy.com | grep content-encoding

# Проверить кеш
curl -I https://zeno-cy.com | grep x-cache

# Проверить security headers (после настройки)
curl -I https://zeno-cy.com | grep -E "Strict-Transport|X-Content"
```

## Мониторинг

После всех оптимизаций проверь:
1. ✅ PageSpeed Desktop > 90
2. ✅ PageSpeed Mobile > 85
3. ✅ Brotli compression работает
4. ✅ Security headers установлены
5. ✅ HTTP/3 включен
6. ✅ Cache работает корректно

## Следующие шаги

1. **Сейчас:** Найди DISTRIBUTION_ID и инвалидируй кеш
2. **Потом:** Настрой CloudFront (Brotli, HTTP/3, security headers)
3. **Затем:** Запусти PageSpeed и сравни результаты
4. **Финал:** Настрой GitHub Actions для автодеплоя

---

**Текущий статус:** 🟡 Deployed, но нужна оптимизация CloudFront
**Следующий шаг:** Найти DISTRIBUTION_ID и настроить Brotli
