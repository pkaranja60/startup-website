import PricingClinet from '@/components/client/PricingClient'
import { pricingMetadata } from '@/lib/metadata'
import React from 'react'

export const metadata = pricingMetadata

export default function PricingPage() {
  return (
  <PricingClinet/>
  )
}
