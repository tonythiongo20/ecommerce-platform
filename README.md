# 🛒 ShopHub – Full-Stack E-Commerce Platform

A modern, production-ready e-commerce application built with **Next.js 14**, **Prisma**, **PostgreSQL**, **JWT authentication**, and **Stripe**.

> Complete online store with product catalog, shopping cart, user authentication, and secure payment integration.

---

## ✨ Features

- **Product catalog** with categories, search, and featured products
- **Shopping cart** with quantity management (server-side)
- **User authentication** – Register / Login with JWT (httpOnly cookies)
- **Stripe Checkout** integration for secure payments
- **Responsive design** – mobile-first with Tailwind CSS
- **Type-safe** end-to-end with TypeScript + Zod validation
- **Prisma ORM** with PostgreSQL
- Seed data included for quick demo

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| Backend    | Next.js API Routes                  |
| Database   | PostgreSQL + Prisma ORM             |
| Auth       | JWT (jose) + bcryptjs               |
| Payments   | Stripe Checkout                     |
| Validation | Zod                                 |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL running locally (or a free cloud instance like Neon / Supabase)
- Stripe account (test keys are fine)

### 1. Clone & Install

```bash
git clone https://github.com/tonythiongo20/ecommerce-platform.git
cd ecommerce-platform

# The full application lives in the frontend/ folder
cd frontend
npm install
```

### 2. Environment Variables

```bash
cp .env.example .env
```

Edit `.env` and fill in:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ecommerce"
JWT_SECRET="your-super-secret-jwt-key-at-least-32-chars"
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

### 3. Database Setup

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Demo Credentials

| Role  | Email               | Password  |
|-------|---------------------|-----------|
| User  | user@example.com    | user123   |
| Admin | admin@example.com   | admin123  |

---

## 📁 Project Structure

```
ecommerce-platform/
├── frontend/                  ← Main application
│   ├── prisma/
│   │   ├── schema.prisma      # Database models
│   │   └── seed.ts            # Demo products + users
│   ├── src/
│   │   ├── app/
│   │   │   ├── api/           # Auth, products, cart, checkout
│   │   │   ├── products/      # Product listing & detail
│   │   │   ├── cart/          # Shopping cart
│   │   │   ├── login/         # Auth pages
│   │   │   └── checkout/      # Success page
│   │   ├── components/        # UI components
│   │   ├── lib/               # Prisma, auth, Stripe helpers
│   │   └── types/             # Shared TypeScript types
│   ├── .env.example
│   └── package.json
└── README.md
```

---

## 🧪 Key API Routes

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| POST   | `/api/auth/register`  | Create account             |
| POST   | `/api/auth/login`     | Login & set JWT cookie     |
| POST   | `/api/auth/logout`    | Clear session              |
| GET    | `/api/auth/me`        | Current user               |
| GET    | `/api/products`       | List products (filterable) |
| GET    | `/api/products/[id]`  | Product detail             |
| GET    | `/api/cart`           | Get cart items             |
| POST   | `/api/cart`           | Add to cart                |
| PATCH  | `/api/cart`           | Update quantity            |
| DELETE | `/api/cart`           | Remove item / clear cart   |
| POST   | `/api/checkout`       | Create Stripe session      |

---

## 📝 Notes for Production

- Add a Stripe webhook to mark orders as `PAID` and clear the cart
- Use a proper secret management solution
- Enable HTTPS and set `secure: true` on cookies
- Add rate limiting and input sanitization
- Consider NextAuth.js or Clerk for more advanced auth needs

---

## Why this project?

This codebase demonstrates a complete, real-world full-stack flow:

1. Type-safe database access with Prisma
2. Secure authentication using JWT stored in httpOnly cookies
3. Server-side cart management tied to authenticated users
4. Real payment processing via Stripe Checkout
5. Clean, modern UI with Tailwind CSS and thoughtful UX

It is designed to be a strong portfolio piece and a solid foundation that can be extended into a production application.

---

## License

Boost Software License 1.0
