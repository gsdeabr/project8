import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LightbulbIcon, Check } from 'lucide-react';

interface PersonalizedTipsProps {
  interests: string[];
}

export const PersonalizedTips: React.FC<PersonalizedTipsProps> = ({ interests }) => {
  const { t } = useTranslation();

  const tips = [
    {
      category: 'Cultural',
      tips: [
        'Visit the Marc Chagall Museum early in the morning to avoid crowds',
        'Book a private guided tour of the Old Town in Mandarin',
        'Try local Niçoise cuisine at La Rossettisserie'
      ]
    },
    {
      category: 'Shopping',
      tips: [
        'Best luxury shopping along Avenue Jean Médecin',
        'Tax-free shopping available at Galeries Lafayette',
        'Visit Nice Étoile for premium brands'
      ]
    },
    {
      category: 'Practical',
      tips: [
        'Download WeChat mini-program for instant translation',
        'Keep emergency contact numbers handy',
        'Best times for photos at Castle Hill: sunrise or sunset'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 rounded-full">
          <LightbulbIcon className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Personalized Travel Tips</h3>
          <p className="text-sm text-gray-600">Based on your preferences and local expertise</p>
        </div>
      </div>

      <div className="space-y-6">
        {tips.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h4 className="text-md font-medium text-gray-900 mb-3">{section.category}</h4>
            <div className="space-y-2">
              {section.tips.map((tip, tipIndex) => (
                <div key={tipIndex} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600">{tip}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};