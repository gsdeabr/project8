import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import type { Tour } from '../../types';

interface TourCardProps {
  tour: Tour;
}

export const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: tour.id,
      name: tour.title[i18n.language as 'en' | 'zh'],
      image: tour.images[0],
      price: tour.price,
      quantity: 1
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/tours/${tour.id}`)}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
    >
      <img
        src={tour.images[0]}
        alt={tour.title[i18n.language as 'en' | 'zh']}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          {tour.title[i18n.language as 'en' | 'zh']}
        </h3>
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Nice
          </span>
          <span className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            {tour.duration} {t('common.days')}
          </span>
          <span className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-400" />
            {tour.rating}
          </span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {tour.description[i18n.language as 'en' | 'zh']}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-blue-600">
            €{tour.price}
          </span>
          <div className="space-x-2">
            <button
              onClick={handleAddToCart}
              className="bg-blue-100 text-blue-600 p-2 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              {t('common.details')}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};