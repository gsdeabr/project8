import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileSettings } from '../components/profile/ProfileSettings';
import { TravelHistory } from '../components/profile/TravelHistory';
import { Cart } from '../components/profile/Cart';

export const Profile: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('settings');

  const tabs = [
    { id: 'settings', label: 'Settings' },
    { id: 'history', label: 'Travel History' },
    { id: 'cart', label: 'Shopping Cart' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ProfileHeader />
        
        <div className="mb-8">
          <div className="flex space-x-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {activeTab === 'settings' && <ProfileSettings />}
          {activeTab === 'history' && <TravelHistory />}
          {activeTab === 'cart' && <Cart />}
        </motion.div>
      </div>
    </div>
  );
};