import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Bell, Shield, CreditCard, Globe, Mail, Phone, 
  MessageCircle, User, Key
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const ProfileSettings: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();

  const sections = [
    {
      title: 'Account Settings',
      items: [
        { icon: User, label: 'Personal Information', href: '#personal' },
        { icon: Key, label: 'Password & Security', href: '#security' },
        { icon: Globe, label: 'Language & Region', href: '#language' }
      ]
    },
    {
      title: 'Communication',
      items: [
        { icon: Bell, label: 'Notifications', href: '#notifications' },
        { icon: Mail, label: 'Email Preferences', href: '#email' },
        { icon: MessageCircle, label: 'WeChat Settings', href: '#wechat' }
      ]
    },
    {
      title: 'Payment & Privacy',
      items: [
        { icon: CreditCard, label: 'Payment Methods', href: '#payment' },
        { icon: Shield, label: 'Privacy Settings', href: '#privacy' }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">{section.title}</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-50 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">{item.label}</div>
                        <div className="text-sm text-gray-500">
                          {t(`profile.settings.${item.label.toLowerCase()}.description`)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {t('common.edit')} →
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};