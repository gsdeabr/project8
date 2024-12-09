import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { AIInsightCard } from './result/AIInsightCard';
import { WeatherForecast } from './result/WeatherForecast';
import { PersonalizedTips } from './result/PersonalizedTips';
import { InteractiveMap } from './result/InteractiveMap';
import { DailyTimeline } from './result/DailyTimeline';
import { HotelCard } from './result/HotelCard';
import { PackageOptions } from './result/PackageOptions';
import { PackageModal } from './result/PackageModal';
import { PackageButton } from './result/PackageButton';
import { useNavigate } from 'react-router-dom';

interface PlanResultProps {
  plan: {
    dates: { start: Date | null; end: Date | null };
    travelers: number;
    interests: string[];
    locations: string[];
    budget: number;
  };
}

export const PlanResult: React.FC<PlanResultProps> = ({ plan }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState(1);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);

  const aiInsights = [
    {
      category: 'Cultural Preferences',
      text: "Based on your interests, we recommend focusing on historical sites in the morning when they're less crowded.",
      confidence: 92
    },
    {
      category: 'Shopping Patterns',
      text: "Premium shopping districts are best visited in the afternoon. We've scheduled luxury boutique visits accordingly.",
      confidence: 88
    },
    {
      category: 'Dining Recommendations',
      text: 'Your profile suggests a preference for authentic French cuisine with Asian fusion options available.',
      confidence: 95
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Your AI-Crafted Travel Plan</h2>
          <p className="text-blue-100">
            Perfectly tailored to your preferences using advanced AI technology
          </p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AIInsightCard insights={aiInsights} />
              <WeatherForecast
                startDate={plan.dates.start}
                endDate={plan.dates.end}
              />
              <DailyTimeline day={selectedDay} />
            </div>
            
            <div className="lg:col-span-1">
              <PersonalizedTips interests={plan.interests} />
              <InteractiveMap
                locations={plan.locations}
                day={selectedDay}
              />
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-6">Recommended Accommodations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <HotelCard
                name="Le Negresco"
                rating={5}
                price={450}
                image="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800"
              />
              <HotelCard
                name="Hyatt Regency Nice"
                rating={4}
                price={320}
                image="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800"
              />
            </div>
          </div>

          <PackageOptions />
        </div>
      </div>

      <PackageButton onClick={() => setIsPackageModalOpen(true)} />
      <PackageModal
        isOpen={isPackageModalOpen}
        onClose={() => setIsPackageModalOpen(false)}
        onSelect={(packageType) => {
          setIsPackageModalOpen(false);
          navigate(`/checkout?package=${packageType}`);
        }}
      />
    </motion.div>
  );
};