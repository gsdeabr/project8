import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { InfoCard } from '../components/info/InfoCard';
import { travelInfo } from '../data/travelInfo';

export const Info: React.FC = () => {
  const { t } = useTranslation();

  const images = {
    transport: 'https://images.unsplash.com/photo-1581262177000-8139a463e531?auto=format&fit=crop&w=800',
    dining: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800',
    shopping: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800',
    culture: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=800',
    emergency: 'https://images.unsplash.com/photo-1587746746173-cc193eef1f91?auto=format&fit=crop&w=800',
    weather: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=800'
  };

  return (
    <div className="pt-24 pb-16 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Essential Travel Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know for a smooth and enjoyable stay in Nice,
            with dedicated support for Chinese travelers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelInfo.map((section, index) => (
            <InfoCard
              key={section.id}
              icon={section.icon}
              title={section.title}
              description={section.description}
              items={section.items}
              color={section.color}
              image={images[section.id as keyof typeof images]}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center bg-white p-8 rounded-xl shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Need More Information?</h2>
          <p className="text-gray-600 mb-6">
            Our dedicated team is available 24/7 to assist you in your preferred language.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-600 transition-colors">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/WeChat_Pay_logo.svg/2560px-WeChat_Pay_logo.svg.png"
                alt="WeChat"
                className="w-6 h-6"
              />
              Contact via WeChat
            </button>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Call Support
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};