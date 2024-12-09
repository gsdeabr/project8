import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Euro } from 'lucide-react';

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const BudgetSlider: React.FC<BudgetSliderProps> = ({ value, onChange }) => {
  const { t } = useTranslation();
  const [isDragging, setIsDragging] = useState(false);

  const budgetRanges = [
    { label: 'Budget', value: 100, color: 'from-green-500 to-green-600' },
    { label: 'Comfort', value: 300, color: 'from-blue-500 to-blue-600' },
    { label: 'Luxury', value: 500, color: 'from-purple-500 to-purple-600' },
    { label: 'Ultra-Luxury', value: 1000, color: 'from-amber-500 to-amber-600' },
  ];

  const getCurrentRange = () => {
    return budgetRanges.find((range, index) => {
      const nextRange = budgetRanges[index + 1];
      return !nextRange || value < nextRange.value;
    }) || budgetRanges[budgetRanges.length - 1];
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={false}
        animate={{ scale: isDragging ? 1.02 : 1 }}
        className="p-4 rounded-lg border border-gray-200 bg-white"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-full">
            <Euro className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">€{value} {t('planner.perPerson')}</p>
            <p className="text-sm text-gray-500">{getCurrentRange().label}</p>
          </div>
        </div>

        <input
          type="range"
          min="100"
          max="1000"
          step="50"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />

        <div className="flex justify-between mt-2 text-sm text-gray-500">
          {budgetRanges.map((range) => (
            <span key={range.value}>€{range.value}</span>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {budgetRanges.map((range) => (
          <button
            key={range.value}
            onClick={() => onChange(range.value)}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors
              ${value === range.value
                ? 'border-blue-600 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 text-gray-600'}`}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};