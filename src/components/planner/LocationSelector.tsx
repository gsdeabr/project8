import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface LocationSelectorProps {
  selected: string[];
  onChange: (locations: string[]) => void;
}

export const LocationSelector: React.FC<LocationSelectorProps> = ({ selected, onChange }) => {
  const { t } = useTranslation();

  const locations = [
    { id: 'oldTown', image: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=600' },
    { id: 'promenade', image: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?auto=format&fit=crop&w=600' },
    { id: 'castle', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600' },
    { id: 'port', image: 'https://images.unsplash.com/photo-1538332576785-8b43b4b54613?auto=format&fit=crop&w=600' },
  ];

  const toggleLocation = (id: string) => {
    const newSelected = selected.includes(id)
      ? selected.filter(i => i !== id)
      : [...selected, id];
    onChange(newSelected);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {locations.map(({ id, image }) => (
        <motion.button
          key={id}
          whileHover={{ y: -4 }}
          onClick={() => toggleLocation(id)}
          className={`relative overflow-hidden rounded-lg group ${
            selected.includes(id) ? 'ring-2 ring-blue-600' : ''
          }`}
        >
          <img
            src={image}
            alt={t(`planner.locations.${id}`)}
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-white" />
            <span className="text-white font-medium">
              {t(`planner.locations.${id}`)}
            </span>
          </div>
          {selected.includes(id) && (
            <div className="absolute inset-0 bg-blue-600/20" />
          )}
        </motion.button>
      ))}
    </div>
  );
};