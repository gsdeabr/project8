import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { PlanningMode } from '../components/planner/PlanningMode';
import { QuestionStep } from '../components/planner/QuestionStep';

export const Planner: React.FC = () => {
  const { t } = useTranslation();
  const [planningMode, setPlanningMode] = useState<'quick' | 'standard' | 'complete' | null>(null);
  const [step, setStep] = useState(1);

  const getStepsForMode = (mode: string | null) => {
    switch (mode) {
      case 'quick':
        return 5;
      case 'standard':
        return 8;
      case 'complete':
        return 16;
      default:
        return 5;
    }
  };

  const handleNext = () => {
    if (planningMode && step < getStepsForMode(planningMode)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            Your Personal AI Travel Designer
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience Nice like a local with our AI-powered travel planner. We'll create
            a personalized itinerary that matches your interests, preferences, and travel style.
            From hidden gems to must-see attractions, we'll craft the perfect journey for you.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!planningMode ? (
            <PlanningMode onSelect={setPlanningMode} />
          ) : (
            <QuestionStep
              step={step}
              onNext={handleNext}
              onPrevious={handlePrevious}
              totalSteps={getStepsForMode(planningMode)}
              planType={planningMode}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};