import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, Heart, MapPin, Wallet } from 'lucide-react';
import { ProgressBar } from './ProgressBar';
import { DateRangePicker } from './DateRangePicker';
import { TravelersInput } from './TravelersInput';
import { InterestsSelector } from './InterestsSelector';
import { LocationSelector } from './LocationSelector';
import { BudgetSlider } from './BudgetSlider';
import { PlanResult } from './PlanResult';
import { StandardPlan } from './plans/StandardPlan';
import { CompletePlan } from './plans/CompletePlan';

interface QuestionStepProps {
  step: number;
  onNext: () => void;
  onPrevious: () => void;
  totalSteps: number;
  planType: 'quick' | 'standard' | 'complete';
}

export const QuestionStep: React.FC<QuestionStepProps> = ({
  step,
  onNext,
  onPrevious,
  totalSteps,
  planType,
}) => {
  const { t } = useTranslation();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [budget, setBudget] = useState(300);
  const [showResult, setShowResult] = useState(false);

  const handleNext = () => {
    if (step === totalSteps) {
      setShowResult(true);
    } else {
      onNext();
    }
  };

  if (showResult) {
    return (
      <PlanResult
        plan={{
          dates: { start: startDate, end: endDate },
          travelers,
          interests,
          locations,
          budget,
        }}
      />
    );
  }

  if (planType === 'standard') {
    return (
      <>
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
        <StandardPlan
          step={step}
          onNext={handleNext}
          onPrevious={onPrevious}
        />
      </>
    );
  }

  if (planType === 'complete') {
    return (
      <>
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
        <CompletePlan
          step={step}
          onNext={handleNext}
          onPrevious={onPrevious}
        />
      </>
    );
  }

  // Quick plan (default)
  const questions = [
    { id: 'dates', icon: Calendar, type: 'date-range' },
    { id: 'travelers', icon: Users, type: 'travelers' },
    { id: 'interests', icon: Heart, type: 'interests' },
    { id: 'locations', icon: MapPin, type: 'locations' },
    { id: 'budget', icon: Wallet, type: 'budget' },
  ];

  const currentQuestion = questions[step - 1];
  if (!currentQuestion) return null;

  const Icon = currentQuestion.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="rounded-2xl bg-white p-8 shadow-lg"
    >
      <ProgressBar currentStep={step} totalSteps={totalSteps} />

      <div className="mb-8 flex items-center space-x-4">
        <div className="rounded-full bg-blue-100 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold">
          {t(`planner.questions.${currentQuestion.id}.title`)}
        </h3>
      </div>

      <div className="mb-8">
        {currentQuestion.type === 'date-range' && (
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        )}

        {currentQuestion.type === 'travelers' && (
          <TravelersInput value={travelers} onChange={setTravelers} />
        )}

        {currentQuestion.type === 'interests' && (
          <InterestsSelector selected={interests} onChange={setInterests} />
        )}

        {currentQuestion.type === 'locations' && (
          <LocationSelector selected={locations} onChange={setLocations} />
        )}

        {currentQuestion.type === 'budget' && (
          <BudgetSlider value={budget} onChange={setBudget} />
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={onPrevious}
          disabled={step === 1}
          className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {t('common.previous')}
        </button>
        <button
          onClick={handleNext}
          className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          {step === totalSteps ? t('common.finish') : t('common.next')}
        </button>
      </div>
    </motion.div>
  );
};