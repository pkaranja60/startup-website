import BookingClient from '@/components/client/BookingClient'
import React from 'react'
import { bookCallMetadata } from '@/lib/metadata';

export const metadata = bookCallMetadata

export default function BookingPage() {
  return (
   <BookingClient />
  )
}
