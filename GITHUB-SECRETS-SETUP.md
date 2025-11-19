# GitHub Secrets Setup

## Шаги настройки

### 1. Создать IAM User для GitHub Actions

```bash
# В AWS Console → IAM → Users → Create User
Name: github-actions-zeno-cy
Access type: Programmatic access
```

### 2. Создать Policy для деплоя

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::zeno-cy-landing",
        "arn:aws:s3:::zeno-cy-landing/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation"
      ],
      "Resource": "arn:aws:cloudfront::*:distribution/*"
    }
  ]
}
```

### 3. Получить CloudFront Distribution ID

```bash
# Метод 1: AWS Console
https://console.aws.amazon.com/cloudfront/v3/home#/distributions

# Метод 2: AWS CLI
aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'zeno-cy.com')].Id" --output text

# Метод 3: Наш скрипт
./find-cloudfront-id.sh
```

### 4. Добавить Secrets в GitHub

```bash
# Открой репозиторий
https://github.com/ZenoN-Cloud/zeno-cy-landing/settings/secrets/actions

# Нажми "New repository secret" для каждого:
```

**Secrets для добавления:**

| Name | Value | Где взять |
|------|-------|-----------|
| `AWS_ACCESS_KEY_ID` | AKIA... | IAM User → Security credentials |
| `AWS_SECRET_ACCESS_KEY` | wJalr... | IAM User → Security credentials (показывается 1 раз!) |
| `AWS_REGION` | us-east-1 | Регион где CloudFront (обычно us-east-1) |
| `DISTRIBUTION_ID` | E1234... | CloudFront Console или команда выше |

### 5. Проверить GitHub Actions

После добавления secrets:

```bash
# Запуш изменения
git push origin main

# Проверь статус
https://github.com/ZenoN-Cloud/zeno-cy-landing/actions

# Или через CLI
gh run list --limit 1
gh run watch
```

## Быстрая настройка (если AWS CLI настроен)

```bash
# 1. Создать IAM user и получить credentials
aws iam create-user --user-name github-actions-zeno-cy

# 2. Создать access key
aws iam create-access-key --user-name github-actions-zeno-cy

# 3. Найти Distribution ID
DIST_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?contains(Aliases.Items, 'zeno-cy.com')].Id" --output text)
echo "Distribution ID: $DIST_ID"

# 4. Добавить secrets через gh CLI
gh secret set AWS_ACCESS_KEY_ID
gh secret set AWS_SECRET_ACCESS_KEY
gh secret set AWS_REGION -b "us-east-1"
gh secret set DISTRIBUTION_ID -b "$DIST_ID"
```

## Проверка

После настройки проверь что secrets добавлены:

```bash
gh secret list
```

Должно показать:
```
AWS_ACCESS_KEY_ID       Updated 2025-XX-XX
AWS_SECRET_ACCESS_KEY   Updated 2025-XX-XX
AWS_REGION              Updated 2025-XX-XX
DISTRIBUTION_ID         Updated 2025-XX-XX
```

## Troubleshooting

### Ошибка: SignatureDoesNotMatch
- Проверь что AWS_ACCESS_KEY_ID и AWS_SECRET_ACCESS_KEY правильные
- Убедись что нет лишних пробелов в начале/конце

### Ошибка: NoSuchDistribution
- Проверь DISTRIBUTION_ID
- Убедись что используешь правильный AWS_REGION

### Ошибка: AccessDenied
- Проверь IAM Policy
- Убедись что user имеет права на S3 и CloudFront

## После настройки

Каждый push в main будет автоматически:
1. ✅ Билдить проект
2. ✅ Заливать в S3
3. ✅ Инвалидировать CloudFront
4. ✅ Сайт обновится через ~30 секунд
