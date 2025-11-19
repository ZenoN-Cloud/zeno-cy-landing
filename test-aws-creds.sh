#!/bin/bash

echo "🔍 Проверка AWS credentials..."
echo ""

# Проверка локальных credentials
if aws sts get-caller-identity &> /dev/null; then
  echo "✅ Локальные AWS credentials работают:"
  aws sts get-caller-identity
  echo ""
  echo "Используй эти же credentials для GitHub Secrets:"
  echo ""
  echo "AWS_ACCESS_KEY_ID и AWS_SECRET_ACCESS_KEY из:"
  echo "~/.aws/credentials"
  echo ""
  cat ~/.aws/credentials 2>/dev/null | grep -A 2 "\[default\]" || echo "Файл не найден"
else
  echo "❌ AWS credentials не настроены локально"
  echo ""
  echo "Настрой через:"
  echo "  aws configure"
  echo ""
  echo "Или создай IAM User в AWS Console:"
  echo "  https://console.aws.amazon.com/iam/home#/users"
fi

echo ""
echo "Затем обнови GitHub Secrets:"
echo "  gh secret set AWS_ACCESS_KEY_ID"
echo "  gh secret set AWS_SECRET_ACCESS_KEY"
