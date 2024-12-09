import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Star, Globe, Shield, Clock } from 'lucide-react';

interface PackageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (packageType: string) => void;
}

export const PackageModal: React.FC<PackageModalProps> = ({ isOpen, onClose, onSelect }) => {
  const { t } = useTranslation();

  const packages = [
    {
      id: 'essential',
      name: 'Essential Package',
      description: 'Perfect for independent travelers who want the basics covered',
      price: 299,
      icon: Clock,
      color: 'bg-blue-100 text-blue-600',
      features: [
        'Digital Travel Guide',
        'Emergency Contact Support',
        'Hotel Recommendations',
        'Basic Itinerary',
        'WeChat Support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Package',
      description: 'Enhanced experience with guided tours and premium services',
      price: 599,
      icon: Globe,
      color: 'bg-purple-100 text-purple-600',
      features: [
        'Personal Tour Guide (3 days)',
        '24/7 Translation Support',
        'Premium Hotels Selection',
        'Detailed Daily Itinerary',
        'Restaurant Reservations',
        'Skip-the-line Tickets',
        'Airport Transfer'
      ]
    },
    {
      id: 'luxury',
      name: 'Luxury Package',
      description: 'Ultimate luxury experience with exclusive access and VIP treatment',
      price: 999,
      icon: Star,
      color: 'bg-amber-100 text-amber-600',
      features: [
        'Private Tour Guide (Full Stay)',
        'Luxury Concierge Service',
        'Premium Transportation',
        'VIP Experience Access',
        'Fine Dining Reservations',
        'Exclusive Events Access',
        'Personal Photographer (1 day)',
        'Luxury Hotel Upgrade'
      ]
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-white rounded-xl shadow-2xl md:w-[800px] md:max-h-[80vh] overflow-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Select Your Travel Package</h2>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {packages.map((pkg) => {
                const Icon = pkg.icon;
                return (
                  <motion.div
                    key={pkg.id}
                    whileHover={{ scale: 1.01 }}
                    className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${pkg.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{pkg.name}</h3>
                          <p className="text-gray-600 mt-1">{pkg.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">€{pkg.price}</div>
                        <div className="text-sm text-gray-500">{t('common.perPerson')}</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-3 mb-4">
                      {pkg.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onSelect(pkg.id)}
                      className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                      Select {pkg.name}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};