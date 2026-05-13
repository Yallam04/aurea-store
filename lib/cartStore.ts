import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // <-- NEW: Import the persistence tool

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  material: string;
  bg_color: string;
  qty: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (item: any) => void;
  removeFromCart: (id: number) => void;
  updateQty: (id: number, qty: number) => void;
  clearCart: () => void;
}

// Wrap the entire store in the persist() function
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      
      addToCart: (item) => set((state) => {
        const existing = state.cart.find((i) => i.id === item.id);
        if (existing) {
          return { cart: state.cart.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
        }
        return { cart: [...state.cart, { ...item, qty: 1 }] };
      }),

      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter((i) => i.id !== id)
      })),

      updateQty: (id, qty) => set((state) => ({
        cart: state.cart.map((i) => i.id === id ? { ...i, qty: Math.max(1, qty) } : i)
      })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'aurea-cart-storage', // <-- This is the secret name saved in the browser!
    }
  )
);