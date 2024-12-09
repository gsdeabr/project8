import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { 
  Clock, Users, Heart, MapPin, Wallet, Calendar, Utensils, 
  Camera, Plane, Hotel, Car, Wine, Sun, Moon, Coffee, Star 
} from 'lucide-react';
import { DateRangePicker } from '../DateRangePicker';
import { TravelersInput } from '../TravelersInput';
import { InterestsSelector } from '../InterestsSelector';
import { LocationSelector } from '../LocationSelector';
import { BudgetSlider } from '../BudgetSlider';
import { DiningPreferences } from '../questions/DiningPreferences';
import { ActivitiesSelector } from '../questions/ActivitiesSelector';
import { SchedulePreferences } from '../questions/SchedulePreferences';

interface CompletePlanProps {
  onNext: () => void;
  onPrevious: () => void;
  step: number;
}

export const CompletePlan: React.FC<CompletePlanProps> = ({ onNext, onPrevious, step }) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [budget, setBudget] = useState(300);
  const [diningPreferences, setDiningPreferences] = useState<string[]>([]);
  const [activities, setActivities] = useState<string[]>([]);
  const [schedule, setSchedule] = useState({
    startTime: '9:00',
    endTime: '21:00',
    pace: 'balanced' as const
  });

  const questions = [
    { id: 'dates', icon: Calendar, type: 'date-range' },
    { id: 'travelers', icon: Users, type: 'travelers' },
    { id: 'interests', icon: Heart, type: 'interests' },
    { id: 'locations', icon: MapPin, type: 'locations' },
    { id: 'budget', icon: Wallet, type: 'budget' },
    { id: 'arrival', icon: Plane, type: 'arrival-details' },
    { id: 'accommodation', icon: Hotel, type: 'accommodation-preferences' },
    { id: 'transportation', icon: Car, type: 'transportation-preferences' },
    { id: 'dining', icon: Utensils, type: 'dining-preferences' },
    { id: 'activities', icon: Camera, type: 'activities' },
    { id: 'schedule', icon: Clock, type: 'schedule-preferences' },
    { id: 'wine', icon: Wine, type: 'wine-preferences' },
    { id: 'morning', icon: Sun, type: 'morning-preferences' },
    { id: 'evening', icon: Moon, type: 'evening-preferences' },
    { id: 'breakfast', icon: Coffee, type: 'breakfast-preferences' },
    { id: 'luxury', icon: Star, type: 'luxury-preferences' }
  ];

  const renderQuestionContent = () => {
    switch (questions[step - 1].type) {
      case 'date-range':
        return (
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        );
      case 'travelers':
        return <TravelersInput value={travelers} onChange={setTravelers} />;
      case 'interests':
        return <InterestsSelector selected={interests} onChange={setInterests} />;
      case 'locations':
        return <LocationSelector selected={locations} onChange={setLocations} />;
      case 'budget':
        return <BudgetSlider value={budget} onChange={setBudget} />;
      case 'dining-preferences':
        return <DiningPreferences selected={diningPreferences} onChange={setDiningPreferences} />;
      case 'activities':
        return <ActivitiesSelector selected={activities} onChange={setActivities} />;
      case 'schedule-preferences':
        return <SchedulePreferences value={schedule} onChange={setSchedule} />;
      default:
        return (
          <div className="text-gray-600">
            This section is coming soon. Click next to continue.
          </div>
        );
    }
  };

  const currentQuestion = questions[step - 1];
  if (!currentQuestion) return null;

  const Icon = currentQuestion.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-xl shadow-lg p-8"
    >
      <div className="mb-8 flex items-center space-x-4">
        <div className="rounded-full bg-blue-100 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold">
          {t(`planner.questions.${currentQuestion.id}.title`)}
        </h3>
      </div>

      <div className="mb-8">
        {renderQuestionContent()}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={onPrevious}
          disabled={step === 1}
          className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {t('common.previous')}
        </button>
        <button
          onClick={onNext}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {step === questions.length ? t('common.finish') : t('common.next')}
        </button>
      </div>
    </motion.div>
  );
};