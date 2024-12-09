import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Users, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface PlanningModeProps {
  onSelect: (mode: 'quick' | 'standard' | 'complete') => void;
}

export const PlanningMode: React.FC<PlanningModeProps> = ({ onSelect }) => {
  const { t } = useTranslation();

  const modes = [
    {
      id: 'quick',
      icon: Clock,
      questions: 5,
      time: '2 min',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'standard',
      icon: Brain,
      questions: 10,
      time: '5 min',
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'complete',
      icon: Sparkles,
      questions: 20,
      time: '10 min',
      color: 'from-emerald-500 to-emerald-600',
    },
  ] as const;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {modes.map(({ id, icon: Icon, questions, time, color }) => (
        <motion.button
          key={id}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(id)}
          className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity group-hover:opacity-10`} />
          
          <div className="relative z-10">
            <div className="mb-4 inline-block rounded-xl bg-gray-100 p-3">
              <Icon className="h-8 w-8" />
            </div>
            
            <h3 className="mb-2 text-2xl font-bold">
              {t(`planner.modes.${id}.title`)}
            </h3>
            
            <p className="mb-4 text-gray-600">
              {t(`planner.modes.${id}.description`)}
            </p>
            
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {questions} {t('planner.questions')}
              </span>
              <span className="flex items-center">
                <Clock className="mr-1 h-4 w-4" />
                {time}
              </span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};