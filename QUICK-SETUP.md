# ⚡ Quick Setup - 5 минут

## Шаг 1: Найди CloudFront Distribution ID

```bash
./find-cloudfront-id.sh
```

Или вручную: https://console.aws.amazon.com/cloudfront/v3/home#/distributions

## Шаг 2: Настрой GitHub Secrets

### Автоматически (рекомендуется):

```bash
./setup-github-secrets.sh
```

Скрипт спросит:
1. AWS_REGION (обычно `us-east-1`)
2. AWS_ACCESS_KEY_ID (из IAM User)
3. AWS_SECRET_ACCESS_KEY (из IAM User)
4. DISTRIBUTION_ID (из шага 1)

### Вручную через gh CLI:

```bash
# Проверь что авторизован
gh auth status

# Добавь secrets
gh secret set AWS_REGION -b "us-east-1"
gh secret set AWS_ACCESS_KEY_ID -b "AKIA..."
gh secret set AWS_SECRET_ACCESS_KEY -b "wJalr..."
gh secret set DISTRIBUTION_ID -b "E1234..."

# Проверь
gh secret list
```

### Через веб-интерфейс:

https://github.com/ZenoN-Cloud/zeno-cy-landing/settings/secrets/actions

## Шаг 3: Запуш и проверь

```bash
git push origin main

# Смотри статус
gh run watch

# Или в браузере
open "https://github.com/ZenoN-Cloud/zeno-cy-landing/actions"
```

## Шаг 4: Включи Brotli в CloudFront

1. Открой: https://console.aws.amazon.com/cloudfront/v3/home#/distributions
2. Выбери свою дистрибуцию
3. Behaviors → Edit Default (*)
4. Cache Policy → Create new:
   - Name: `ZenoCY-Optimized`
   - Compression: Gzip ✅ + Brotli ✅
   - TTL: Min=0, Max=31536000, Default=86400
5. Save

## Шаг 5: Проверь результат

Подожди 2-3 минуты после деплоя:

```bash
# Проверь что Brotli работает
curl -H "Accept-Encoding: br" -I https://zeno-cy.com | grep content-encoding

# PageSpeed тест
open "https://pagespeed.web.dev/analysis/https-zeno-cy-com/"
```

## Готово! 🎉

Теперь при каждом `git push origin main`:
- ✅ Автоматический билд
- ✅ Деплой в S3
- ✅ Инвалидация CloudFront
- ✅ Сайт обновится через ~30 секунд

## Troubleshooting

**Ошибка: gh not found**
```bash
brew install gh
gh auth login
```

**Ошибка: AWS credentials invalid**
- Проверь IAM User в AWS Console
- Убедись что есть права на S3 и CloudFront

**Ошибка: Distribution not found**
- Проверь DISTRIBUTION_ID
- Убедись что используешь правильный AWS_REGION

**GitHub Actions падает**
```bash
# Проверь secrets
gh secret list

# Смотри логи
gh run view --log-failed
```
