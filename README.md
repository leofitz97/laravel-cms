# laravel-cms


A Laravel + Inertia.js + React-based application for creating customizable public pages with real-time view tracking and analytics (daily, weekly, monthly).

## Features
-  Page, logo, and background support
-  Analytics dashboard powered by React-ApexCharts
-  Authentication & authorization with Laravel Sanctum
-  Real-time tracking of page views and unique visitors

---

## Requirements
- PHP >= 8.1
- Composer >= 2.5
- Node.js >= 18.x
- PostgreSQL

---

## Setup
```bash
# Clone the repository
git clone https://github.com/leofitz-org/page-builder.git
cd page-builder

# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Copy and edit environment variables
cp .env.example .env

# Generate application key
php artisan key:generate

# Run migrations and seed data
php artisan migrate --seed

# Build assets
npm run dev
