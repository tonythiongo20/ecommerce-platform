# 🛒 E-Commerce Platform

A modern full-stack e-commerce application built with **Next.js**, **Node.js**, **PostgreSQL**, and **Stripe**.

> This project demonstrates a complete online store with product catalog, shopping cart, authentication, and payment integration.

---

## ✨ Features

- Product listing & detailed product pages
- Shopping cart functionality
- User authentication (Register / Login)
- Stripe payment integration
- Responsive design (mobile-friendly)
- Admin-ready structure

---

## 🛠️ Tech Stack

**Frontend**
- Next.js 14 (App Router)
- React
- TypeScript
- Tailwind CSS

**Backend**
- Node.js + Express
- PostgreSQL
- Prisma ORM

**Payments**
- Stripe

**Other**
- JWT Authentication
- Docker (optional)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Stripe account (for payments)

### Installation

```bash
 https://github.com/Tony Thiong'o/ecommerce-platform.git
cd ecommerce-platform

# Install dependencies
npm install
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
JWT_SECRET="your-secret-key"
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
