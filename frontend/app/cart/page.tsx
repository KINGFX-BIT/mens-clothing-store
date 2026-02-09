'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store/cartStore';

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => router.push('/products')}
          className="bg-slate-900 text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item._id} className="flex gap-4 border p-4 rounded-lg">
              <Image
                src={item.product.images[0]}
                alt={item.product.name}
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded"
                unoptimized
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-slate-600">
                  Size: {item.size} | Color: {item.color}
                </p>
                <p className="font-bold">${item.product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id!, parseInt(e.target.value))
                    }
                    className="border px-2 py-1 rounded w-16"
                  />
                  <button
                    onClick={() => removeItem(item._id!)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>$10.00</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${(getTotal() * 0.08).toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>${(getTotal() + 10 + getTotal() * 0.08).toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
