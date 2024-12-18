import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Shield, Heart, Star, Clock } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const { t } = useTranslation();

  const reasons = [
    {
      icon: Shield,
      title: t('home.whyChooseUs.reasons.safety.title'),
      description: t('home.whyChooseUs.reasons.safety.description')
    },
    {
      icon: Heart,
      title: t('home.whyChooseUs.reasons.personalized.title'),
      description: t('home.whyChooseUs.reasons.personalized.description')
    },
    {
      icon: Star,
      title: t('home.whyChooseUs.reasons.premium.title'),
      description: t('home.whyChooseUs.reasons.premium.description')
    },
    {
      icon: Clock,
      title: t('home.whyChooseUs.reasons.flexible.title'),
      description: t('home.whyChooseUs.reasons.flexible.description')
    }
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('home.whyChooseUs.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.whyChooseUs.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};