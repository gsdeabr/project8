export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  language: 'zh' | 'en';
  currency: 'CNY' | 'EUR';
  notifications: boolean;
}

export interface Tour {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  price: number;
  duration: number;
  images: string[];
  rating: number;
  reviews: number;
  included: string[];
  excluded: string[];
  itinerary: TourDay[];
}

export interface TourDay {
  day: number;
  activities: Activity[];
}

export interface Activity {
  time: string;
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}