import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

export const PackageFAQ: React.FC = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const faqs = [
    {
      question: t('packages.faq.items.payment.question'),
      answer: t('packages.faq.items.payment.answer')
    },
    {
      question: t('packages.faq.items.customization.question'),
      answer: t('packages.faq.items.customization.answer')
    },
    {
      question: t('packages.faq.items.languages.question'),
      answer: t('packages.faq.items.languages.answer')
    },
    {
      question: t('packages.faq.items.booking.question'),
      answer: t('packages.faq.items.booking.answer')
    }
  ];

  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold text-center mb-8">
        {t('packages.faq.title')}
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-left flex items-center justify-between"
            >
              <span className="font-medium">{faq.question}</span>
              {openIndex === index ? (
                <Minus className="w-5 h-5 text-gray-500" />
              ) : (
                <Plus className="w-5 h-5 text-gray-500" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="p-4 pt-0 text-gray-600">
                {faq.answer}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};