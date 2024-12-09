import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, ArrowLeft, CreditCard } from 'lucide-react';

export const Checkout: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const packageData = location.state;

  if (!packageData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              No package selected
            </h1>
            <button
              onClick={() => navigate('/packages')}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-5 h-5" />
              Return to packages
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{packageData.packageName}</h3>
                    <ul className="mt-2 space-y-1">
                      {packageData.features.map((feature: string, index: number) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <Check className="w-4 h-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold">€{packageData.price}</span>
                    <span className="text-gray-500">/person</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Alipay_logo.png"
                    alt="Alipay"
                    className="h-8"
                  />
                </button>
                <button className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center gap-2">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/WeChat_Pay_logo.svg/2560px-WeChat_Pay_logo.svg.png"
                    alt="WeChat Pay"
                    className="h-8"
                  />
                </button>
              </div>
            </div>

            <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 font-medium">
              <CreditCard className="w-5 h-5" />
              Complete Purchase
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};