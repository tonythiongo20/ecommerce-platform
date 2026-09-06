"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";

interface Props {
  productId: string;
  disabled?: boolean;
}

export default function AddToCartButton({ productId, disabled }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity }),
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to add to cart");
      }
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
          disabled={disabled}
        >
          −
        </button>
        <span className="px-4 py-3 font-medium min-w-[3rem] text-center">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="px-4 py-3 text-gray-600 hover:bg-gray-50 transition-colors"
          disabled={disabled}
        >
          +
        </button>
      </div>

      <button
        onClick={handleAdd}
        disabled={disabled || loading}
        className={`flex-1 flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold transition-all ${
          success
            ? "bg-green-600 text-white"
            : "bg-indigo-600 text-white hover:bg-indigo-700"
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {success ? (
          <>
            <Check className="w-5 h-5" />
            Added to cart
          </>
        ) : (
          <>
            <ShoppingCart className="w-5 h-5" />
            {loading ? "Adding..." : "Add to cart"}
          </>
        )}
      </button>
    </div>
  );
}
