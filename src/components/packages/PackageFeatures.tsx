import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Users, CreditCard, HeadphonesIcon, Camera, Car } from 'lucide-react';

export const PackageFeatures: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Globe,
      title: 'Bilingual Support',
      description: 'All services available in Chinese and English'
    },
    {
      icon: Users,
      title: 'Expert Local Guides',
      description: 'Professional guides who understand Chinese culture'
    },
    {
      icon: CreditCard,
      title: 'Flexible Payment',
      description: 'WeChat Pay, Alipay, and international cards accepted'
    },
    {
      icon: HeadphonesIcon,
      title: '24/7 Assistance',
      description: 'Round-the-clock support in your language'
    },
    {
      icon: Camera,
      title: 'Photo Service',
      description: 'Professional photography for your memories'
    },
    {
      icon: Car,
      title: 'Premium Transport',
      description: 'Comfortable and reliable transportation'
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        Included in Every Package
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};