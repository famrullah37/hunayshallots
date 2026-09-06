#!/bin/sh
set -e
echo "[hunay] Syncing database schema..."
node ./node_modules/prisma/build/index.js db push \
  --schema=./prisma/schema.prisma

echo "[hunay] Seeding blog posts from content/blog..."
./node_modules/.bin/tsx prisma/seedBlog.ts || echo "[hunay] Blog seed failed, continuing startup anyway"

echo "[hunay] Starting Next.js server..."
exec node server.js
