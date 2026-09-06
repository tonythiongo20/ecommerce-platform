import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

async function getProducts(category?: string, search?: string) {
  try {
    const where: any = {};
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const products = await prisma.product.findMany({
      where,
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

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const products = await getProducts(
    searchParams.category,
    searchParams.search
  );

  const categories = [
    "All",
    "Electronics",
    "Accessories",
    "Clothing",
    "Home",
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
        <p className="mt-2 text-gray-500">
          {products.length} product{products.length !== 1 ? "s" : ""} available
        </p>
      </div>

      {/* Search */}
      <form className="mb-8" action="/products" method="GET">
        <div className="relative max-w-md">
          <input
            type="text"
            name="search"
            defaultValue={searchParams.search || ""}
            placeholder="Search products..."
            className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>
        {searchParams.category && (
          <input type="hidden" name="category" value={searchParams.category} />
        )}
      </form>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => {
          const href =
            cat === "All"
              ? "/products"
              : `/products?category=${encodeURIComponent(cat)}`;
          const isActive =
            (cat === "All" && !searchParams.category) ||
            searchParams.category === cat;

          return (
            <Link
              key={cat}
              href={href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                isActive
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </Link>
          );
        })}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="mt-2 text-sm text-gray-400">
            Try a different search or category
          </p>
          <Link
            href="/products"
            className="mt-4 inline-block text-indigo-600 font-medium hover:text-indigo-700"
          >
            Clear filters →
          </Link>
        </div>
      )}
    </div>
  );
}
