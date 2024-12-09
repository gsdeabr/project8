import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Map, Navigation, Maximize2 } from 'lucide-react';

interface InteractiveMapProps {
  locations: string[];
  day: number;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ locations, day }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Map className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold">Interactive Journey Map</h3>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Navigation className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative h-[400px] bg-gray-50">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2884.2889708683726!2d7.261186776271793!3d43.69508557120757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12cdd0106a852d31%3A0x40819a5fd979a70!2sNice%2C%20France!5e0!3m2!1sen!2sus!4v1709901234567!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3">
          <div className="text-sm font-medium text-gray-900 mb-1">Day {day} Route</div>
          <div className="text-xs text-gray-600">4 locations • 5.2 km total</div>
        </div>
      </div>
    </div>
  );
};