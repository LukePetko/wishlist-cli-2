#!/bin/bash

# Load environment variables from .env file
if [ -f .env ]; then
    set -a  # automatically export all variables
    source .env
    set +a
else
    echo "Error: .env file not found"
    exit 1
fi

S3_USE_SSL=${S3_USE_SSL:-false}

# Build the application with all env vars as defines
bun build src/index.tsx \
  --target bun \
  --outfile ./dist/wishlist \
  --compile \
  --define DB_URL="\"$DB_URL\"" \
  --define S3_ENDPOINT="\"$S3_ENDPOINT\"" \
  --define S3_PORT="\"$S3_PORT\"" \
  --define S3_ACCESS_KEY="\"$S3_ACCESS_KEY\"" \
  --define S3_SECRET_KEY="\"$S3_SECRET_KEY\"" \
  --define S3_BUCKET_NAME="\"$S3_BUCKET_NAME\"" \
  --define S3_USE_SSL="\"$S3_USE_SSL\""

echo "Build complete: ./dist/wishlist"

