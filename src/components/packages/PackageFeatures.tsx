import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Globe, Users, CreditCard, HeadphonesIcon, Camera, Car } from 'lucide-react';

export const PackageFeatures: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Globe,
      title: t('packages.features.items.bilingual.title'),
      description: t('packages.features.items.bilingual.description')
    },
    {
      icon: Users,
      title: t('packages.features.items.guides.title'),
      description: t('packages.features.items.guides.description')
    },
    {
      icon: CreditCard,
      title: t('packages.features.items.payment.title'),
      description: t('packages.features.items.payment.description')
    },
    {
      icon: HeadphonesIcon,
      title: t('packages.features.items.assistance.title'),
      description: t('packages.features.items.assistance.description')
    },
    {
      icon: Camera,
      title: t('packages.features.items.photo.title'),
      description: t('packages.features.items.photo.description')
    },
    {
      icon: Car,
      title: t('packages.features.items.transport.title'),
      description: t('packages.features.items.transport.description')
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        {t('packages.features.title')}
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