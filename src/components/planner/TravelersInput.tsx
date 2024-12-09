import React from 'react';
import { useTranslation } from 'react-i18next';
import { Users, Plus, Minus } from 'lucide-react';

interface TravelersInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const TravelersInput: React.FC<TravelersInputProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const handleIncrement = () => {
    if (value < 20) onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 1) onChange(value - 1);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-full">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">{value} {t('planner.travelers')}</p>
            <p className="text-sm text-gray-500">{value === 1 ? t('planner.travelerSingle') : t('planner.travelerPlural')}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            disabled={value <= 1}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{value}</span>
          <button
            onClick={handleIncrement}
            disabled={value >= 20}
            className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};