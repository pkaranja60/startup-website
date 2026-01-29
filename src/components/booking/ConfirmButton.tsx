'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ConfirmButtonProps {
    selectedDate: Date | null;
    selectedTime: string | null;
    onConfirm: () => void;
}

export default function ConfirmButton({
    selectedDate,
    selectedTime,
    onConfirm
}: ConfirmButtonProps) {
    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <AnimatePresence>
            {selectedDate && selectedTime && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="mt-6 lg:mt-8 flex flex-col items-center gap-4 lg:gap-6 px-4"
                >
                    <div className="glass-card rounded-2xl p-5 lg:p-6 max-w-md w-full">
                        <p className="text-sm text-text-secondary text-center mb-2">
                            You're booking a call for:
                        </p>
                        <p className="text-base lg:text-lg font-display font-bold text-center leading-relaxed">
                            {formatDate(selectedDate)} at {selectedTime}
                        </p>
                    </div>

                    <button
                        onClick={onConfirm}
                        className="bg-primary hover:bg-primary-hover text-background px-8 lg:px-12 py-4 lg:py-5 rounded-full font-bold text-base lg:text-lg transition-all duration-300 flex items-center gap-2 lg:gap-3 shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
                    >
                        Confirm Appointment
                        <ArrowRight size={20} className="lg:w-[22px] lg:h-[22px]" />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}