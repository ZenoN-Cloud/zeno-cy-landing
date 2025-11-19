#!/bin/bash

echo "🔧 Fixing GitHub Secrets..."
echo ""

# Получаем текущее значение
echo "Найди Distribution ID:"
echo "1. AWS Console: https://console.aws.amazon.com/cloudfront/v3/home#/distributions"
echo "2. Или запусти: ./find-cloudfront-id.sh"
echo ""

read -p "Distribution ID (E1234...): " DIST_ID

if [ -z "$DIST_ID" ]; then
  echo "❌ Distribution ID не может быть пустым"
  exit 1
fi

# Удаляем старый
echo "Удаляю CLOUDFRONT_DISTRIBUTION_ID..."
gh secret remove CLOUDFRONT_DISTRIBUTION_ID 2>/dev/null || true

# Создаём новый с правильным именем
echo "Создаю DISTRIBUTION_ID..."
gh secret set DISTRIBUTION_ID -b "$DIST_ID"

echo ""
echo "✅ Готово! Проверка:"
gh secret list

echo ""
echo "🚀 Теперь запуш:"
echo "   git push origin main"
