#!/bin/bash
set -e

echo "🚀 Building..."
npm run build

echo "📦 Syncing to S3..."
aws s3 sync ./out s3://zeno-cy-landing --delete \
  --cache-control "public,max-age=31536000,immutable" \
  --exclude "*.html" \
  --exclude "robots.txt"

aws s3 sync ./out s3://zeno-cy-landing \
  --exclude "*" \
  --include "*.html" \
  --include "robots.txt" \
  --cache-control "public,max-age=0,must-revalidate"

echo "🔄 Invalidating CloudFront..."
if [ -z "$CLOUDFRONT_ID" ]; then
  echo "⚠️  CLOUDFRONT_ID не установлен. Найди ID в AWS Console:"
  echo "   https://console.aws.amazon.com/cloudfront/v3/home#/distributions"
  echo ""
  echo "Затем запусти:"
  echo "   export CLOUDFRONT_ID=YOUR_ID"
  echo "   aws cloudfront create-invalidation --distribution-id \$CLOUDFRONT_ID --paths '/*'"
else
  aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_ID --paths "/*"
  echo "✅ Done! Check: https://zeno-cy.com"
fi
