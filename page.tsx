import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/AddToCartButton";

async function getProduct(id: string) {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return null;
    return { ...product, price: Number(product.price) };
  } catch {
    return null;
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/products"
        className="text-sm text-indigo-600 hover:text-indigo-700 mb-8 inline-block"
      >
        ← Back to products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-medium text-indigo-600 uppercase tracking-wide">
            {product.category}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-4 text-sm">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full font-medium ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0
                ? `${product.stock} in stock`
                : "Out of stock"}
            </span>
            {product.featured && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-medium">
                Featured
              </span>
            )}
          </div>

          <div className="mt-10">
            <AddToCartButton
              productId={product.id}
              disabled={product.stock === 0}
            />
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Why buy from us?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Free shipping on orders over $100</li>
              <li>✓ 30-day easy returns</li>
              <li>✓ Secure payment with Stripe</li>
              <li>✓ Quality guaranteed</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
