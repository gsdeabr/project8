import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    date?: string;
  };
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemove }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="flex-grow">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        {item.date && (
          <p className="text-sm text-gray-600 mt-1">{item.date}</p>
        )}
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="font-semibold">€{item.price * item.quantity}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
};