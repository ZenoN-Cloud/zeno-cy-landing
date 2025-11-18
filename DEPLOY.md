# Инструкция по деплою Zeno CY Landing на AWS

## Шаг 1: Создание S3 Bucket

```bash
aws s3 mb s3://zeno-cy-landing --region eu-central-1
```

## Шаг 2: Настройка S3 для статического хостинга

```bash
aws s3 website s3://zeno-cy-landing --index-document index.html --error-document 404.html
```

## Шаг 3: Загрузка файлов

```bash
aws s3 sync ./out s3://zeno-cy-landing --delete --cache-control "public, max-age=31536000, immutable"
```

## Шаг 4: Создание CloudFront Distribution

Создай файл `cloudfront-config.json`:

```json
{
  "CallerReference": "zeno-cy-landing-2024",
  "Comment": "Zeno CY Landing Page",
  "Enabled": true,
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-zeno-cy-landing",
        "DomainName": "zeno-cy-landing.s3.eu-central-1.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "DefaultRootObject": "index.html",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-zeno-cy-landing",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["GET", "HEAD"]
    },
    "Compress": true,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "MinTTL": 0
  },
  "Aliases": {
    "Quantity": 2,
    "Items": ["zeno-cy.com", "www.zeno-cy.com"]
  },
  "ViewerCertificate": {
    "ACMCertificateArn": "arn:aws:acm:us-east-1:YOUR_ACCOUNT:certificate/YOUR_CERT_ID",
    "SSLSupportMethod": "sni-only",
    "MinimumProtocolVersion": "TLSv1.2_2021"
  }
}
```

## Шаг 5: Запрос SSL сертификата в ACM (ВАЖНО: us-east-1 для CloudFront!)

```bash
aws acm request-certificate \
  --domain-name zeno-cy.com \
  --subject-alternative-names www.zeno-cy.com \
  --validation-method DNS \
  --region us-east-1
```

**ВАЖНО:** CloudFront требует сертификат из us-east-1, даже если S3 в eu-central-1!

Запиши ARN сертификата!

## Шаг 6: Валидация сертификата

```bash
aws acm describe-certificate --certificate-arn YOUR_CERT_ARN --region us-east-1
```

Получи CNAME записи для валидации и добавь их в Cloudflare DNS.

## Шаг 7: После валидации создай CloudFront Distribution

```bash
aws cloudfront create-distribution --distribution-config file://cloudfront-config.json
```

Запиши Distribution ID и Domain Name!

## Шаг 8: Настройка DNS в Cloudflare

Зайди в Cloudflare Dashboard для zeno-cy.com и добавь:

1. **CNAME запись для www:**
   - Type: CNAME
   - Name: www
   - Target: YOUR_CLOUDFRONT_DOMAIN.cloudfront.net
   - Proxy status: DNS only (серый облако)

2. **CNAME запись для root (или ALIAS):**
   - Type: CNAME
   - Name: @
   - Target: YOUR_CLOUDFRONT_DOMAIN.cloudfront.net
   - Proxy status: DNS only (серый облако)

## Шаг 9: Инвалидация CloudFront кэша

```bash
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

## Шаг 10: Настройка GitHub Secrets

В GitHub репозитории добавь секреты:
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION` (eu-central-1)
- `CLOUDFRONT_DISTRIBUTION_ID`

## Готово!

Теперь при каждом push в main ветку GitHub Actions автоматически задеплоит изменения.

Проверь: https://zeno-cy.com
