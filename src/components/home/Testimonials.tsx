import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: '张先生',
      location: 'Beijing',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?fit=crop&w=100&h=100',
      text: 'The personalized service was exceptional. Our guide spoke perfect Mandarin and made us feel at home in Nice.',
      rating: 5
    },
    {
      name: '王女士',
      location: 'Shanghai',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fit=crop&w=100&h=100',
      text: 'Luxury shopping tour was amazing! They arranged everything perfectly, including tax-free shopping assistance.',
      rating: 5
    },
    {
      name: '李先生',
      location: 'Guangzhou',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100',
      text: 'WeChat Pay support made everything convenient. The local food recommendations were excellent!',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Guests Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Read authentic reviews from Chinese travelers who experienced
            our premium Nice tours and services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};