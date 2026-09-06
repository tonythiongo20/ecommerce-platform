"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Clear cart after successful payment (optional enhancement)
    // In production you'd verify the Stripe session and update order status via webhook
  }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-md">
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Payment successful!
        </h1>
        <p className="text-gray-500 mb-8">
          Thank you for your order. You will receive a confirmation email
          shortly. In a production app, a Stripe webhook would update the order
          status and clear the cart.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors"
          >
            Continue shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
