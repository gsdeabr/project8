import React from 'react';
import { useTranslation } from 'react-i18next';
import { Clock, MapPin, Sun, Coffee, Utensils, Camera, ShoppingBag, Wine } from 'lucide-react';
import { motion } from 'framer-motion';

interface DailyTimelineProps {
  day: number;
}

export const DailyTimeline: React.FC<DailyTimelineProps> = ({ day }) => {
  const { t } = useTranslation();

  const activities = [
    {
      time: '09:00',
      title: t('planner.result.timeline.breakfast'),
      location: 'Le Negresco',
      icon: Coffee,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100'
    },
    {
      time: '10:00',
      title: t('planner.result.timeline.morning'),
      location: 'Place Massena',
      icon: Sun,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      time: '12:30',
      title: t('planner.result.timeline.lunch'),
      location: 'La Rossettisserie',
      icon: Utensils,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      time: '14:00',
      title: t('planner.result.timeline.afternoon'),
      location: 'Colline du Château',
      icon: Camera,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      time: '16:00',
      title: 'Promenade des Anglais',
      location: 'Seafront',
      icon: Sun,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      time: '18:00',
      title: t('planner.result.timeline.evening'),
      location: 'Avenue Jean Médecin',
      icon: ShoppingBag,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100'
    },
    {
      time: '20:00',
      title: t('planner.result.timeline.dinner'),
      location: 'La Terrasse',
      icon: Wine,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4 p-4 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors bg-white shadow-sm hover:shadow-md"
          >
            <div className="flex-shrink-0 w-16 text-center">
              <div className={`w-10 h-10 rounded-full ${activity.bgColor} flex items-center justify-center mx-auto mb-1`}>
                <Icon className={`w-5 h-5 ${activity.color}`} />
              </div>
              <span className="text-sm font-medium text-gray-600">{activity.time}</span>
            </div>
            <div className="flex-grow">
              <h4 className="font-medium text-gray-900">{activity.title}</h4>
              <p className="text-sm text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {activity.location}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};