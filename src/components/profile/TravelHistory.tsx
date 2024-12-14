import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Star } from 'lucide-react';

export const TravelHistory: React.FC = () => {
  const { t } = useTranslation();

  const trips = [
    {
      id: '1',
      title: t('profile.travelHistory.trips.culturalTour.title'),
      date: '2024-02-15',
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600',
      rating: 5,
      review: t('profile.travelHistory.trips.culturalTour.review')
    },
    {
      id: '2',
      title: t('profile.travelHistory.trips.rivieraTour.title'),
      date: '2023-12-20',
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600',
      rating: 4,
      review: t('profile.travelHistory.trips.rivieraTour.review')
    }
  ];

  return (
    <div className="space-y-6">
      {trips.map((trip, index) => (
        <motion.div
          key={trip.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={trip.image}
                alt={trip.title}
                className="h-48 w-full object-cover md:h-full"
              />
            </div>
            <div className="p-6 md:w-2/3">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{trip.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(trip.date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      Nice, France
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: trip.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">{trip.review}</p>
              <div className="flex gap-4">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View Details
                </button>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Write Review
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};