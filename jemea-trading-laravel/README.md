# Jemea Trading PLC Laravel Application

Laravel 13, React 19, TypeScript, Inertia 3, Vite, and Tailwind CSS 4.

This application is the migration target for the existing `../jemea-trading` Next.js reference site. Keep the reference application intact until visual and functional acceptance is complete.

## Local setup

```bash
composer install
npm install
php artisan key:generate
php artisan migrate
npm run build
```

For local development:

```bash
composer run dev
```

The application is configured for MySQL or MariaDB. Create a dedicated local database and update the credentials in `.env` before running migrations.

## Create the first administrator

Run the interactive command:

```bash
php artisan admin:create
```

The password is requested through a hidden prompt and is not accepted as a command-line option.

Public registration is disabled. Only active users with the `admin` role can access `/admin`.

## Quality checks

```bash
npm run lint:check
npm run format:check
npm run types:check
php artisan test
```

The committed test configuration uses in-memory SQLite. Enable the PHP `pdo_sqlite` extension, or override the test connection with credentials for a dedicated disposable MySQL test database. Never run `RefreshDatabase` tests against production or a database containing important data.

## Production notes

- Point the domain document root to `public/`.
- Use MySQL or MariaDB.
- Set `APP_DEBUG=false`.
- Configure HTTPS, secure cookies, SMTP, and cron.
- Build Vite assets before deployment; Node.js is not required at runtime.
- Never commit or upload a development `.env`.
