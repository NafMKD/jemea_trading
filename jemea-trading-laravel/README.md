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

Public pages are available at `/`, `/about`, `/products`, and `/contact`.

## Create the first administrator

Run the interactive command:

```bash
php artisan admin:create
```

The password is requested through a hidden prompt and is not accepted as a command-line option.

Public registration is disabled. Only active users with the `admin` role can access `/admin`.

## Contact inquiries

Contact submissions are validated, rate-limited, protected by a honeypot, and stored in `contact_inquiries` before the notification email is queued. Configure the notification recipient and SMTP connection in `.env`:

```dotenv
CONTACT_EMAIL=contact@example.com
MAIL_MAILER=smtp
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contact@example.com
```

For development, process queued notifications with:

```bash
php artisan queue:work
```

On shared hosting, configure cron to call Laravel's scheduler every minute. The application schedules a short-lived queue worker that drains pending jobs and exits:

```cron
* * * * * cd /absolute/path/to/jemea-trading-laravel && php artisan schedule:run >> /dev/null 2>&1
```

If mail delivery fails, the inquiry remains in the database and the queued job can be retried.

## Quality checks

```bash
npm run lint:check
npm run format:check
npm run types:check
vendor/bin/pint --test
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
