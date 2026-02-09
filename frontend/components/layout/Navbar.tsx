'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import { useCartStore } from '@/lib/store/cartStore';

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { getItemsCount } = useCartStore();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            MenStore
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link href="/products" className="hover:text-slate-600">
              Products
            </Link>
            <Link href="/categories" className="hover:text-slate-600">
              Categories
            </Link>
            <Link href="/brands" className="hover:text-slate-600">
              Brands
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link href="/cart" className="relative">
                  Cart
                  {getItemsCount() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {getItemsCount()}
                    </span>
                  )}
                </Link>
                <Link href="/orders">Orders</Link>
                {user?.role === 'admin' && <Link href="/admin">Admin</Link>}
                <button onClick={logout} className="hover:text-slate-600">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register" className="bg-slate-900 text-white px-4 py-2 rounded">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
