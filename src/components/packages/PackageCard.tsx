import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, Crown, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PackageCardProps {
  package: {
    id: string;
    name: string;
    description: string;
    price: number;
    features: string[];
    color: string;
    popular?: boolean;
  };
  index: number;
}

export const PackageCard: React.FC<PackageCardProps> = ({ package: pkg, index }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const colorClasses = {
    blue: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800',
    purple: 'from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800',
    amber: 'from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800'
  };

  const handleSelectPackage = () => {
    navigate('/checkout', { 
      state: { 
        packageId: pkg.id,
        packageName: pkg.name,
        price: pkg.price,
        features: pkg.features
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${
        pkg.popular ? 'ring-2 ring-purple-600' : ''
      }`}
    >
      {pkg.popular && (
        <div className="absolute top-4 right-4">
          <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Crown className="w-4 h-4" />
            Most Popular
          </div>
        </div>
      )}

      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
        <p className="text-gray-600 mb-4">{pkg.description}</p>
        
        <div className="mb-6">
          <span className="text-4xl font-bold">€{pkg.price}</span>
          <span className="text-gray-500">/person</span>
        </div>

        <ul className="space-y-3 mb-6">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handleSelectPackage}
          className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 text-white bg-gradient-to-r transition-all ${
            colorClasses[pkg.color as keyof typeof colorClasses]
          }`}
        >
          Select Package
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};