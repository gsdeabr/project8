import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, CreditCard } from 'lucide-react';
import { CartItem } from './CartItem';
import { useCartStore } from '../../store/useCartStore';

export const Cart: React.FC = () => {
  const { t } = useTranslation();
  const { items, updateQuantity, removeItem, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl p-8 text-center">
        <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {t('cart.empty')}
        </h3>
        <p className="text-gray-600">
          {t('cart.emptyMessage')}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <ShoppingBag className="w-5 h-5" />
        {t('cart.title')}
      </h2>

      <div className="space-y-4 mb-6">
        <AnimatePresence>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeItem}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-600">{t('cart.total')}</span>
          <span className="text-2xl font-bold">€{total}</span>
        </div>

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
          <CreditCard className="w-5 h-5" />
          {t('cart.checkout')}
        </button>
      </div>
    </div>
  );
};