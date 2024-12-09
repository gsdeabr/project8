import { Train, Utensils, ShoppingBag, Landmark, Phone, CloudSun } from 'lucide-react';

export const travelInfo = [
  {
    id: 'transport',
    icon: Train,
    title: 'Transportation Guide',
    description: 'Navigate Nice with ease using our comprehensive transportation guide.',
    color: 'bg-blue-100 text-blue-600',
    items: [
      'Direct tram service from Nice Airport to city center (Line 2) - €1.50 per trip',
      'Unlimited daily transport pass available for €5 (includes tram and bus)',
      'Reliable taxi services with WeChat Pay support - download our recommended app'
    ]
  },
  {
    id: 'dining',
    icon: Utensils,
    title: 'Dining & Cuisine',
    description: 'Experience the best of French Riviera gastronomy with our curated recommendations.',
    color: 'bg-orange-100 text-orange-600',
    items: [
      'Top-rated restaurants with Chinese-speaking staff and menus in Mandarin',
      'Must-try local specialties: Salade Niçoise, Socca, and Pissaladière',
      'Exclusive reservations at Michelin-starred restaurants through our concierge'
    ]
  },
  {
    id: 'shopping',
    icon: ShoppingBag,
    title: 'Shopping Guide',
    description: 'Your ultimate guide to luxury shopping and authentic local markets.',
    color: 'bg-pink-100 text-pink-600',
    items: [
      'Tax-free shopping available at major department stores - instant refund service',
      'Personal shopping assistants who speak Mandarin at luxury boutiques',
      'Traditional markets schedule with local artisan recommendations'
    ]
  },
  {
    id: 'culture',
    icon: Landmark,
    title: 'Cultural Insights',
    description: 'Understand and appreciate Nice\'s rich cultural heritage.',
    color: 'bg-purple-100 text-purple-600',
    items: [
      'Key French phrases with pronunciation guide - download our mini handbook',
      'Local customs and etiquette tips for a respectful experience',
      'Festival calendar with traditional celebrations and events'
    ]
  },
  {
    id: 'emergency',
    icon: Phone,
    title: 'Emergency Information',
    description: 'Stay safe with our comprehensive emergency contact list and support.',
    color: 'bg-red-100 text-red-600',
    items: [
      '24/7 Chinese-speaking emergency hotline: +33 4XX XXX XXX',
      'Nearest hospitals and pharmacies with English/Chinese speaking staff',
      'Police and embassy contact information with location maps'
    ]
  },
  {
    id: 'weather',
    icon: CloudSun,
    title: 'Weather & Seasons',
    description: 'Plan your activities with our detailed weather insights.',
    color: 'bg-yellow-100 text-yellow-600',
    items: [
      'Mediterranean climate with 300+ days of sunshine per year',
      'Best times to visit: Spring (April-June) and Fall (September-October)',
      'Monthly temperature and rainfall forecasts with packing recommendations'
    ]
  }
];