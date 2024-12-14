import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, User, ShoppingBag, Sparkles } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'zh' : 'en');
  };

  return (
    <header className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">NL</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-blue-900">{t('header.logo.title')}</span>
              <span className="text-sm text-blue-600">{t('header.logo.subtitle')}</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/tours" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('header.tours')}
            </Link>
            <Link 
              to="/planner" 
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4 text-yellow-500" />
              {t('header.planner')}
            </Link>
            <Link 
              to="/info" 
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('header.info')}
            </Link>
          </nav>

          <div className="flex items-center space-x-6">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={i18n.language === 'en' 
                  ? 'https://flagcdn.com/w40/gb.png'
                  : 'https://flagcdn.com/w40/cn.png'
                }
                alt={i18n.language === 'en' ? 'English' : '中文'}
                className="w-6 h-4 object-cover rounded"
              />
              <span className="text-sm font-medium text-gray-700">
                {i18n.language === 'en' ? 'EN' : '中文'}
              </span>
            </button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
                >
                  <img
                    src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=32&h=32&fit=crop'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-colors flex items-center gap-2 font-medium shadow-md hover:shadow-lg"
              >
                <User className="w-5 h-5" />
                {t('header.login')}
              </Link>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4">
              <Link 
                to="/tours"
                className="block py-3 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.tours')}
              </Link>
              <Link 
                to="/planner"
                className="block py-3 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.planner')}
              </Link>
              <Link 
                to="/info"
                className="block py-3 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('header.info')}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};