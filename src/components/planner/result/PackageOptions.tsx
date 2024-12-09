import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, Star, Globe, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const PackageOptions: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const packages = [
    {
      id: 'essential',
      name: 'Essential',
      price: 299,
      icon: Shield,
      color: 'bg-blue-100 text-blue-600',
      features: [
        'Digital Travel Guide',
        'Emergency Contact Support',
        'Hotel Recommendations',
        'Basic Itinerary',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
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
      ],
    },
    {
      id: 'luxury',
      name: 'Luxury',
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
      ],
    },
  ];

  const handleSelectPackage = (packageId: string) => {
    navigate(`/packages?selected=${packageId}`, { replace: true });
  };

  return (
    <div className="p-6 border-t border-gray-200">
      <h3 className="text-xl font-semibold mb-6">Available Travel Packages</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const Icon = pkg.icon;
          return (
            <div
              key={pkg.id}
              className="rounded-xl border border-gray-200 p-6 hover:border-blue-300 transition-all hover:shadow-lg bg-white"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${pkg.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-semibold">{pkg.name}</h4>
              </div>
              <div className="mb-4">
                <span className="text-3xl font-bold text-blue-600">€{pkg.price}</span>
                <span className="text-gray-500">/person</span>
              </div>
              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleSelectPackage(pkg.id)}
                className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 font-medium"
              >
                Select {pkg.name}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};