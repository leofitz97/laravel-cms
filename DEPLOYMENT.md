# Deployment Guide

## Requirements
- PHP >= 8.2
- Composer 2.5+
- Node.js 20+
- PostgreSQL

---

## Steps
1. Clone repository
```bash
cd cms

```
2. Install Dependencies
composer install --optimize-autoloader --no-dev
npm ci && npm run build


3. Run migrations
php artisan migrate --force


