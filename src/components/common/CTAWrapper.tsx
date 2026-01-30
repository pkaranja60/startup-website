'use client'

import { ctaConfigs } from '@/config/ctaConfig'
import { usePathname } from 'next/navigation'
import CTASection from './CTASection'

export default function CTAWrapper() {
  const pathname = usePathname() || '/'
  
  // Get config for current path, or undefined for homepage
  const config = ctaConfigs[pathname]

  // Always render CTASection - it handles homepage and other pages
  return <CTASection config={config} />
}