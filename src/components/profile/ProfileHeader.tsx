import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Settings, Bell, CreditCard, History } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const ProfileHeader: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const menuItems = [
    { icon: Settings, label: 'settings', href: '#settings' },
    { icon: Bell, label: 'notifications', href: '#notifications' },
    { icon: CreditCard, label: 'payments', href: '#payments' },
    { icon: History, label: 'history', href: '#history' },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6 mb-6">
      <div className="flex items-center gap-6">
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop'}
          alt={user?.name}
          className="w-24 h-24 rounded-xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
          <p className="text-gray-600">{user?.email}</p>
          <div className="flex gap-4 mt-4">
            {menuItems.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{t(`profile.${label}`)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};