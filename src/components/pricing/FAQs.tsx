import React from 'react'
import { motion } from 'framer-motion'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import { faqs } from '@/constants/FAQSData'

export default function FAQs() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }

    return (
        <motion.section
            {...fadeIn}
            className="max-w-6xl mx-auto px-4"
        >
            <div className="flex flex-col lg:flex-row gap-10">
                {/* Heading & Intro */}
                <div className="lg:w-1/3 flex flex-col justify-start">
                    <h2 className="text-3xl md:text-4xl font-display font-bold">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-text-secondary leading-relaxed mt-4 mb-4">
                        We understand that every small and medium business has unique needs.
                        Below are answers to the most common questions we receive from our clients
                        regarding our services, pricing, and timelines.
                    </p>
                    <p className="text-text-secondary leading-relaxed">
                        If you don&apos;t see your question here, feel free to reach out. We&apos;re happy to provide
                        personalized guidance to help your business grow online.
                    </p>
                </div>


                {/* Accordion */}
                <div className="lg:w-2/3">
                    <Accordion type="single" collapsible className="space-y-6">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={faq.question}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="glass-card rounded-2xl px-6 border-none"
                                >
                                    <AccordionTrigger className="font-display font-bold text-lg hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-text-secondary text-sm leading-relaxed pt-2">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </motion.section>
    )
}
