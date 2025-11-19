# CloudFront Optimization Guide

## Critical Settings for PageSpeed

### 1. Enable Compression
```
Compress Objects Automatically: Yes
```

### 2. Cache Policy
Create custom cache policy:
```json
{
  "Name": "ZenoCY-Static-Optimized",
  "MinTTL": 0,
  "MaxTTL": 31536000,
  "DefaultTTL": 86400,
  "ParametersInCacheKeyAndForwardedToOrigin": {
    "EnableAcceptEncodingGzip": true,
    "EnableAcceptEncodingBrotli": true,
    "HeadersConfig": {
      "HeaderBehavior": "none"
    },
    "CookiesConfig": {
      "CookieBehavior": "none"
    },
    "QueryStringsConfig": {
      "QueryStringBehavior": "none"
    }
  }
}
```

### 3. Response Headers Policy
```json
{
  "Name": "ZenoCY-Security-Headers",
  "CustomHeaders": [
    {
      "Header": "X-Content-Type-Options",
      "Value": "nosniff",
      "Override": true
    },
    {
      "Header": "X-Frame-Options",
      "Value": "DENY",
      "Override": true
    },
    {
      "Header": "X-XSS-Protection",
      "Value": "1; mode=block",
      "Override": true
    },
    {
      "Header": "Referrer-Policy",
      "Value": "strict-origin-when-cross-origin",
      "Override": true
    }
  ],
  "SecurityHeadersConfig": {
    "StrictTransportSecurity": {
      "AccessControlMaxAgeSec": 63072000,
      "IncludeSubdomains": true,
      "Preload": true,
      "Override": true
    }
  }
}
```

### 4. Enable HTTP/2 and HTTP/3
```
Supported HTTP Versions: HTTP/2, HTTP/3
```

## S3 Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudFrontAccess",
      "Effect": "Allow",
      "Principal": {
        "Service": "cloudfront.amazonaws.com"
      },
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::zeno-cy-landing/*",
      "Condition": {
        "StringEquals": {
          "AWS:SourceArn": "arn:aws:cloudfront::ACCOUNT_ID:distribution/DISTRIBUTION_ID"
        }
      }
    }
  ]
}
```

## Performance Checklist

- [x] Brotli compression enabled
- [x] HTTP/3 enabled
- [x] Proper cache headers for static assets (1 year)
- [x] Short cache for HTML (0 or 5 min)
- [x] Security headers configured
- [x] Origin Access Control (OAC) instead of OAI

## Testing Commands

```bash
# Check compression
curl -H "Accept-Encoding: br,gzip" -I https://zeno-cy.com

# Check cache headers
curl -I https://zeno-cy.com/_next/static/...

# Check security headers
curl -I https://zeno-cy.com | grep -E "X-|Strict"
```

## Expected Results

- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- TTFB: < 200ms
- PageSpeed Score: > 90
