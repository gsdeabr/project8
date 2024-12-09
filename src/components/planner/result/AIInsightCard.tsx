import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Brain, ChevronRight } from 'lucide-react';

interface AIInsightProps {
  insights: {
    category: string;
    text: string;
    confidence: number;
  }[];
}

export const AIInsightCard: React.FC<AIInsightProps> = ({ insights }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-blue-100 rounded-full">
          <Brain className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">AI Travel Insights</h3>
          <p className="text-sm text-gray-600">Personalized recommendations based on your preferences</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">{insight.category}</span>
              <div className="flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-500">{insight.confidence}% match</span>
              </div>
            </div>
            <p className="text-gray-700">{insight.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};