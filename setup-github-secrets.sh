#!/bin/bash

echo "🔐 GitHub Secrets Setup"
echo ""

# Проверка gh CLI
if ! command -v gh &> /dev/null; then
  echo "❌ GitHub CLI не установлен"
  echo "Установи: brew install gh"
  echo "Затем: gh auth login"
  exit 1
fi

# Проверка авторизации
if ! gh auth status &> /dev/null; then
  echo "❌ Не авторизован в GitHub"
  echo "Запусти: gh auth login"
  exit 1
fi

echo "✅ GitHub CLI готов"
echo ""

# AWS Region
echo "📍 AWS Region (обычно us-east-1):"
read -p "AWS_REGION: " AWS_REGION
gh secret set AWS_REGION -b "${AWS_REGION:-us-east-1}"

# AWS Credentials
echo ""
echo "🔑 AWS Credentials (из IAM User):"
read -p "AWS_ACCESS_KEY_ID: " AWS_ACCESS_KEY_ID
gh secret set AWS_ACCESS_KEY_ID -b "$AWS_ACCESS_KEY_ID"

read -sp "AWS_SECRET_ACCESS_KEY: " AWS_SECRET_ACCESS_KEY
echo ""
gh secret set AWS_SECRET_ACCESS_KEY -b "$AWS_SECRET_ACCESS_KEY"

# CloudFront Distribution ID
echo ""
echo "☁️  CloudFront Distribution ID:"
echo "Найди в: https://console.aws.amazon.com/cloudfront/v3/home#/distributions"
echo "Или запусти: ./find-cloudfront-id.sh"
read -p "DISTRIBUTION_ID: " DISTRIBUTION_ID
gh secret set DISTRIBUTION_ID -b "$DISTRIBUTION_ID"

echo ""
echo "✅ Secrets созданы!"
echo ""
echo "Проверка:"
gh secret list

echo ""
echo "🚀 Теперь можешь пушить:"
echo "   git push origin main"
