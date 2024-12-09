import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { PackageCard } from '../components/packages/PackageCard';
import { PackageComparison } from '../components/packages/PackageComparison';
import { PackageFeatures } from '../components/packages/PackageFeatures';
import { PackageFAQ } from '../components/packages/PackageFAQ';

export const Packages: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedPackageId = searchParams.get('selected');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPackageId) {
      setSelectedPackage(selectedPackageId);
      const element = document.getElementById(selectedPackageId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [selectedPackageId]);

  const packages = [
    {
      id: 'essential',
      name: 'Essential Package',
      description: 'Perfect for independent travelers who want the basics covered',
      price: 299,
      features: [
        'Digital Travel Guide',
        'Emergency Contact Support',
        'Hotel Recommendations',
        'Basic Itinerary',
        'WeChat Support'
      ],
      color: 'blue'
    },
    {
      id: 'premium',
      name: 'Premium Package',
      description: 'Enhanced experience with guided tours and premium services',
      price: 599,
      features: [
        'Personal Tour Guide (3 days)',
        '24/7 Translation Support',
        'Premium Hotels Selection',
        'Detailed Daily Itinerary',
        'Restaurant Reservations',
        'Skip-the-line Tickets',
        'Airport Transfer'
      ],
      color: 'purple',
      popular: true
    },
    {
      id: 'luxury',
      name: 'Luxury Package',
      description: 'Ultimate luxury experience with exclusive access and VIP treatment',
      price: 999,
      features: [
        'Private Tour Guide (Full Stay)',
        'Luxury Concierge Service',
        'Premium Transportation',
        'VIP Experience Access',
        'Fine Dining Reservations',
        'Exclusive Events Access',
        'Personal Photographer (1 day)',
        'Luxury Hotel Upgrade'
      ],
      color: 'amber'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Package
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select from our carefully curated packages designed to provide the perfect
            Nice experience for Chinese travelers. Each package includes bilingual
            support and WeChat/Alipay payment options.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {packages.map((pkg, index) => (
            <div key={pkg.id} id={pkg.id}>
              <PackageCard
                package={pkg}
                index={index}
              />
            </div>
          ))}
        </div>

        <PackageFeatures />
        <PackageComparison packages={packages} />
        <PackageFAQ />
      </div>
    </div>
  );
};