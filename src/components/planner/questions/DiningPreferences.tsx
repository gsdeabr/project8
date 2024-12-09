import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Utensils, Coffee, Wine, Star } from 'lucide-react';

interface DiningPreferencesProps {
  selected: string[];
  onChange: (preferences: string[]) => void;
}

export const DiningPreferences: React.FC<DiningPreferencesProps> = ({ selected, onChange }) => {
  const { t } = useTranslation();

  const preferences = [
    {
      id: 'local',
      icon: Utensils,
      title: 'Local French Cuisine',
      description: 'Traditional Niçoise specialties',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&h=300'
    },
    {
      id: 'fine',
      icon: Star,
      title: 'Fine Dining',
      description: 'Michelin-starred restaurants',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=600&h=300'
    },
    {
      id: 'wine',
      icon: Wine,
      title: 'Wine Tasting',
      description: 'Local wine experiences',
      image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&h=300'
    },
    {
      id: 'casual',
      icon: Coffee,
      title: 'Casual Dining',
      description: 'Cafes and bistros',
      image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=600&h=300'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {preferences.map(({ id, icon: Icon, title, description, image }) => (
        <motion.button
          key={id}
          whileHover={{ y: -4 }}
          onClick={() => {
            const newSelected = selected.includes(id)
              ? selected.filter(i => i !== id)
              : [...selected, id];
            onChange(newSelected);
          }}
          className={`relative overflow-hidden rounded-xl group ${
            selected.includes(id) ? 'ring-2 ring-blue-600' : ''
          }`}
        >
          <div className="aspect-[2/1] relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="flex items-center gap-2 text-white mb-1">
                <div className={`p-2 rounded-full ${
                  selected.includes(id) ? 'bg-blue-600' : 'bg-white/20'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-semibold">{title}</h3>
              </div>
              <p className="text-sm text-white/80">{description}</p>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};