import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sun, Moon, Clock, Calendar } from 'lucide-react';

interface SchedulePreferencesProps {
  value: {
    startTime: string;
    endTime: string;
    pace: 'relaxed' | 'balanced' | 'intensive';
  };
  onChange: (preferences: typeof value) => void;
}

export const SchedulePreferences: React.FC<SchedulePreferencesProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const paceOptions = [
    {
      id: 'relaxed',
      icon: Sun,
      title: 'Relaxed',
      description: '2-3 activities per day',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'balanced',
      icon: Clock,
      title: 'Balanced',
      description: '3-4 activities per day',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'intensive',
      icon: Calendar,
      title: 'Intensive',
      description: '4-5 activities per day',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Daily Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <select
              value={value.startTime}
              onChange={(e) => onChange({ ...value, startTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Array.from({ length: 13 }, (_, i) => i + 6).map((hour) => (
                <option key={hour} value={`${hour}:00`}>
                  {hour}:00
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <select
              value={value.endTime}
              onChange={(e) => onChange({ ...value, endTime: e.target.value })}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {Array.from({ length: 7 }, (_, i) => i + 17).map((hour) => (
                <option key={hour} value={`${hour}:00`}>
                  {hour}:00
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {paceOptions.map(({ id, icon: Icon, title, description, color }) => (
          <motion.button
            key={id}
            whileHover={{ scale: 1.02 }}
            onClick={() => onChange({ ...value, pace: id as typeof value.pace })}
            className={`p-4 rounded-xl text-left transition-all ${
              value.pace === id
                ? 'ring-2 ring-blue-600 shadow-lg'
                : 'border border-gray-200'
            }`}
          >
            <div className={`inline-flex items-center justify-center p-2 rounded-lg ${color} mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">{description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};