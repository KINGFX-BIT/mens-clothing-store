'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api from '@/lib/api';
import { Product } from '@/lib/types';

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [bestsellers, setBestsellers] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [featuredRes, bestsellersRes, newArrivalsRes] = await Promise.all([
          api.get('/products?featured=true&limit=4'),
          api.get('/products?bestseller=true&limit=4'),
          api.get('/products?newArrival=true&limit=4'),
        ]);
        setFeatured(featuredRes.data.products);
        setBestsellers(bestsellersRes.data.products);
        setNewArrivals(newArrivalsRes.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Premium Men&apos;s Clothing</h1>
          <p className="text-xl mb-8">Discover the latest trends in men&apos;s fashion</p>
          <Link
            href="/products"
            className="bg-white text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-slate-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover"
                  unoptimized
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-2">{product.brand}</p>
                  <p className="font-bold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Bestsellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellers.map((product) => (
              <Link key={product._id} href={`/products/${product._id}`}>
                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={400}
                    height={256}
                    className="w-full h-64 object-cover"
                    unoptimized
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{product.name}</h3>
                    <p className="text-slate-600 text-sm mb-2">{product.brand}</p>
                    <p className="font-bold">${product.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">New Arrivals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={400}
                  height={256}
                  className="w-full h-64 object-cover"
                  unoptimized
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-2">{product.name}</h3>
                  <p className="text-slate-600 text-sm mb-2">{product.brand}</p>
                  <p className="font-bold">${product.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
