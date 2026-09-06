import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  // Create regular user
  const userPassword = await bcrypt.hash("user123", 12);
  const user = await prisma.user.upsert({
    where: { email: "user@example.com" },
    update: {},
    create: {
      email: "user@example.com",
      name: "John Doe",
      password: userPassword,
      role: "USER",
    },
  });

  // Products
  const products = [
    {
      name: "Wireless Noise-Cancelling Headphones",
      description:
        "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound. Perfect for travel and work.",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      category: "Electronics",
      stock: 45,
      featured: true,
    },
    {
      name: "Minimalist Leather Backpack",
      description:
        "Handcrafted full-grain leather backpack with laptop compartment. Timeless design that ages beautifully.",
      price: 189.0,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
      category: "Accessories",
      stock: 28,
      featured: true,
    },
    {
      name: "Smart Fitness Watch",
      description:
        "Track your workouts, heart rate, sleep, and more. Water-resistant with 7-day battery life and GPS.",
      price: 249.99,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      category: "Electronics",
      stock: 67,
      featured: true,
    },
    {
      name: "Organic Cotton T-Shirt",
      description:
        "Ultra-soft 100% organic cotton t-shirt. Sustainable, comfortable, and available in multiple colors.",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      category: "Clothing",
      stock: 120,
      featured: false,
    },
    {
      name: "Ceramic Pour-Over Coffee Set",
      description:
        "Beautiful hand-thrown ceramic pour-over set. Includes dripper, server, and two cups. Perfect gift for coffee lovers.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800",
      category: "Home",
      stock: 34,
      featured: true,
    },
    {
      name: "Mechanical Keyboard",
      description:
        "Premium mechanical keyboard with hot-swappable switches, RGB lighting, and aluminum frame. Built for developers.",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800",
      category: "Electronics",
      stock: 22,
      featured: false,
    },
    {
      name: "Linen Summer Dress",
      description:
        "Breathable linen dress perfect for warm weather. Effortless elegance with a relaxed fit.",
      price: 89.0,
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      category: "Clothing",
      stock: 41,
      featured: false,
    },
    {
      name: "Portable Bluetooth Speaker",
      description:
        "Waterproof portable speaker with 360° sound and 20-hour playtime. Take the party anywhere.",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800",
      category: "Electronics",
      stock: 53,
      featured: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("✅ Seed completed successfully");
  console.log(`   Admin: admin@example.com / admin123`);
  console.log(`   User:  user@example.com / user123`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
