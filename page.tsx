import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { featured: true },
      take: 4,
      orderBy: { createdAt: "desc" },
    });
    return products.map((p) => ({
      ...p,
      price: Number(p.price),
    }));
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const products = await prisma.product.findMany({
      select: { category: true },
      distinct: ["category"],
    });
    return products.map((p) => p.category);
  } catch {
    return ["Electronics", "Accessories", "Clothing", "Home"];
  }
}

export default async function HomePage() {
  const [featured, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories(),
  ]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 mb-6 text-sm font-medium bg-white/20 rounded-full backdrop-blur-sm">
              New Collection Available
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
              Discover products that elevate your everyday
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-lg">
              Curated quality goods. Fast shipping. Secure checkout powered by
              Stripe.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
              >
                Shop Collection
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold rounded-xl border-2 border-white/40 text-white hover:bg-white/10 transition-all"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className="px-5 py-2.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-indigo-600 hover:text-white transition-colors"
            >
              {category}
            </Link>
          ))}
          <Link
            href="/products"
            className="px-5 py-2.5 rounded-full bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-600 hover:text-white transition-colors"
          >
            View All →
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <p className="mt-2 text-gray-500">
              Hand-picked items we think you&apos;ll love
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            View all products →
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg">No products yet</p>
            <p className="mt-2 text-sm text-gray-400">
              Run the seed script after setting up the database
            </p>
            <code className="mt-3 inline-block text-xs bg-gray-100 px-3 py-1.5 rounded text-gray-600">
              npx prisma db push && npm run db:seed
            </code>
          </div>
        )}
      </section>

      {/* Trust / Features */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl mb-4">
                🚚
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Free Shipping</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                Free delivery on all orders over $100. Fast and reliable shipping.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl mb-4">
                🔒
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Secure Checkout</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                Payments powered by Stripe. Your data is always protected.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-2xl mb-4">
                ↩️
              </div>
              <h3 className="font-semibold text-gray-900 text-lg">Easy Returns</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                30-day money-back guarantee. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
