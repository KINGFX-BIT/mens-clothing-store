import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, size: string, color: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity, size, color) => {
        const items = get().items;
        const existingItem = items.find(
          (item) =>
            item.product._id === product._id &&
            item.size === size &&
            item.color === color
        );

        if (existingItem) {
          set({
            items: items.map((item) =>
              item === existingItem
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
          });
        } else {
          set({
            items: [...items, { product, quantity, size, color, _id: `${product._id}-${size}-${color}` }],
          });
        }
      },

      removeItem: (itemId) => {
        set({
          items: get().items.filter((item) => item._id !== itemId),
        });
      },

      updateQuantity: (itemId, quantity) => {
        set({
          items: get().items.map((item) =>
            item._id === itemId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      getItemsCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
