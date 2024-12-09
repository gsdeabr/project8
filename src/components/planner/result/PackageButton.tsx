import React from 'react';
import { useTranslation } from 'react-i18next';
import { Package } from 'lucide-react';

interface PackageButtonProps {
  onClick: () => void;
}

export const PackageButton: React.FC<PackageButtonProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      className="fixed right-6 top-24 z-30 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
    >
      <Package className="w-5 h-5" />
      {t('common.select')} {t('planner.result.packages')}
    </button>
  );
};