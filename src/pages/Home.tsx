import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { TourTypes } from '../components/home/TourTypes';
import { Features } from '../components/home/Features';
import { PopularTours } from '../components/home/PopularTours';
import { Testimonials } from '../components/home/Testimonials';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { CTASection } from '../components/home/CTASection';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Hero onStartPlanning={() => navigate('/planner')} />
      <TourTypes />
      <Features />
      <PopularTours />
      <WhyChooseUs />
      <Testimonials />
      <CTASection onStartPlanning={() => navigate('/planner')} />
    </div>
  );
};