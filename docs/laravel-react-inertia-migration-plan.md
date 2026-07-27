# Jemea Trading PLC — Laravel, React, and Inertia Migration Plan

## 1. Objective

Migrate the existing `jemea-trading` Next.js website into a production-ready Laravel monolith using React and Inertia while preserving the current public-facing design, content, responsive behavior, animations, and dark/light theme.

The migrated application must:

- Run on conventional PHP/MySQL shared hosting without a persistent Node.js process.
- Keep the current Home, About, Products, and Contact experiences visually equivalent.
- Store contact inquiries in the database and send an email notification.
- Provide a secure administrator login and inquiry-management dashboard.
- Establish a maintainable foundation for future product, content, user, and operational management features.

## 2. Recommended Target Stack

| Area | Technology |
|---|---|
| Backend | Laravel 13 |
| Frontend | React 19 + TypeScript |
| Application bridge | Inertia 3 |
| Asset bundler | Vite |
| Styling | Tailwind CSS 4 |
| UI primitives | shadcn/ui-compatible components |
| Animation | Framer Motion |
| Icons | Lucide React |
| Authentication | Laravel Fortify through the official React starter kit |
| Database | MySQL or MariaDB |
| Email | Laravel Mail |
| Background jobs | Laravel database queue with cron, where supported |
| Testing | Pest/PHPUnit, React unit tests where useful, and browser smoke tests |

Inertia server-side rendering will not be enabled initially because it requires a persistent Node.js process. The public pages will use meaningful titles, descriptions, semantic markup, and accessible HTML. SSR can be introduced later if the application moves to a VPS or managed Laravel platform.

## 3. Migration Principles

1. **Preserve the design.** Migration is an architectural change, not a redesign.
2. **Keep the existing Next.js project intact until acceptance.** Build the Laravel application alongside it and cut over only after visual and functional verification.
3. **Port components before changing content.** Existing wording, imagery, spacing, responsive breakpoints, and animation behavior are the baseline.
4. **Move server responsibilities into Laravel.** Validation, persistence, authentication, authorization, mail, throttling, and admin operations belong in the backend.
5. **Avoid premature CMS complexity.** Contact management is part of the first release. Product and page management should be added as separate, tested modules after parity is achieved.
6. **Require authorization on every admin action.** Hiding links in the UI is not authorization.

## 4. Proposed Repository Layout

During migration:

```text
exp/
├── asset/                         # Original source assets
├── docs/
├── jemea-trading/                 # Existing Next.js reference application
└── jemea-trading-laravel/         # New Laravel application
```

Target Laravel structure:

```text
jemea-trading-laravel/
├── app/
│   ├── Enums/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/
│   │   │   └── ContactInquiryController.php
│   │   └── Requests/
│   ├── Mail/
│   ├── Models/
│   ├── Notifications/
│   └── Policies/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── public/
│   └── images/
├── resources/
│   ├── css/app.css
│   ├── js/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── public/
│   │   │   └── admin/
│   │   └── types/
│   └── views/app.blade.php
├── routes/web.php
└── tests/
    ├── Feature/
    └── Unit/
```

## 5. Page and Component Mapping

### Public pages

| Current Next.js file | Target Inertia page |
|---|---|
| `src/app/page.tsx` | `resources/js/pages/public/home.tsx` |
| `src/app/about/page.tsx` | `resources/js/pages/public/about.tsx` |
| `src/app/products/page.tsx` | `resources/js/pages/public/products.tsx` |
| `src/app/contact/page.tsx` | `resources/js/pages/public/contact.tsx` |
| `src/app/layout.tsx` | `resources/js/layouts/public-layout.tsx` |

### Shared components

Move the current components into `resources/js/components/` and preserve their public APIs where practical:

- Navbar
- Footer
- ProductCard
- SectionHeading
- Reveal
- ThemeToggle
- Button
- Input
- Textarea

### Framework-specific replacements

| Next.js API | Laravel/Inertia replacement |
|---|---|
| `next/link` | `Link` from `@inertiajs/react` |
| `next/image` | Accessible `<img>` wrapper with explicit dimensions and lazy loading |
| `usePathname()` | `usePage().url` |
| Next `Metadata` | Inertia `Head` |
| App Router layout | Reusable Inertia React layout |
| `next-themes` | Starter-kit appearance provider or a small local-storage theme hook |
| `fetch("/api/contact")` | Inertia `useForm().post(route("contact.store"))` |
| Next route handler | Laravel controller, request class, model, mail, and notification |

All current image files should be copied to `public/images/`. Image references should remain stable wherever possible to reduce visual regression risk.

## 6. Backend Domain Design

### 6.1 Users

Use Laravel's standard `users` table and authentication model.

Add:

- `role` — string, indexed; initially `admin` or `staff`.
- `is_active` — boolean, default `true`.
- `last_login_at` — nullable timestamp.

Use a PHP backed enum for supported roles. Protect admin routes with `auth`, an active-user check, and authorization policies or gates.

Initial authentication policy:

- Disable public registration.
- Seed or create the first administrator through a secure deployment command.
- Retain login throttling.
- Support password reset only if production mail is configured reliably.
- Require a strong password and secure session cookies in production.

### 6.2 Contact inquiries

Create a `contact_inquiries` table:

| Column | Type / notes |
|---|---|
| `id` | Primary key |
| `name` | String |
| `email` | String, indexed |
| `company` | Nullable string |
| `product_interest` | Nullable string |
| `message` | Text |
| `status` | String, indexed; `new`, `read`, `replied`, or `archived` |
| `assigned_to` | Nullable foreign key to users |
| `source` | String, default `website` |
| `email_sent_at` | Nullable timestamp |
| `read_at` | Nullable timestamp |
| `replied_at` | Nullable timestamp |
| `created_at` / `updated_at` | Timestamps |

Represent inquiry statuses with a PHP backed enum rather than database-native enums so statuses can evolve without difficult schema changes.

Do not store raw passwords, mail credentials, full request headers, or unnecessary personal tracking data. If the requester IP is required for abuse prevention, store a one-way keyed hash or keep it only in short-lived rate-limiting storage.

### 6.3 Future modules

Do not block the initial migration on these modules, but keep namespaces, navigation, policies, and database conventions compatible with:

- Product catalog management
- Product categories and specifications
- Media library
- Page/content management
- Team and role management
- Inquiry assignment and internal notes
- Email templates
- Audit log
- Reports and exports
- Localization

## 7. Route Plan

### Public routes

```text
GET   /                       home
GET   /about                  about
GET   /products               products.index
GET   /contact                contact.create
POST  /contact                contact.store
```

The contact submission route should use CSRF protection, a dedicated form request, a named rate limiter, and a spam honeypot. CAPTCHA should remain configurable and can be enabled if abuse appears.

### Authentication routes

```text
GET   /login
POST  /login
POST  /logout
GET   /forgot-password        optional in production
POST  /forgot-password        optional in production
```

Public registration must be disabled.

### Admin routes

```text
GET    /admin                         dashboard
GET    /admin/inquiries               inquiry index
GET    /admin/inquiries/{inquiry}     inquiry detail
PATCH  /admin/inquiries/{inquiry}     update status/assignment
DELETE /admin/inquiries/{inquiry}     delete, if policy permits
GET    /admin/inquiries-export        CSV export, later milestone
```

All admin endpoints must be protected on the server with authentication and authorization middleware.

## 8. Contact Submission Workflow

```text
Visitor submits form
    → Laravel validates input
    → throttle and honeypot checks run
    → inquiry is stored in MySQL
    → success response is returned
    → notification email is queued or sent
    → administrator sees the inquiry in the dashboard
```

Important behavior:

- Database persistence is the source of truth; a mail failure must not lose the inquiry.
- If sending mail fails, log the failure and retain the inquiry for the administrator.
- Escape all visitor-supplied values in HTML email templates.
- Return field-specific validation messages through Inertia.
- Prevent duplicate submissions while the form is processing.
- Show accessible loading, success, and error states.

For shared hosting, use one of:

1. Database queue plus a cron job that runs every minute and drains queued work.
2. Synchronous mail as an initial fallback if cron/background processing is unavailable.

## 9. Admin Experience

### Initial dashboard

- Total inquiries
- New inquiries
- Inquiries received in the last 7 and 30 days
- Recent inquiries list

### Inquiry list

- Paginated server-side results
- Search by name, email, company, or message
- Filter by status, product interest, and date
- Sort newest/oldest
- Clear unread/new indicator
- Responsive table with a mobile card layout

### Inquiry detail

- Full contact and message information
- Created date and current status
- Status update
- Assignment to an administrator or staff member
- `mailto:` reply action
- Archive action
- Delete action behind confirmation and authorization

Use Laravel pagination and query scopes rather than loading the complete inquiry collection into the browser.

## 10. Implementation Phases

### Phase 0 — Baseline and migration safeguards

- Confirm shared-hosting PHP, extensions, MySQL/MariaDB, cron, mail, Composer, and document-root capabilities.
- Capture desktop and mobile reference screenshots of all existing pages in light and dark modes.
- Record the current Next.js production build result.
- Inventory images, links, form behavior, metadata, and responsive breakpoints.
- Keep the Next.js application runnable throughout the migration.

**Exit gate:** Hosting constraints are documented and a visual reference set exists.

### Phase 1 — Laravel foundation

- Create `jemea-trading-laravel` with the official Laravel React starter kit.
- Select built-in Laravel authentication, React, TypeScript, Inertia, and Tailwind.
- Configure code style, environment examples, database, mail, and test database.
- Disable public registration.
- Add role and active-state authorization.
- Add an administrator seeder or secure command.
- Establish public and admin layouts.

**Exit gate:** The application builds, migrations run, an administrator can log in, and unauthorized users cannot access `/admin`.

### Phase 2 — Design system and shared shell

- Port global CSS variables, typography, color tokens, patterns, and responsive utilities.
- Copy and verify image assets.
- Port Navbar, Footer, ThemeToggle, Reveal, and UI primitives.
- Replace Next.js routing, image, metadata, and theme APIs.
- Match light/dark behavior and persist the preference.
- Add `Head` metadata per route.

**Exit gate:** A blank test page inside the public layout matches the original shell across supported screen sizes.

### Phase 3 — Public page migration

Migrate in this order:

1. Home
2. About
3. Products
4. Contact

For each page:

- Port JSX and data structures.
- Preserve animations and interaction behavior.
- Replace Next-specific APIs.
- Validate keyboard navigation and reduced-motion behavior.
- Compare desktop/mobile and light/dark screenshots.
- Verify internal navigation and browser history.

**Exit gate:** All four public pages meet the visual parity checklist and contain no Next.js dependency.

### Phase 4 — Contact backend

- Add inquiry enum, migration, model, factory, and form request.
- Add public controller and named route.
- Integrate the React form using Inertia `useForm`.
- Add throttling and honeypot protection.
- Create the mail/notification class and escaped template.
- Store first, then dispatch mail.
- Add structured logging for mail failures.
- Write feature tests for success, validation, throttling, persistence, and mail failure.

**Exit gate:** Every valid submission is stored exactly once, invalid submissions show field errors, and mail failure does not lose data.

### Phase 5 — Admin inquiry management

- Build admin dashboard statistics.
- Build paginated inquiry list with search and filters.
- Build inquiry detail view.
- Implement status and assignment updates.
- Implement archive and authorized deletion.
- Add policies and tests for every operation.
- Add empty, loading, forbidden, and error states.

**Exit gate:** An administrator can securely manage inquiries end to end, and a guest or unauthorized user cannot read or mutate them.

### Phase 6 — Quality and hardening

- Run PHP formatter, static analysis if configured, TypeScript checking, and production builds.
- Run backend, frontend, and browser smoke tests.
- Test CSRF, validation, rate limits, authorization, session security, and password reset behavior.
- Audit keyboard navigation, labels, focus states, contrast, and reduced motion.
- Optimize oversized images and verify lazy loading.
- Check console, server logs, broken links, 404 behavior, metadata, and favicon.
- Perform a final visual comparison against the Next.js reference.

**Exit gate:** All automated checks pass and no high-severity accessibility, security, or visual-parity issue remains.

### Phase 7 — Shared-hosting deployment

- Create the production database and restricted database user.
- Configure the domain document root to the Laravel `public/` directory.
- Build frontend assets locally or in CI with `npm run build`.
- Install optimized PHP dependencies with `composer install --no-dev --optimize-autoloader`.
- Configure production `.env`; never upload local secrets.
- Set `APP_ENV=production`, `APP_DEBUG=false`, the correct `APP_URL`, database, session, queue, and mail settings.
- Generate the application key.
- Run `php artisan migrate --force`.
- Cache configuration, events, routes, and views where compatible.
- Ensure only required storage and cache directories are writable.
- Configure HTTPS and secure cookies.
- Configure cron for the scheduler and database queue if supported.
- Perform production smoke tests before changing DNS or replacing the old site.

Example cron strategy for limited shared hosting:

```cron
* * * * * cd /absolute/path/to/application && php artisan schedule:run >> /dev/null 2>&1
```

The scheduler can invoke a short-lived queue command such as `queue:work --stop-when-empty`, avoiding reliance on a permanent worker.

**Exit gate:** The production site, login, contact persistence, mail delivery, and admin workflow pass smoke testing over HTTPS.

### Phase 8 — Cutover and cleanup

- Back up application files and database.
- Point the live domain to the Laravel public directory.
- Monitor error logs, failed jobs, mail delivery, and form submissions.
- Keep the previous deployment recoverable through the stabilization period.
- After acceptance, archive the Next.js reference rather than deleting it immediately.
- Update the root README and operational documentation.

**Exit gate:** The Laravel application is stable in production and the rollback package has been verified.

## 11. Testing Matrix

### Backend feature tests

- Public pages return successfully.
- Valid contact submission persists all expected fields.
- Required fields and email format are validated.
- Oversized fields and messages are rejected safely.
- Contact route is CSRF protected.
- Rate limit rejects excessive submissions.
- Mail is dispatched after persistence.
- Mail failure preserves the inquiry.
- Guest cannot access admin routes.
- Inactive user cannot access admin routes.
- Authorized administrator can list, view, update, archive, and delete according to policy.
- Search, filters, sorting, and pagination return correct results.

### Frontend checks

- All routes navigate without full-page errors.
- Mobile menu opens, traps/returns focus appropriately, and closes on navigation.
- Theme preference persists.
- Product filters and modal behavior match the current site.
- Contact form shows field errors, processing state, success state, and retry behavior.
- Images have useful alt text and stable dimensions.
- Animations respect `prefers-reduced-motion`.

### Browser and visual checks

Test at minimum:

- Mobile: 375px width
- Tablet: 768px width
- Desktop: 1440px width
- Light and dark themes
- Chromium and Firefox; Safari/WebKit where available

Compare:

- Typography and line wrapping
- Section spacing
- Colors and borders
- Image placement and cropping
- Navbar/footer behavior
- Hover, focus, and animation states

## 12. Definition of Done

The migration is complete when:

- The public design is materially equivalent to the existing Next.js site.
- All four public routes work through Laravel and Inertia.
- There are no runtime Next.js or Nodemailer dependencies.
- Contact inquiries are validated and stored in MySQL/MariaDB.
- Email delivery is configured, with failures logged without data loss.
- Public registration is disabled.
- Admin pages require authenticated, authorized, active users.
- Inquiry listing, viewing, filtering, status updates, assignment, archiving, and authorized deletion work.
- Production assets build successfully.
- Automated feature tests and agreed browser smoke tests pass.
- The application runs on the selected shared host without a persistent Node.js process.
- Deployment, backup, rollback, mail, cron, and admin-creation procedures are documented.

## 13. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Shared host cannot point the domain to `public/` | Confirm before development cutover; change host or hosting plan if secure document-root configuration is impossible. |
| Shared host has no persistent queue worker | Use database queue with cron and short-lived workers, or synchronous mail initially. |
| Visual drift during JSX conversion | Capture reference screenshots and verify every page at defined breakpoints and themes. |
| Reduced SEO without Inertia SSR | Preserve semantic content and per-page metadata; reassess SSR when infrastructure supports a Node process. |
| Spam overwhelms contact storage/mail | Use throttle, honeypot, validation, and configurable CAPTCHA. |
| Mail outage causes lost leads | Commit inquiries to the database before sending mail and expose mail status to administrators. |
| Admin authorization is implemented only in UI | Use middleware, policies, and feature tests on every protected route. |
| Future modules force major restructuring | Use domain-oriented controllers, policies, enums, query scopes, and separate public/admin layouts now. |

## 14. Recommended First Development Milestone

The first milestone should include only:

1. Laravel React/Inertia scaffold.
2. Authentication with registration disabled.
3. Administrator authorization.
4. Public layout and design tokens.
5. Home page visual migration.
6. Successful production build and initial feature tests.

Completing this vertical slice validates the stack, hosting assumptions, component-conversion pattern, theme strategy, and visual-parity workflow before migrating the remaining pages.
