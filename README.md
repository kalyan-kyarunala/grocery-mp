# TNG Grocer — Mini Program

A grocery delivery mini-program for the TNG (Touch 'n Go) platform, built on the
native **Ant / Alipay mini-program** stack (`.axml` / `.acss` / `.js` / `.json`)
so it runs directly in the TNG mini-program IDE. Component-based, with a shared
design system and FontAwesome icons via the icon-font route.

## Design system
| Token | Value | Use |
|---|---|---|
| Primary | `#1A56DB` (TNG blue) | Headers, CTAs, active nav, selected states |
| Accent | `#16A34A` (green) | Prices, in-stock, positive status only |
| Font | system default | SF Pro on iOS, Roboto on Android |
| Touch target | ≥ 88rpx (44px) | All buttons, steppers, nav, toggles |

Tokens live as CSS variables in `app.acss` (`--c-primary`, `--c-accent`, `--tap`, …).
Global utility classes (`.row`, `.card`, `.chip`, `.badge`, `.price`, …) keep each
page lean — restyle the whole app from `app.acss`.

## Screens
**Customer:** home (outlets) → store (products) → product detail → cart (delivery/pickup) → checkout (TNG eWallet).
**Merchant (mobile-first, responsive):** dashboard → orders → order detail → inventory.

## Components (`/components`)
`fa-icon` (FontAwesome glyph map), `ds-button`, `qty-stepper`, `toggle-switch`,
`product-card`, `outlet-card`, `tab-bar`.

Child components report identity back through props (`id` / `data`) rather than
relying on the event object, e.g. `onChange(value, id)` — mini-program prop
callbacks only receive the arguments the child passes.

## FontAwesome
Loaded as an icon font via `@font-face` in `app.acss` (CDN `woff2`). Two setup notes:
1. In the TNG/Ant IDE, add the font CDN host to **Details → Domain whitelist**, or
   self-host the `.woff2` under `/assets` and update the `src` URL.
2. If the runtime blocks remote fonts, fall back to FontAwesome **SVGs** dropped into
   `/assets` and rendered with `<image>` — the most reliable mini-program path.

Add new icons in `components/fa-icon/index.js` (name → unicode), then use
`<fa-icon name="cart" size="34" color="#1A56DB" />`.

## Run in the TNG IDE
1. Open the project folder in the TNG / Alipay Mini IDE.
2. If it prompts for npm, use the IDE's **Build npm** (not shell `npm install`).
3. Set the simulator to a phone profile and preview from `pages/home/index`.
4. To preview the merchant flow, open `pages/merchant/dashboard/index`.

## i18n (EN / Bahasa Malaysia)
`app.js` exposes `globalData.locale`. Wire your dictionaries there; copy strings
are kept inline for now so they're easy to extract into `en` / `ms` JSON.
