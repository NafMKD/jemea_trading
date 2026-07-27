# Email Notifications and Product Quote Features

Implemented on July 27, 2026.

## Administrator email settings

Administrators can open `/settings/email-notifications` after confirming their password.

The settings page supports:

- Enabling or disabling new-inquiry email notifications.
- SMTP host and port.
- Optional SMTP username and password.
- TLS/STARTTLS, SSL, or unencrypted transport selection.
- Sender name and sender email address.
- Notification destination email address.
- Sending a test email after saving.

SMTP passwords use Laravel's encrypted model cast. The plaintext password is never sent back to the React application. Leaving the password field blank preserves the stored password, while the explicit removal option clears it.

The database remains the source of truth for inquiries:

```text
Visitor submits inquiry
    → Laravel validates and stores the inquiry
    → email setting is checked
    → OFF: no notification job is queued
    → ON: a queued job loads the latest SMTP settings
    → SMTP mail is sent to the configured destination
```

If delivery fails, the inquiry remains stored and the job retains its retry and structured logging behavior.

Environment-based mail configuration remains the fallback until an administrator saves database settings.

## Product quote selection

The Request a Quote action inside a product detail dialog now links to:

```text
/contact?product={product-id}
```

Laravel accepts only known product identifiers and passes the valid value to the Contact Inertia page. The React form initializes Product Interest with that value.

Supported identifiers:

- `coffee`
- `sesame`
- `niger`
- `mung`
- `soya`
- `peanuts`
- `castor`
- `pigeon-pea`
- `polymer`
- `vehicles`
- `other`

Unknown values are ignored and leave Product Interest unselected.

## Deployment requirement

Run the new migration:

```bash
php artisan migrate --force
```

The queue cron documented in the project README must continue running for notification delivery.
