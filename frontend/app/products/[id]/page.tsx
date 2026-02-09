'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import api from '@/lib/api';
import { Product } from '@/lib/types';
import { useCartStore } from '@/lib/store/cartStore';
import { useAuthStore } from '@/lib/store/authStore';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${params.id}`);
        setProduct(response.data);
        if (response.data.sizes.length > 0) setSelectedSize(response.data.sizes[0]);
        if (response.data.colors.length > 0) setSelectedColor(response.data.colors[0]);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }
    if (product) {
      addItem(product, quantity, selectedSize, selectedColor);
      toast.success('Added to cart successfully!');
    }
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            className="w-full rounded-lg"
            unoptimized
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-slate-600 mb-4">{product.brand}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.comparePrice && (
              <span className="text-slate-400 line-through ml-2">
                ${product.comparePrice}
              </span>
            )}
          </div>
          <p className="mb-6">{product.description}</p>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Size</label>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? 'bg-slate-900 text-white' : ''
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Color</label>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded ${
                    selectedColor === color ? 'bg-slate-900 text-white' : ''
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Quantity</label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border px-4 py-2 rounded w-24"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
