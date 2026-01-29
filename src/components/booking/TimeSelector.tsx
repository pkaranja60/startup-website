'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Calendar as CalendarIcon } from 'lucide-react';

interface TimeSelectorProps {
    selectedDate: Date | null;
    selectedTime: string | null;
    onSelectTime: (time: string) => void;
    timeSlots: string[];
}

export default function TimeSelector({
    selectedDate,
    selectedTime,
    onSelectTime,
    timeSlots
}: TimeSelectorProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-6 lg:p-8 lg:sticky lg:top-32"
        >
            {/* Header */}
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Clock size={20} className="text-primary lg:w-[22px] lg:h-[22px]" />
                </div>
                <div>
                    <h2 className="text-lg lg:text-xl font-display font-bold">Select a Time</h2>
                    <p className="text-xs text-text-tertiary">Available time slots</p>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {!selectedDate ? (
                    <motion.div
                        key="no-date"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center h-48 lg:h-80 text-text-tertiary text-center"
                    >
                        <CalendarIcon size={40} className="mb-4 opacity-20 lg:w-12 lg:h-12" />
                        <p className="text-sm leading-relaxed px-4">
                            Choose a date first<br />to see available time slots
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="times"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-4"
                    >
                        {/* Morning Slots */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3 px-1">
                                Morning
                            </p>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                                {timeSlots
                                    .filter(time => time.includes('AM'))
                                    .map((time, index) => {
                                        const isSelected = selectedTime === time;
                                        return (
                                            <motion.button
                                                key={time}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: index * 0.05 }}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => onSelectTime(time)}
                                                className={`px-3 py-3 lg:px-4 lg:py-4 rounded-xl border transition-all duration-300 font-bold text-sm lg:text-base ${isSelected
                                                        ? 'bg-primary border-primary text-background shadow-lg shadow-primary/30'
                                                        : 'bg-white/2 border-border-subtle hover:border-border-medium text-text-secondary hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {time}
                                            </motion.button>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Afternoon Slots */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-text-tertiary mb-3 px-1">
                                Afternoon
                            </p>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
                                {timeSlots
                                    .filter(time => time.includes('PM'))
                                    .map((time, index) => {
                                        const isSelected = selectedTime === time;
                                        return (
                                            <motion.button
                                                key={time}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: (index + 3) * 0.05 }}
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                onClick={() => onSelectTime(time)}
                                                className={`px-3 py-3 lg:px-4 lg:py-4 rounded-xl border transition-all duration-300 font-bold text-sm lg:text-base ${isSelected
                                                        ? 'bg-primary border-primary text-background shadow-lg shadow-primary/30'
                                                        : 'bg-white/2 border-border-subtle hover:border-border-medium text-text-secondary hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                {time}
                                            </motion.button>
                                        );
                                    })}
                            </div>
                        </div>

                        {/* Timezone Note */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 pt-6 border-t border-border-subtle"
                        >
                            <div className="flex items-center justify-center gap-2 text-xs text-text-tertiary">
                                <Clock size={14} />
                                <span>East Africa Time (EAT, UTC+3)</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}