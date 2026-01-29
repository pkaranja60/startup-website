'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import BookingConfirmation from '@/components/booking/BookingConfirmation';
import DateSelector from '@/components/booking/DateSelector';
import TimeSelector from '@/components/booking/TimeSelector';
import ConfirmButton from '@/components/booking/ConfirmButton';


export default function BookingClient() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      setIsConfirmed(true);
      // Here you would typically send the booking data to your backend
    }
  };

  const handleBookAnother = () => {
    setIsConfirmed(false);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  // Success State
  if (isConfirmed && selectedDate && selectedTime) {
    return (
      <>

        <main className="max-h-screen pt-24 sm:pt-28 pb-10 lg:pt-32 px-4 sm:px-6">
          <BookingConfirmation
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onBookAnother={handleBookAnother}
          />
        </main>
      </>
    );
  }

  // Booking Form
  return (
    <>
      <main className="min-h-screen pt-24 sm:pt-28 lg:pt-32 px-4 sm:px-6">
        <div className="container-max">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 lg:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4 lg:mb-6">
              <Sparkles size={16} className="text-primary" />
              <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">
                Book a Call
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 lg:mb-6 tracking-tight px-4">
              Book a <span className="text-primary-gradient">Discovery</span> Call
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed px-4">
              Let's talk about your vision. Select a convenient time for a 1-on-1 consultation.
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start max-w-7xl mx-auto">
            {/* Date Selection - Takes more space on large screens */}
            <div className="lg:col-span-7 xl:col-span-8">
              <DateSelector
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
              />
            </div>

            {/* Time Selection - Sticky on large screens */}
            <div className="lg:col-span-5 xl:col-span-4">
              <TimeSelector
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onSelectTime={handleSelectTime}
                timeSlots={timeSlots}
              />
            </div>
          </div>

          {/* Confirm Button */}
          <ConfirmButton
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onConfirm={handleConfirm}
          />

          {/* Back Link */}
          <div className="mt-8 lg:mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-text-tertiary hover:text-white transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to explore
            </Link>
          </div>
        </div>
      </main>

    </>
  );
}