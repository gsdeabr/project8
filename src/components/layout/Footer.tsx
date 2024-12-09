import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Phone, 
  Mail 
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.contact')}
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+33 4 XX XX XX XX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@niceluxury.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.quickLinks')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-gray-300">
                  {t('footer.about')}
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-gray-300">
                  {t('footer.terms')}
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-gray-300">
                  {t('footer.privacy')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.payment')}
            </h3>
            <div className="flex space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Alipay_logo.png"
                alt="Alipay"
                className="h-8"
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/WeChat_Pay_logo.svg/2560px-WeChat_Pay_logo.svg.png"
                alt="WeChat Pay"
                className="h-8"
              />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t('footer.followUs')}
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-gray-300">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-800 text-center">
          <p>© 2024 Nice Luxury. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};