import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Palette, Utensils, ShoppingBag, Mountain, Landmark, Crown } from 'lucide-react';

interface InterestsSelectorProps {
  selected: string[];
  onChange: (interests: string[]) => void;
}

export const InterestsSelector: React.FC<InterestsSelectorProps> = ({ selected, onChange }) => {
  const { t } = useTranslation();

  const interests = [
    { id: 'culture', icon: Palette },
    { id: 'food', icon: Utensils },
    { id: 'shopping', icon: ShoppingBag },
    { id: 'nature', icon: Mountain },
    { id: 'history', icon: Landmark },
    { id: 'luxury', icon: Crown },
  ];

  const toggleInterest = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(i => i !== id)
      : [...selected, id];
    onChange(newSelected);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {interests.map(({ id, icon: Icon }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => toggleInterest(id)}
          className={`
            flex items-center gap-3 p-4 rounded-lg border-2 transition-colors
            ${selected.includes(id)
              ? 'border-blue-600 bg-blue-50'
              : 'border-gray-200 hover:border-blue-200'}
          `}
        >
          <div className={`p-2 rounded-full ${
            selected.includes(id) ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Icon className={`w-5 h-5 ${
              selected.includes(id) ? 'text-blue-600' : 'text-gray-600'
            }`} />
          </div>
          <span className={`font-medium ${
            selected.includes(id) ? 'text-blue-900' : 'text-gray-700'
          }`}>
            {t(`planner.options.${id}`)}
          </span>
        </motion.button>
      ))}
    </div>
  );
};