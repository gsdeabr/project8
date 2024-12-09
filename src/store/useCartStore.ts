import { create } from 'zustand';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  date?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,
  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          total: state.total + item.price,
        };
      }
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    }),
  updateQuantity: (id, quantity) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;
      const quantityDiff = quantity - item.quantity;
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity } : i
        ),
        total: state.total + item.price * quantityDiff,
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id);
      if (!item) return state;
      return {
        items: state.items.filter((i) => i.id !== id),
        total: state.total - item.price * item.quantity,
      };
    }),
  clearCart: () => set({ items: [], total: 0 }),
}));