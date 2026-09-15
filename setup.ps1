# Dudoti Project Setup Script
# Run this once after cloning: .\setup.ps1

Write-Host "Setting up Dudoti project..." -ForegroundColor Cyan

# 1. Install dependencies
Write-Host "`n[1/4] Installing dependencies..." -ForegroundColor Yellow
npm install

# 2. Generate Prisma client
Write-Host "`n[2/4] Generating Prisma client..." -ForegroundColor Yellow
npx prisma generate

# 3. Apply migrations
Write-Host "`n[3/4] Applying database migrations..." -ForegroundColor Yellow
npx prisma migrate deploy

# 4. Seed the database
Write-Host "`n[4/4] Seeding database..." -ForegroundColor Yellow
npx tsx prisma/seed.ts

Write-Host "`nDone! Run 'npm run dev' to start." -ForegroundColor Green
