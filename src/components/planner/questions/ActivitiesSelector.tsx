import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Camera, Bike, Fish, Music, Book, ShoppingBag } from 'lucide-react';

interface ActivitiesSelectorProps {
  selected: string[];
  onChange: (activities: string[]) => void;
}

export const ActivitiesSelector: React.FC<ActivitiesSelectorProps> = ({ selected, onChange }) => {
  const { t } = useTranslation();

  const activities = [
    {
      id: 'photo',
      icon: Camera,
      title: 'Photography Tour',
      time: '3 hours',
      image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600'
    },
    {
      id: 'bike',
      icon: Bike,
      title: 'Bike Tour',
      time: '2 hours',
      image: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=600'
    },
    {
      id: 'beach',
      icon: Fish,
      title: 'Beach Activities',
      time: 'Flexible',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600'
    },
    {
      id: 'concert',
      icon: Music,
      title: 'Live Music',
      time: 'Evening',
      image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=600'
    },
    {
      id: 'museum',
      icon: Book,
      title: 'Museum Visit',
      time: '2-3 hours',
      image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=600'
    },
    {
      id: 'shopping',
      icon: ShoppingBag,
      title: 'Shopping Tour',
      time: '4 hours',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {activities.map(({ id, icon: Icon, title, time, image }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.02 }}
          onClick={() => {
            const newSelected = selected.includes(id)
              ? selected.filter(i => i !== id)
              : [...selected, id];
            onChange(newSelected);
          }}
          className={`relative group rounded-xl overflow-hidden ${
            selected.includes(id) ? 'ring-2 ring-blue-600' : ''
          }`}
        >
          <div className="aspect-square relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full mb-2 ${
                selected.includes(id) ? 'bg-blue-600' : 'bg-white/20'
              }`}>
                <Icon className="w-4 h-4 text-white" />
                <span className="text-sm text-white">{time}</span>
              </div>
              <h3 className="text-white font-semibold">{title}</h3>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};