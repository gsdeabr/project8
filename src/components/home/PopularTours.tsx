import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Clock, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PopularTours: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tours = [
    {
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be',
      title: 'Nice City Highlights',
      duration: '4 hours',
      price: 129,
      rating: 4.9
    },
    {
      image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb',
      title: 'French Riviera Experience',
      duration: '8 hours',
      price: 249,
      rating: 4.8
    },
    {
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
      title: 'Luxury Shopping Tour',
      duration: '6 hours',
      price: 179,
      rating: 4.9
    }
  ];

  return (
    <section id="popular-tours" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Most Popular Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of experiences, specially curated for
            Chinese travelers seeking the best of Nice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={`${tour.image}?auto=format&fit=crop&w=800`}
                alt={tour.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {tour.duration}
                  </span>
                  <span className="flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-400" />
                    {tour.rating}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    €{tour.price}
                  </span>
                  <button 
                    onClick={() => navigate('/tours')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/tours')}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Tours
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};