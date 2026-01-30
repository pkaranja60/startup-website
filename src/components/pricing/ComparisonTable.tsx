import { comparisonFeatures } from '@/data/pricingData'
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react'
import Link from 'next/link';
import React from 'react'

export default function ComparisonTable() {
    
    const renderFeatureValue = (value: boolean | string) => {
        if (typeof value === 'boolean') {
            return value ? (
                <Check size={18} className="text-primary mx-auto" strokeWidth={3} />
            ) : (
                <X size={18} className="text-text-tertiary/30 mx-auto" strokeWidth={2} />
            );
        }
        return <span className="text-sm text-text-secondary">{value}</span>;
    };
    return (
        <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-24 overflow-hidden"
        >
            <div className="glass-card rounded-3xl overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-4 gap-4 p-6 border-b border-border-subtle bg-white/2">
                    <div className="font-display font-bold text-lg">Features</div>
                    <div className="text-center">
                        <div className="font-display font-bold text-lg mb-1">Launch</div>
                        <div className="text-xs text-text-tertiary">KES 399K</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display font-bold text-lg mb-1 text-primary">Scale</div>
                        <div className="text-xs text-primary/60">KES 1.06M</div>
                    </div>
                    <div className="text-center">
                        <div className="font-display font-bold text-lg mb-1">Enterprise</div>
                        <div className="text-xs text-text-tertiary">Custom</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-border-subtle">
                    {comparisonFeatures.map((category, categoryIndex) => (
                        <div key={category.category}>
                            {/* Category Header */}
                            <div className="p-6 bg-white/2">
                                <h3 className="font-display font-bold text-base text-primary">
                                    {category.category}
                                </h3>
                            </div>

                            {/* Category Features */}
                            {category.features.map((feature, featureIndex) => (
                                <motion.div
                                    key={feature.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: categoryIndex * 0.1 + featureIndex * 0.05 }}
                                    className="grid grid-cols-4 gap-4 p-6 hover:bg-white/2 transition-colors"
                                >
                                    <div className="text-sm text-text-secondary font-medium">
                                        {feature.name}
                                    </div>
                                    <div className="text-center">
                                        {renderFeatureValue(feature.launch)}
                                    </div>
                                    <div className="text-center">
                                        {renderFeatureValue(feature.scale)}
                                    </div>
                                    <div className="text-center">
                                        {renderFeatureValue(feature.enterprise)}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Table Footer CTA */}
                <div className="grid grid-cols-4 gap-4 p-6 border-t border-border-subtle bg-white/2">
                    <div></div>
                    <div className="text-center">
                        <Link
                            href="/book"
                            className="inline-block px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-border-medium text-xs font-bold transition-all duration-300"
                        >
                            Get Started
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link
                            href="/book"
                            className="inline-block px-6 py-2 rounded-full bg-primary hover:bg-primary-hover text-background text-xs font-bold transition-all duration-300 shadow-lg shadow-primary/30"
                        >
                            Scale Now
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link
                            href="/book"
                            className="inline-block px-6 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-border-subtle hover:border-border-medium text-xs font-bold transition-all duration-300"
                        >
                            Contact Sales
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
