#!/bin/bash

# Optimize images in public folder
# Install: brew install imagemagick jpegoptim optipng

PUBLIC_DIR="public"

echo "Optimizing images..."

# Optimize PNGs
find "$PUBLIC_DIR" -name "*.png" -exec optipng -o7 {} \;

# Optimize JPGs
find "$PUBLIC_DIR" -name "*.jpg" -o -name "*.jpeg" | while read img; do
  jpegoptim --max=85 --strip-all "$img"
done

# Convert large PNGs to WebP
find "$PUBLIC_DIR" -name "*.png" -size +50k | while read img; do
  cwebp -q 85 "$img" -o "${img%.png}.webp"
done

echo "Done!"
