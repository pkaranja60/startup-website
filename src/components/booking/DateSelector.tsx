'use client';

import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useMemo } from 'react';

interface DateSelectorProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
}

export default function DateSelector({ selectedDate, onSelectDate }: DateSelectorProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate dates for the current month view
  const generateMonthDates = (monthDate: Date) => {
    const dates = [];
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    
    // Get first and last day of month
  
    const lastDay = new Date(year, month + 1, 0);
    
    // Generate all dates in the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      // Only include dates from today onwards
      if (date >= new Date(new Date().setHours(0, 0, 0, 0))) {
        dates.push(date);
      }
    }
    
    return dates;
  };

  const monthDates = useMemo(() => generateMonthDates(currentMonth), [currentMonth]);

  const goToPreviousMonth = () => {
    // Create new date at the 1st of the month to avoid date overflow issues
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    const today = new Date();
    const currentYearMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Don't go before current month
    if (newMonth >= currentYearMonth) {
      setCurrentMonth(newMonth);
    }
  };

  const goToNextMonth = () => {
    // Create new date at the 1st of the month to avoid date overflow issues
    const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(newMonth);
  };

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const isCurrentMonth = currentMonth.getMonth() === new Date().getMonth() && 
                        currentMonth.getFullYear() === new Date().getFullYear();

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="glass-card rounded-3xl p-6 lg:p-8"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 lg:mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
            <CalendarIcon size={20} className="text-primary lg:w-[22px] lg:h-[22px]" />
          </div>
          <div>
            <h2 className="text-lg lg:text-xl font-display font-bold">Select a Date</h2>
            <p className="text-xs text-text-tertiary">Choose a day that works for you</p>
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6 lg:mb-8 px-2">
        <button
          onClick={goToPreviousMonth}
          disabled={isCurrentMonth}
          className={`p-2 rounded-xl transition-all duration-300 ${
            isCurrentMonth
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-white/5 border border-border-subtle hover:border-border-medium'
          }`}
        >
          <ChevronLeft size={20} />
        </button>

        <motion.h3
          key={monthName}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base lg:text-lg font-display font-bold tracking-tight"
        >
          {monthName}
        </motion.h3>

        <button
          onClick={goToNextMonth}
          className="p-2 rounded-xl hover:bg-white/5 border border-border-subtle hover:border-border-medium transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Date Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-2 lg:gap-3">
        {monthDates.map((date) => {
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();

          return (
            <motion.button
              key={date.toISOString()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDate(date)}
              className={`aspect-square p-2 lg:p-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-0.5 lg:gap-1 relative ${
                isSelected
                  ? 'bg-primary border-primary text-background shadow-lg shadow-primary/30'
                  : 'bg-white/2 border-border-subtle hover:border-border-medium text-text-secondary hover:text-white hover:bg-white/5'
              }`}
            >
              {isToday && !isSelected && (
                <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-primary rounded-full border-2 border-background" />
              )}
              <span className="text-[8px] lg:text-[9px] font-bold uppercase tracking-wider opacity-70">
                {date.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <span className="text-lg lg:text-2xl font-display font-bold leading-none">{date.getDate()}</span>
              <span className="text-[8px] lg:text-[9px] opacity-70 font-medium">
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </span>
            </motion.button>
          );
        })}
      </div>

      {monthDates.length === 0 && (
        <div className="text-center py-12 text-text-tertiary">
          <p className="text-sm">No available dates in this month</p>
          <button
            onClick={goToNextMonth}
            className="mt-4 text-primary hover:text-primary-hover text-sm font-medium"
          >
            View next month →
          </button>
        </div>
      )}
    </motion.div>
  );
}