import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Users, CreditCard, HeadphonesIcon } from 'lucide-react';

export const Features: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Globe,
      title: 'Bilingual Support',
      description: 'Full Chinese and English language support throughout your journey',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Users,
      title: 'Local Expertise',
      description: 'Expert guides who understand both Chinese and French cultures',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: CreditCard,
      title: 'Easy Payments',
      description: 'Support for WeChat Pay, Alipay, and international cards',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Assistance',
      description: 'Round-the-clock support in your preferred language',
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Nice Luxury?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We specialize in creating unforgettable experiences for Chinese travelers,
              combining luxury with authentic local culture.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};