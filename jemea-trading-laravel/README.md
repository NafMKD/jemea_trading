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

## Inquiry administration

Authenticated administrators can:

- Review dashboard statistics and recent inquiries at `/admin`.
- Search, filter, sort, and paginate inquiries at `/admin/inquiries`.
- View complete contact and activity details.
- Assign an inquiry to an active user.
- Update its status to New, Read, Replied, or Archived.
- Launch an email reply, archive the record, or permanently delete it after confirmation.

Guests, inactive users, and staff without administrator authorization cannot access or mutate inquiry records.

## Email notification settings

Administrators can configure inquiry notification delivery at `/settings/email-notifications`.

The page provides:

- An inquiry notification on/off switch.
- SMTP host, port, username, password, and encryption settings.
- Sender name and sender address.
- The administrator destination address that receives inquiry alerts.
- A test-email action after the settings have been saved.

The settings page requires recent password confirmation. SMTP passwords are encrypted with the application key before storage and are never returned to the browser. When notifications are disabled, contact inquiries continue to be stored but no email job is queued.

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

Product quote links use `/contact?product={product-id}`. The Contact form validates the supplied product identifier and preselects the matching Product Interest option.

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
- Set `SESSION_SECURE_COOKIE=true` after HTTPS is active.
- Build Vite assets before deployment; Node.js is not required at runtime.
- Never commit or upload a development `.env`.
