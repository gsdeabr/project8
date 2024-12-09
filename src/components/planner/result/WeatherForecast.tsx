import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, Wind } from 'lucide-react';

interface WeatherForecastProps {
  startDate: Date | null;
  endDate: Date | null;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({ startDate, endDate }) => {
  const { t } = useTranslation();

  const forecast = [
    { icon: Sun, temp: 24, condition: 'Sunny', humidity: 65 },
    { icon: Cloud, temp: 22, condition: 'Partly Cloudy', humidity: 70 },
    { icon: Sun, temp: 25, condition: 'Sunny', humidity: 60 },
    { icon: CloudRain, temp: 20, condition: 'Light Rain', humidity: 75 },
    { icon: Sun, temp: 23, condition: 'Sunny', humidity: 68 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h3 className="text-lg font-semibold mb-4">Expected Weather</h3>
      <div className="grid grid-cols-5 gap-4">
        {forecast.map((day, index) => {
          const Icon = day.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-2">
                <Icon className={`w-8 h-8 mx-auto ${
                  day.condition === 'Sunny' ? 'text-yellow-400' : 'text-blue-400'
                }`} />
              </div>
              <div className="text-2xl font-bold mb-1">{day.temp}°C</div>
              <div className="text-sm text-gray-600">{day.condition}</div>
              <div className="text-xs text-gray-500 flex items-center justify-center mt-1">
                <Wind className="w-3 h-3 mr-1" />
                {day.humidity}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};