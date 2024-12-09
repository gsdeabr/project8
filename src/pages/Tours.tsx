import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { TourFilters } from '../components/tours/TourFilters';
import { TourCard } from '../components/tours/TourCard';
import type { Tour } from '../types';

export const Tours: React.FC = () => {
  const { t } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [duration, setDuration] = useState(3);

  const tours: Tour[] = [
    {
      id: '1',
      title: {
        en: 'Nice Cultural Heritage Tour',
        zh: '尼斯文化遗产之旅'
      },
      description: {
        en: 'Discover the rich cultural heritage of Nice through its historic landmarks, museums, and local traditions.',
        zh: '通过历史地标、博物馆和当地传统发现尼斯丰富的文化遗产。'
      },
      price: 299,
      duration: 3,
      images: [
        'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
        'https://images.unsplash.com/photo-1534258936925-c58bed479fcb'
      ],
      rating: 4.9,
      reviews: 128,
      included: [],
      excluded: [],
      itinerary: []
    },
    {
      id: '2',
      title: {
        en: 'Luxury Shopping Experience',
        zh: '奢华购物体验'
      },
      description: {
        en: 'Enjoy a VIP shopping experience in Nice\'s most exclusive boutiques with a personal stylist.',
        zh: '在尼斯最独特的精品店享受VIP购物体验，配备个人造型师。'
      },
      price: 599,
      duration: 1,
      images: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        'https://images.unsplash.com/photo-1538332576785-8b43b4b54613'
      ],
      rating: 4.8,
      reviews: 86,
      included: [],
      excluded: [],
      itinerary: []
    }
  ];

  const filteredTours = tours.filter((tour) => {
    if (selectedFilter !== 'all' && !tour.title.en.toLowerCase().includes(selectedFilter)) {
      return false;
    }
    if (tour.price < priceRange[0] || tour.price > priceRange[1]) {
      return false;
    }
    if (duration && tour.duration !== duration) {
      return false;
    }
    return true;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Nice's Best Tours
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our carefully curated selection of tours, designed specifically for
            Chinese travelers seeking authentic experiences in Nice.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <TourFilters
              selectedFilter={selectedFilter}
              onFilterChange={setSelectedFilter}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              duration={duration}
              onDurationChange={setDuration}
            />
          </div>

          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredTours.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};