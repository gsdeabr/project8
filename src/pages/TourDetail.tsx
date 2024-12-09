import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star, Clock, Check, Users, Globe } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

export const TourDetail: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem);

  // In a real app, fetch tour data based on ID
  const tour = {
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
      'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4'
    ],
    rating: 4.9,
    reviews: 128,
    included: [
      'Professional bilingual guide',
      'Museum entrance fees',
      'Traditional lunch',
      'Local transportation',
      'WeChat support'
    ],
    excluded: [
      'International flights',
      'Personal expenses',
      'Travel insurance'
    ],
    itinerary: [
      {
        day: 1,
        activities: [
          {
            time: '09:00',
            title: { en: 'Old Town Tour', zh: '老城区游览' },
            description: { en: 'Explore the charming streets of Vieux Nice', zh: '探索迷人的尼斯老城区街道' }
          },
          {
            time: '12:00',
            title: { en: 'Traditional Lunch', zh: '传统午餐' },
            description: { en: 'Enjoy local Niçoise cuisine', zh: '享用尼斯当地美食' }
          }
        ]
      }
    ]
  };

  const handleAddToCart = () => {
    addItem({
      id: tour.id,
      name: tour.title[i18n.language as 'en' | 'zh'],
      image: tour.images[0],
      price: tour.price,
      quantity: 1
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 gap-4">
                {tour.images.slice(0, 2).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={tour.title[i18n.language as 'en' | 'zh']}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                ))}
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-4">
                  {tour.title[i18n.language as 'en' | 'zh']}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Nice, France
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {tour.duration} {t('common.days')}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {tour.rating} ({tour.reviews} reviews)
                  </span>
                </div>
                <p className="text-gray-600">
                  {tour.description[i18n.language as 'en' | 'zh']}
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Daily Itinerary</h2>
                {tour.itinerary.map((day) => (
                  <div key={day.day} className="mb-6">
                    <h3 className="font-medium mb-3">Day {day.day}</h3>
                    <div className="space-y-4">
                      {day.activities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 rounded-lg">
                          <Clock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <div>
                            <div className="font-medium">
                              {activity.time} - {activity.title[i18n.language as 'en' | 'zh']}
                            </div>
                            <p className="text-gray-600 text-sm">
                              {activity.description[i18n.language as 'en' | 'zh']}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
            >
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  €{tour.price}
                </div>
                <span className="text-gray-500">per person</span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg mb-6 hover:bg-blue-700 transition-colors"
              >
                {t('common.addToCart')}
              </button>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-500" />
                    Included
                  </h3>
                  <ul className="space-y-2">
                    {tour.included.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3">Tour Features</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      Small Group
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Globe className="w-4 h-4" />
                      Bilingual Guide
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};