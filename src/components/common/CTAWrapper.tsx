import { ctaConfigs } from '@/config/ctaConfig'
import { usePathname } from 'next/navigation'
import CTASection from './CTASection'

export default function CTAWrapper() {
  const pathname = usePathname()
  const config = ctaConfigs[pathname]

  if (!config) return null
  return <CTASection config={config} />
}
