import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, User, Users2, GraduationCap, Heart, Building2 } from 'lucide-react';

export const TourTypes: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const tourTypes = [
    {
      id: 'individual',
      icon: User,
      title: 'Individual Tours',
      description: 'Personalized experiences tailored to your interests and schedule. Perfect for solo travelers seeking flexibility.',
      image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'small-group',
      icon: Users,
      title: 'Small Group Tours',
      description: 'Intimate groups of 4-8 people for a more social and interactive experience. Ideal for friends and like-minded travelers.',
      image: 'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'family',
      icon: Heart,
      title: 'Family Tours',
      description: 'Kid-friendly activities and accommodations designed for memorable family moments. Special rates for children.',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'school',
      icon: GraduationCap,
      title: 'School Tours',
      description: 'Educational and cultural programs for student groups. Combines learning with fun activities.',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'corporate',
      icon: Building2,
      title: 'Corporate Groups',
      description: 'Team building activities and professional events. Perfect for business retreats and incentive travel.',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800',
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'custom',
      icon: Users2,
      title: 'Custom Groups',
      description: "Fully customizable experiences for any group size. Tell us your needs, and we'll create the perfect itinerary.",
      image: 'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?auto=format&fit=crop&w=800',
      color: 'from-red-500 to-red-600'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tours for Every Type of Traveler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're traveling solo, with family, or in a group, we have the perfect
              tour experience designed just for you.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tourTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all"
                onClick={() => navigate(`/tours?type=${type.id}`)}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${type.color} text-white mb-2`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{type.title}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{type.description}</p>
                  <button 
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/planner?type=${type.id}`);
                    }}
                  >
                    Plan Your Trip
                    <Icon className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};