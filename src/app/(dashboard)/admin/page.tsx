'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Briefcase, 
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Search,
  Filter,
  Download
} from 'lucide-react';

interface Booking {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  client_company?: string;
  booking_date: string;
  booking_time: string;
  project_type?: string;
  project_budget?: string;
  notes?: string;
  google_meet_link?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
  confirmation_sent_at?: string;
  created_at: string;
}

const STATUS_COLORS = {
  pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  confirmed: 'bg-primary/10 text-primary border-primary/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
  no_show: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
};

const STATUS_ICONS = {
  pending: AlertCircle,
  confirmed: CheckCircle,
  completed: CheckCircle,
  cancelled: XCircle,
  no_show: XCircle
};

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    fetchBookings();
  }, [selectedStatus]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const url = selectedStatus === 'all' 
        ? '/api/bookings' 
        : `/api/bookings?status=${selectedStatus}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.bookings) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchBookings();
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      booking.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.client_email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.client_company?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    upcoming: bookings.filter(b => 
      new Date(b.booking_date) >= new Date() && 
      ['pending', 'confirmed'].includes(b.status)
    ).length
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Time', 'Name', 'Email', 'Phone', 'Company', 'Project Type', 'Budget', 'Status'];
    const rows = filteredBookings.map(b => [
      b.booking_date,
      b.booking_time,
      b.client_name,
      b.client_email,
      b.client_phone || '',
      b.client_company || '',
      b.project_type || '',
      b.project_budget || '',
      b.status
    ]);

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="container-max max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-4">
            Booking Dashboard
          </h1>
          <p className="text-text-secondary">
            Manage and track all discovery session bookings
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'primary' },
            { label: 'Pending', value: stats.pending, color: 'yellow-400' },
            { label: 'Confirmed', value: stats.confirmed, color: 'primary' },
            { label: 'Upcoming', value: stats.upcoming, color: 'blue-400' },
            { label: 'Completed', value: stats.completed, color: 'green-400' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 lg:p-6 rounded-2xl"
            >
              <p className="text-xs lg:text-sm text-text-tertiary mb-2">{stat.label}</p>
              <p className={`text-2xl lg:text-3xl font-display font-bold text-${stat.color}`}>
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative grow max-w-md w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-border-subtle focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedStatus === status
                      ? 'bg-primary text-background'
                      : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-border-subtle'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>

            {/* Export */}
            <button
              onClick={exportToCSV}
              className="inline-flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl border border-border-subtle transition-all text-sm font-medium"
            >
              <Download size={18} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-20 text-center text-text-tertiary">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              Loading bookings...
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-20 text-center text-text-tertiary">
              <Calendar size={48} className="mx-auto mb-4 opacity-20" />
              <p>No bookings found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5 border-b border-border-subtle">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-text-secondary">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {filteredBookings.map((booking) => {
                    const StatusIcon = STATUS_ICONS[booking.status];
                    return (
                      <tr key={booking.id} className="hover:bg-white/2 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-bold text-sm">{booking.client_name}</p>
                            <p className="text-xs text-text-tertiary">{booking.client_email}</p>
                            {booking.client_company && (
                              <p className="text-xs text-text-tertiary mt-1">{booking.client_company}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={14} className="text-primary" />
                            {new Date(booking.booking_date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-text-tertiary mt-1">
                            <Clock size={14} />
                            {booking.booking_time}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <p className="font-medium">{booking.project_type || 'Not specified'}</p>
                            {booking.project_budget && (
                              <p className="text-xs text-text-tertiary mt-1">{booking.project_budget}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${STATUS_COLORS[booking.status]}`}>
                            <StatusIcon size={14} />
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => setSelectedBooking(booking)}
                            className="text-primary hover:text-primary-hover text-sm font-medium transition-colors"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Booking Detail Modal */}
        {selectedBooking && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Booking Details</h2>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-text-tertiary hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Client Info */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Client Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-primary" />
                      <span>{selectedBooking.client_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-primary" />
                      <a href={`mailto:${selectedBooking.client_email}`} className="hover:text-primary transition-colors">
                        {selectedBooking.client_email}
                      </a>
                    </div>
                    {selectedBooking.client_phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-primary" />
                        <a href={`tel:${selectedBooking.client_phone}`} className="hover:text-primary transition-colors">
                          {selectedBooking.client_phone}
                        </a>
                      </div>
                    )}
                    {selectedBooking.client_company && (
                      <div className="flex items-center gap-2">
                        <Building size={16} className="text-primary" />
                        <span>{selectedBooking.client_company}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Session Info */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Session Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-primary" />
                      <span>{new Date(selectedBooking.booking_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-primary" />
                      <span>{selectedBooking.booking_time} EAT</span>
                    </div>
                    {selectedBooking.project_type && (
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} className="text-primary" />
                        <span>{selectedBooking.project_type}</span>
                      </div>
                    )}
                    {selectedBooking.project_budget && (
                      <div className="flex items-center gap-2">
                        <DollarSign size={16} className="text-primary" />
                        <span>{selectedBooking.project_budget}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                {selectedBooking.notes && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Notes</h3>
                    <p className="text-sm text-text-secondary bg-white/5 p-4 rounded-xl">
                      {selectedBooking.notes}
                    </p>
                  </div>
                )}

                {/* Google Meet Link */}
                {selectedBooking.google_meet_link && (
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Meeting Link</h3>
                    <a
                      href={selectedBooking.google_meet_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-hover"
                    >
                      {selectedBooking.google_meet_link}
                      <ExternalLink size={14} />
                    </a>
                  </div>
                )}

                {/* Status Update */}
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-text-tertiary mb-3">Update Status</h3>
                  <div className="flex gap-2 flex-wrap">
                    {['pending', 'confirmed', 'completed', 'cancelled', 'no_show'].map(status => (
                      <button
                        key={status}
                        onClick={() => updateBookingStatus(selectedBooking.id, status)}
                        disabled={selectedBooking.status === status}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedBooking.status === status
                            ? `${STATUS_COLORS[status as keyof typeof STATUS_COLORS]} cursor-default`
                            : 'bg-white/5 text-text-secondary hover:bg-white/10 border border-border-subtle'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}