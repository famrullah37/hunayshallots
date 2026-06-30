#!/bin/sh
set -e
echo "[hunay] Syncing database schema..."
node ./node_modules/prisma/build/index.js db push \
  --schema=./prisma/schema.prisma \
  --skip-generate
echo "[hunay] Starting Next.js server..."
exec node server.js
