import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Filter, Calendar, Euro, Users } from 'lucide-react';

interface TourFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  duration: number;
  onDurationChange: (duration: number) => void;
}

export const TourFilters: React.FC<TourFiltersProps> = ({
  selectedFilter,
  onFilterChange,
  priceRange,
  onPriceChange,
  duration,
  onDurationChange
}) => {
  const { t } = useTranslation();

  const filters = [
    { id: 'all', label: 'All Tours' },
    { id: 'cultural', label: 'Cultural' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'culinary', label: 'Culinary' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'photography', label: 'Photography' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6 mb-8"
    >
      <div className="space-y-6">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Filter className="w-5 h-5" />
            {t('tours.filters.categories')}
          </h3>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => onFilterChange(filter.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedFilter === filter.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Euro className="w-5 h-5" />
            {t('tours.filters.price')}
          </h3>
          <div className="px-4">
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>€{priceRange[0]}</span>
              <span>€{priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Calendar className="w-5 h-5" />
            {t('tours.filters.duration')}
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[1, 3, 5, 7].map((days) => (
              <button
                key={days}
                onClick={() => onDurationChange(days)}
                className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                  duration === days
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {days} {t('common.days')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};