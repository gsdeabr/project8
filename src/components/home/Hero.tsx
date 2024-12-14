import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Sparkles, Utensils, Building, ShoppingBag, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onStartPlanning: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPlanning }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const highlights = [
    {
      icon: Building,
      label: t('home.hero.highlights.hotels.title'),
      description: t('home.hero.highlights.hotels.description')
    },
    {
      icon: Utensils,
      label: t('home.hero.highlights.dining.title'),
      description: t('home.hero.highlights.dining.description')
    },
    {
      icon: MapPin,
      label: t('home.hero.highlights.secrets.title'),
      description: t('home.hero.highlights.secrets.description')
    },
    {
      icon: ShoppingBag,
      label: t('home.hero.highlights.shopping.title'),
      description: t('home.hero.highlights.shopping.description')
    }
  ];

  const images = [
  {
    url: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600&h=400',
    alt: t('home.hero.images.promenade')
  },
  {
    url: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600&h=400',
    alt: t('home.hero.images.oldTown')
  },
  {
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&h=400',
    alt: t('home.hero.images.architecture')
  },
  {
    url: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=600&h=400',
    alt: t('home.hero.images.beach')
  },
  {
    url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&h=400',
    alt: t('home.hero.images.market')
  }
  ];

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-32 pb-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=2000')] bg-cover bg-center opacity-10" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 mb-8">
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">{t('home.hero.rated')}</span>
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              {t('home.hero.title')}<br />
              <span className="text-blue-600">{t('home.hero.subtitle')}</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8">
              {t('home.hero.description')}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {highlights.map(({ icon: Icon, label, description }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{label}</div>
                      <div className="text-sm text-gray-500">{description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onStartPlanning}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Sparkles className="w-5 h-5" />
                {t('home.hero.startPlanning')}
              </button>
              <button 
                onClick={() => navigate('/tours')}
                className="bg-white text-gray-900 px-8 py-3 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm hover:shadow-md border border-gray-200"
              >
                <Calendar className="w-5 h-5" />
                {t('home.hero.browseTours')}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="grid grid-cols-6 gap-4 aspect-[4/3]">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative rounded-2xl overflow-hidden shadow-lg ${
                    index === 0 ? 'col-span-3 row-span-2' :
                    index === 1 ? 'col-span-3 row-span-1' :
                    index === 2 ? 'col-span-2 row-span-1' :
                    index === 3 ? 'col-span-2 row-span-1' :
                    'col-span-2 row-span-1'
                  }`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};