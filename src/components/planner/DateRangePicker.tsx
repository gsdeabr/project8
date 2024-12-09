import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isWithinInterval,
  startOfDay,
} from 'date-fns';

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onDateChange: (start: Date | null, end: Date | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onDateChange,
}) => {
  const { t } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const isDateInRange = (date: Date) => {
    if (!startDate) return false;
    if (!endDate && hoverDate) {
      return isWithinInterval(date, {
        start: startDate < hoverDate ? startDate : hoverDate,
        end: startDate < hoverDate ? hoverDate : startDate,
      });
    }
    if (!endDate) return isSameDay(date, startDate);
    return isWithinInterval(date, { start: startDate, end: endDate });
  };

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      onDateChange(date, null);
    } else {
      if (date < startDate) {
        onDateChange(date, startDate);
      } else {
        onDateChange(startDate, date);
      }
    }
  };

  const formatDisplayDate = () => {
    if (!startDate) return t('planner.selectDates');
    if (!endDate) return format(startDate, 'MMM dd, yyyy');
    return `${format(startDate, 'MMM dd')} - ${format(endDate, 'MMM dd, yyyy')}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <span className="flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-gray-500" />
          <span className="text-gray-700">{formatDisplayDate()}</span>
        </span>
        <ChevronRight
          className={`w-5 h-5 text-gray-500 transition-transform ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 mt-2 p-4 bg-white rounded-lg shadow-xl border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-semibold">
                {format(currentMonth, 'MMMM yyyy')}
              </h3>
              <button
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 py-2"
                >
                  {day}
                </div>
              ))}
              {days.map((day) => {
                const isSelected = startDate && isSameDay(day, startDate) || 
                                 endDate && isSameDay(day, endDate);
                const isInRange = isDateInRange(day);
                const isToday = isSameDay(day, new Date());

                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => handleDateClick(startOfDay(day))}
                    onMouseEnter={() => setHoverDate(day)}
                    onMouseLeave={() => setHoverDate(null)}
                    disabled={!isSameMonth(day, currentMonth)}
                    className={`
                      relative p-2 text-sm rounded-full
                      ${!isSameMonth(day, currentMonth) ? 'text-gray-300' : 'text-gray-700'}
                      ${isSelected ? 'bg-blue-600 text-white' : ''}
                      ${isInRange && !isSelected ? 'bg-blue-100' : ''}
                      ${isToday && !isSelected ? 'border border-blue-600' : ''}
                      hover:bg-blue-50
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                );
              })}
            </div>

            {(startDate || endDate) && (
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => {
                    onDateChange(null, null);
                    setIsOpen(false);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  {t('common.clear')}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};