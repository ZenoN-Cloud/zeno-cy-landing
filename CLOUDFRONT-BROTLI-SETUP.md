# CloudFront Brotli Setup - Пошаговая инструкция

## Шаг 1: Создать Cache Policy

1. Открой CloudFront Console:
   https://console.aws.amazon.com/cloudfront/v3/home#/policies/cache

2. Нажми **"Create cache policy"**

3. Заполни форму:

### Basic settings
- **Name:** `ZenoCY-Optimized`
- **Description:** `Optimized cache policy with Brotli compression`

### TTL settings
- **Minimum TTL:** `0`
- **Maximum TTL:** `31536000` (1 год)
- **Default TTL:** `86400` (1 день)

### Cache key settings

**Headers:**
- Select: `None`

**Query strings:**
- Select: `None`

**Cookies:**
- Select: `None`

### Compression support
- ✅ **Gzip**
- ✅ **Brotli** ← ВАЖНО!

4. Нажми **"Create"**

## Шаг 2: Применить Cache Policy к Behavior

1. Вернись к своей дистрибуции:
   https://console.aws.amazon.com/cloudfront/v3/home#/distributions/E3EWRZEALGIW4T

2. Перейди на вкладку **"Behaviors"**

3. Выбери behavior `Default (*)` (кликни на радио-кнопку)

4. Нажми **"Edit"**

5. В разделе **"Cache key and origin requests"**:
   - **Cache policy:** Выбери `ZenoCY-Optimized` (твоя новая policy)

6. Нажми **"Save changes"**

## Шаг 3: Инвалидировать кеш

```bash
export CLOUDFRONT_ID=E3EWRZEALGIW4T
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
```

Или через консоль:
1. Вкладка **"Invalidations"**
2. **"Create invalidation"**
3. Object paths: `/*`
4. **"Create invalidation"**

## Шаг 4: Проверить

Подожди 2-3 минуты, затем:

```bash
# Проверь что Brotli работает
curl -H "Accept-Encoding: br" -I https://zeno-cy.com | grep content-encoding

# Должно показать: content-encoding: br
```

## Ожидаемый результат

- **Размер файлов:** -20-30%
- **PageSpeed Desktop:** +10-15 баллов
- **PageSpeed Mobile:** +5-10 баллов
- **LCP:** Улучшение на 0.5-1s

## Troubleshooting

**Не видишь ZenoCY-Optimized в списке?**
- Обнови страницу (F5)
- Проверь что создал policy в правильном регионе

**Brotli не работает?**
- Проверь что в Cache Policy включен Brotli
- Инвалидируй кеш CloudFront
- Подожди 5-10 минут

**Ошибка при сохранении?**
- Проверь что все поля заполнены
- TTL должны быть числами без пробелов
