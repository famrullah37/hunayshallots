import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Hunay",
  description: "The page you're looking for wasn't found. Head back to the Hunay homepage to discover our premium fried onions.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Onion icon placeholder */}
        <div className="text-8xl mb-6">🧅</div>

        <h1 className="text-6xl font-bold text-amber-600 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you&apos;re looking for isn&apos;t available. It may
          have been moved or removed. Head back home and discover our
          premium fried onions!
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/#produk"
            className="border-2 border-amber-500 text-amber-600 hover:bg-amber-500 hover:text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
