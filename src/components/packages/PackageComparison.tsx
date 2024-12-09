import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

interface PackageComparisonProps {
  packages: Array<{
    id: string;
    name: string;
    features: string[];
  }>;
}

export const PackageComparison: React.FC<PackageComparisonProps> = ({ packages }) => {
  const { t } = useTranslation();

  const allFeatures = [
    'Digital Travel Guide',
    'Emergency Support',
    'Hotel Recommendations',
    'Itinerary Planning',
    'Tour Guide Service',
    'Translation Support',
    'Restaurant Reservations',
    'Skip-the-line Access',
    'Airport Transfer',
    'Luxury Transportation',
    'VIP Experiences',
    'Personal Photographer'
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">Package Comparison</h2>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-4 border-b">
          <div className="p-4 font-medium">Features</div>
          {packages.map((pkg) => (
            <div key={pkg.id} className="p-4 font-medium text-center border-l">
              {pkg.name}
            </div>
          ))}
        </div>

        {allFeatures.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.05 }}
            className="grid grid-cols-4 border-b last:border-b-0"
          >
            <div className="p-4">{feature}</div>
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-4 text-center border-l">
                {pkg.features.includes(feature) ? (
                  <Check className="w-5 h-5 text-green-500 mx-auto" />
                ) : (
                  <X className="w-5 h-5 text-gray-300 mx-auto" />
                )}
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};