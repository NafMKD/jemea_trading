# Migration Baseline

Captured on July 27, 2026 before the Laravel migration changed any Next.js source.

## Reference application

- Location: `jemea-trading/`
- Framework: Next.js 16.2.1, React 19.2.4, TypeScript, and Tailwind CSS 4
- Public routes: `/`, `/about`, `/products`, and `/contact`
- Dynamic route: `POST /api/contact`
- Metadata title: `Jemea Trading PLC | Ethiopian Export Excellence`
- Metadata description: `Exporting Ethiopia's finest coffee, oil seeds, and agricultural products to the world. Quality, reliability, and global professionalism.`
- Theme behavior: class-based light/dark theme, light by default, with browser persistence
- Responsive prefixes used: `sm`, `md`, and `lg`
- Contact form fields: name, email, company, product interest, and message

## Production build result

`npm run build` completed successfully.

```text
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ƒ /api/contact
├ ○ /contact
└ ○ /products

○ Static: prerendered as static content
ƒ Dynamic: server-rendered on demand
```

The four public pages are static. The contact POST route is the only server-dependent route.

## Visual references

The screenshots are viewport references captured at:

- Mobile: 375 × 812
- Desktop: 1440 × 1000
- Themes: light and dark

The default theme was changed only during the dark screenshot build and restored immediately afterward. The Next.js source has no resulting diff.

- [`about-desktop-dark.png`](screenshots/about-desktop-dark.png)
- [`about-desktop-light.png`](screenshots/about-desktop-light.png)
- [`about-mobile-dark.png`](screenshots/about-mobile-dark.png)
- [`about-mobile-light.png`](screenshots/about-mobile-light.png)
- [`contact-desktop-dark.png`](screenshots/contact-desktop-dark.png)
- [`contact-desktop-light.png`](screenshots/contact-desktop-light.png)
- [`contact-mobile-dark.png`](screenshots/contact-mobile-dark.png)
- [`contact-mobile-light.png`](screenshots/contact-mobile-light.png)
- [`home-desktop-dark.png`](screenshots/home-desktop-dark.png)
- [`home-desktop-light.png`](screenshots/home-desktop-light.png)
- [`home-mobile-dark.png`](screenshots/home-mobile-dark.png)
- [`home-mobile-light.png`](screenshots/home-mobile-light.png)
- [`products-desktop-dark.png`](screenshots/products-desktop-dark.png)
- [`products-desktop-light.png`](screenshots/products-desktop-light.png)
- [`products-mobile-dark.png`](screenshots/products-mobile-dark.png)
- [`products-mobile-light.png`](screenshots/products-mobile-light.png)

## Image inventory

The reference application contains 33 public image files totaling approximately 29 MB.

- `bag_of_peanut_coffe_seeds.png` — 297.9 KB
- `byd_land_cruiser_sino_truck_cars.png` — 676.8 KB
- `castor.svg` — 1.6 KB
- `castor_seeds.png` — 1534.8 KB
- `castor_seeds_hd.png` — 1534.8 KB
- `coffe_bag_roll.png` — 99.9 KB
- `coffee.svg` — 1.9 KB
- `coffee_beans.png` — 1274.6 KB
- `coffee_beans_hd.png` — 1274.6 KB
- `ethiopian_map_in_africa_map.png` — 251.5 KB
- `green_mung_beans.png` — 1121.5 KB
- `green_mung_beans_hd.png` — 1121.5 KB
- `hero_image.png` — 629.3 KB
- `logo.jpg` — 45.3 KB
- `mung-beans.svg` — 1.5 KB
- `niger_seeds.png` — 1614.6 KB
- `niger_seeds_hd.png` — 1614.6 KB
- `niger-seeds.svg` — 1.8 KB
- `peanut_beans.png` — 1484.9 KB
- `peanut_beans_hd.png` — 1484.9 KB
- `peanuts.svg` — 1.6 KB
- `pigeon_pea.png` — 1545.2 KB
- `polymer_and_plastic_raw_materials.png` — 756.9 KB
- `running_horses.png` — 3168.2 KB
- `sesame.svg` — 1.8 KB
- `sesame_seeds.png` — 1255.7 KB
- `sesame_seeds_hd.png` — 1255.7 KB
- `sino_truck_lorry.png` — 126.9 KB
- `soya.svg` — 1.2 KB
- `soya_beans.png` — 1054.9 KB
- `soya_beans_hd.png` — 1054.9 KB
- `top_view_of_addis_ababa.png` — 1092.2 KB
- `vehicle_imports_hd.png` — 2339.4 KB

The repeated standard/HD files and multi-megabyte PNGs are optimization candidates in Phase 6. They must not be replaced or recompressed during the parity migration without comparison against this baseline.

## Local prerequisites

| Requirement | Local result |
|---|---|
| PHP | 8.4.19 |
| Laravel minimum PHP | Satisfied (`^8.3`) |
| Node.js | 22.12.0 |
| npm | 10.3.0 |
| Composer | Updated to 2.10.2 |
| PDO MySQL / MySQLi | Available |
| cURL / OpenSSL | Available |
| DOM / XML | Available |
| Mbstring / Intl | Available |
| Fileinfo / GD | Available |
| ZIP | Available |

Node 22.12 is slightly below one lint dependency's declared `22.13` minimum. Production assets can still be built locally, but development Node should be updated to at least 22.13 before treating lint results as authoritative.

## Shared-hosting gates

The hosting provider is not connected to this workspace. These requirements remain explicit pre-deployment checks:

| Capability | Required state | Current status |
|---|---|---|
| PHP | 8.3 or newer | Unconfirmed |
| PHP extensions | PDO MySQL, Mbstring, OpenSSL, Tokenizer, XML, cURL, Fileinfo, Intl | Unconfirmed |
| Database | MySQL or MariaDB with a restricted application user | Unconfirmed |
| Document root | Must point to Laravel `public/` | Unconfirmed |
| Composer/SSH | Available on host, or optimized vendor artifacts may be uploaded | Unconfirmed |
| Cron | One-minute scheduler support preferred | Unconfirmed |
| SMTP | Authenticated outbound SMTP permitted | Unconfirmed |
| HTTPS | Certificate and forced HTTPS available | Unconfirmed |
| Writable paths | Laravel `storage/` and `bootstrap/cache/` | Unconfirmed |

Do not schedule production cutover until every row is confirmed with the selected provider.
