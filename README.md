# KitchenOS Backend API & Admin Dashboard

A restaurant management platform built with **Laravel 12** and a **Vue 3** single-page admin dashboard. It exposes a REST API (used by external clients such as a POS/ordering app) and ships an integrated web dashboard for managing food menus, inventory, orders, customers, users, and reports.

## Overview

The project combines two layers in one codebase:

- **Backend REST API** — Laravel 12 with Sanctum token authentication, serving JSON endpoints for orders, menus, inventory, customers, auth, reporting, and WhatsApp integration.
- **Admin Dashboard (SPA)** — a Vue 3 + Vue Router app served from Laravel, styled with Tailwind CSS v4 and Bootstrap 5. All non-API routes fall through to the SPA, which handles client-side routing.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Laravel 12 (PHP ^8.2) |
| Auth | Laravel Sanctum (token-based) |
| Frontend | Vue 3, Vue Router |
| Build tool | Vite 6 + `laravel-vite-plugin` |
| Styling | Tailwind CSS v4, Bootstrap 5 |
| Imaging | Intervention Image, Spatie Image, Spatie Browsershot |
| Extras | Milon Barcode, Laravel Phone, Email Checker |

## Features

**Restaurant**
- Food categories and food items (menu management)
- Places (locations / branches)
- Orders and order items, with discounts, service charges, and soft deletes

**Inventory (INV)**
- Inventory categories, products, and brands

**People**
- Users (with registration, login, roles) and customers

**Reporting**
- Daily summary reports (overall, dining, delivery, on-the-way)
- Category sales and per-item quantity reports
- Quick summary and top-ten deals reports

**Integrations & Account**
- WhatsApp device pairing (QR generation, logout)
- Password reset via OTP email flow
- Profile, change password, and application settings

## Frontend Structure

The Vue app lives under `resources/js/`:

- `pages/` — screen-level views (Dashboard, Orders, FoodItems, INVProducts, Customers, Users, Settings, Login, etc.)
- `layouts/` — `AdminLayout` (dashboard shell) and `LoginLayout` (auth screens)
- `components/` — `Sidebar`, `Topbar`, and reusable `ui/` widgets (`DataTable`, `FormField`, `Modal`, `PageHeader`, `StatCard`)
- `router.js` — client-side routes; auth pages use the login layout, everything else uses the admin layout
- `app.js` — mounts the Vue app onto `#app` in the `app` Blade view

## API Endpoints

Base path: `/api`

**Auth** — `POST /register`, `POST /login`, `POST /logout`, `GET /logged-user`, `POST /change-password`, `POST /forgot-password`, `POST /reset-password`
Protected routes are guarded by the `auth:sanctum` middleware.

**Restaurant** — `food-categories`, `food-items`, `orders`, `places` (full CRUD)

**Inventory** — `INV_Categories`, `INV_Product`, `INV_Brand` (full CRUD)

**People** — `customers`, `users` (full CRUD)

**Reports** — `daily-summary/report`, `daily-category-sales/report`, `daily-summary/quick-report`, `daily-summary/top-ten-deals-report`, and related variants

**Settings** — `GET/POST /settings`, `POST /settings/update`, `DELETE /settings/delete`

**WhatsApp** — `GET /get-whatsapp`, `POST /generate-whatsapp-qr`, `POST /whatsapp/logout-device`

> Note: Most CRUD endpoints are currently public. Review the `auth:sanctum` middleware group in `routes/api.php` before deploying to production.

## Getting Started

### Requirements
- PHP 8.2+
- Composer
- Node.js 18+ and npm

### Installation

```bash
# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Run migrations (uses SQLite by default; configure .env for MySQL/Postgres)
php artisan migrate
```

### Development

Run the full stack (server, queue, logs, and Vite) with a single command:

```bash
composer dev
```

Or run the pieces individually:

```bash
php artisan serve
npm run dev
```

### Production Build

```bash
npm run build
```

## License

Open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
