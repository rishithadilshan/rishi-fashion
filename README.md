# Rishi Fashion — Vue 3 SPA (CS3404 Mini Project)

A data-driven Single Page Application for a batik saree e-commerce store, built with **Vue 3 (Composition API)**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Pinia**. Product data is consumed live from [DummyJSON](https://dummyjson.com).

## Tech Stack
- Vue 3 + `<script setup>` Composition API
- TypeScript (strict mode, no `any`)
- Vite
- Tailwind CSS
- Vue Router (dynamic `/product/:id` route)
- Pinia (cart + auth global state)
- Axios (typed HTTP client)

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Features Implemented

- **Product listing** — fetches `/products` from DummyJSON and renders a responsive grid (`ProductGrid.vue` / `ProductCard.vue`).
- **Category filter & search** — `FilterBar.vue` filters by category (`/products/category/:slug`) or free-text search (`/products/search`), plus a client-side price sort.
- **Product detail view** — dynamic route `/product/:id` with image gallery, tabs (Description / Additional Info / Reviews / Shipping), and a related-products rail.
- **Authentication simulation (bonus)** — `/auth/login` against DummyJSON, JWT `accessToken` stored, `Log In` / `Log Out` state reflected in the navbar. Demo credentials: `emilys` / `emilyspass`.
- **Shopping cart (bonus)** — Pinia store persisted to `localStorage`, survives page reloads, with quantity controls and running totals.
- **Dynamic routing (bonus)** — Vue Router handles Home, Product Detail, Login, Cart, Checkout, and Payment views.
- **Dark mode (bonus)** — toggle in the navbar using Tailwind's `dark:` variant.
- **Checkout & payment flow** — recreates the Figma "Order Place" and "Payment Details" screens, including a success confirmation state.

## Component Hierarchy

```
App.vue
├── NavBar.vue            (search, cart badge, auth state, dark-mode toggle)
├── RouterView
│   ├── HomeView.vue
│   │   ├── FilterBar.vue
│   │   └── ProductGrid.vue
│   │       └── ProductCard.vue (× N)
│   ├── ProductDetailView.vue
│   │   └── ProductCard.vue (related products)
│   ├── LoginView.vue
│   ├── CartView.vue
│   ├── CheckoutView.vue
│   └── PaymentView.vue
└── SiteFooter.vue
```

State flows down via props (`Product`, `CategoryOption` typed objects) and up via typed `emit` events (e.g. `add-to-cart`). Cross-cutting state (cart contents, auth session) lives in Pinia stores (`src/stores/cart.ts`, `src/stores/auth.ts`) rather than being drilled through props.

## Project Structure

```
src/
  components/   Reusable presentational components
  views/         Route-level pages
  stores/        Pinia stores (cart, auth)
  services/      Typed API layer (axios)
  types/         Strict TypeScript interfaces for API data
  router/        Vue Router configuration
```

## Notes
- Data domain: DummyJSON's `womens-dresses`, `womens-bags`, `womens-jewellery`, and `womens-shoes` categories stand in for the saree/accessories catalogue shown in the Figma design.
- `Report.pdf` and `prompts.txt` (AI usage log) are included per the assignment's submission requirements.
