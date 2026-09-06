import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "ShopHub – Modern E-Commerce",
  description:
    "A full-stack e-commerce platform built with Next.js, Prisma, PostgreSQL and Stripe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-200 bg-white py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
            <p>
              © {new Date().getFullYear()} ShopHub. Built with Next.js, Prisma &
              Stripe.
            </p>
            <p className="mt-1">
              Demo credentials:{" "}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                user@example.com / user123
              </code>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
