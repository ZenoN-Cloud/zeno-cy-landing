#!/bin/bash

echo "🔍 Ищу CloudFront Distribution ID для zeno-cy.com..."
echo ""

# Метод 1: через AWS CLI
if command -v aws &> /dev/null; then
  echo "Метод 1: AWS CLI"
  DIST_ID=$(aws cloudfront list-distributions 2>/dev/null | grep -B 20 "zeno-cy.com" | grep '"Id"' | head -1 | cut -d'"' -f4)
  
  if [ -n "$DIST_ID" ]; then
    echo "✅ Найден: $DIST_ID"
    echo ""
    echo "Запусти для инвалидации:"
    echo "export CLOUDFRONT_ID=$DIST_ID"
    echo "aws cloudfront create-invalidation --distribution-id \$CLOUDFRONT_ID --paths '/*'"
    exit 0
  else
    echo "❌ Не найден через AWS CLI"
  fi
fi

echo ""
echo "Метод 2: Вручную через AWS Console"
echo "1. Открой: https://console.aws.amazon.com/cloudfront/v3/home#/distributions"
echo "2. Найди дистрибуцию с Alternate Domain Names: zeno-cy.com"
echo "3. Скопируй ID (формат: E1234567890ABC)"
echo ""
echo "Затем запусти:"
echo "export CLOUDFRONT_ID=YOUR_ID"
echo "./deploy.sh"
