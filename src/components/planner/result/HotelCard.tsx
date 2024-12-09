import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, MapPin } from 'lucide-react';

interface HotelCardProps {
  name: string;
  rating: number;
  price: number;
  image: string;
}

export const HotelCard: React.FC<HotelCardProps> = ({ name, rating, price, image }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-all hover:shadow-lg">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h4 className="text-lg font-semibold mb-2">{name}</h4>
        <div className="flex items-center gap-2 mb-2">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
          ))}
        </div>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">Promenade des Anglais, Nice</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-blue-600">€{price}</span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            {t('common.bookNow')}
          </button>
        </div>
      </div>
    </div>
  );
};