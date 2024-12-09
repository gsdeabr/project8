import React from 'react';
import { Map } from 'lucide-react';

interface MapItineraryProps {
  day: number;
}

export const MapItinerary: React.FC<MapItineraryProps> = ({ day }) => {
  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50 h-[600px] relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.2889708683726!2d7.261186776271793!3d43.69508557120757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd0106a852d31%3A0x40819a5fd979a70!2sNice%2C%20France!5e0!3m2!1sen!2sus!4v1709901234567!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};