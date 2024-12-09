import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface InfoSectionProps {
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  color: string;
  delay?: number;
}

export const InfoSection: React.FC<InfoSectionProps> = ({
  icon: Icon,
  title,
  description,
  items,
  color,
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`p-2 ${color} rounded-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-blue-600 mt-1">•</span>
            <span className="text-gray-700">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};