// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for server-side
);

// Email transporter setup (using Gmail as example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

// Generate Google Meet link (placeholder - you'll need Google API integration)
async function generateGoogleMeetLink(bookingData: any): Promise<string> {
  // Option 1: Use Google Calendar API to create event with Meet link
  // Option 2: Use a simple meet.google.com/new link (temporary)
  // For now, returning a placeholder
  return `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
}

// Create Google Calendar event
async function createCalendarEvent(bookingData: any, meetLink: string) {
  const startDateTime = new Date(`${bookingData.booking_date}T${bookingData.booking_time}`);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour session

  // Generate .ics file content for calendar attachment
  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NexusTech//Discovery Session//EN
BEGIN:VEVENT
UID:${bookingData.id}@nexustech.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:Discovery Session with NexusTech - ${bookingData.client_name}
DESCRIPTION:Project Type: ${bookingData.project_type || 'Not specified'}\\nBudget: ${bookingData.project_budget || 'Not specified'}\\n\\nGoogle Meet: ${meetLink}\\n\\nNotes: ${bookingData.notes || 'None'}
LOCATION:${meetLink}
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT15M
DESCRIPTION:Discovery Session starts in 15 minutes
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

  return Buffer.from(icsContent).toString('base64');
}

// Send confirmation email to client
async function sendClientConfirmationEmail(bookingData: any, meetLink: string) {
  const calendarAttachment = await createCalendarEvent(bookingData, meetLink);
  
  const mailOptions = {
    from: `"NexusTech" <${process.env.EMAIL_USER}>`,
    to: bookingData.client_email,
    subject: '✅ Discovery Session Confirmed - NexusTech',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00ff9d 0%, #00d9ff 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: #0a0f14; margin: 0; font-size: 28px; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .detail-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ff9d; }
          .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #e5e7eb; }
          .detail-label { font-weight: 600; width: 140px; color: #6b7280; }
          .detail-value { color: #111827; }
          .meet-button { display: inline-block; background: #00ff9d; color: #0a0f14; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .meet-button:hover { background: #00e68d; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 12px 12px; }
          .notes-box { background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #f59e0b; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Discovery Session Confirmed!</h1>
          </div>
          
          <div class="content">
            <p>Hi <strong>${bookingData.client_name}</strong>,</p>
            
            <p>Thank you for booking a discovery session with NexusTech! We're excited to learn about your project and discuss how we can help bring your vision to life.</p>
            
            <div class="detail-box">
              <h3 style="margin-top: 0; color: #111827;">📅 Session Details</h3>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${new Date(bookingData.booking_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${bookingData.booking_time} EAT (East Africa Time)</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Duration:</span>
                <span class="detail-value">60 minutes</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Platform:</span>
                <span class="detail-value">Google Meet</span>
              </div>
              ${bookingData.project_type ? `
              <div class="detail-row">
                <span class="detail-label">Project Type:</span>
                <span class="detail-value">${bookingData.project_type}</span>
              </div>
              ` : ''}
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${meetLink}" class="meet-button">
                🎥 Join Google Meet
              </a>
              <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
                <a href="${meetLink}" style="color: #00ff9d;">${meetLink}</a>
              </p>
            </div>

            ${bookingData.notes ? `
            <div class="notes-box">
              <strong>📝 Your Notes:</strong><br/>
              ${bookingData.notes}
            </div>
            ` : ''}

            <h3>What to Prepare:</h3>
            <ul>
              <li>Brief overview of your project goals</li>
              <li>Any existing materials (designs, documents, etc.)</li>
              <li>Your questions and concerns</li>
              <li>Estimated timeline and budget (if available)</li>
            </ul>

            <h3>Need to Reschedule?</h3>
            <p>If you need to change your appointment, please reply to this email or contact us at <a href="mailto:hello@nexustech.com">hello@nexustech.com</a></p>
          </div>

          <div class="footer">
            <p><strong>NexusTech</strong> | Transforming Ideas into Reality</p>
            <p>Westlands, Nairobi, Kenya | +254 712 345 678</p>
            <p style="font-size: 12px; margin-top: 10px;">
              <a href="https://nexustech.com" style="color: #00ff9d; text-decoration: none;">Website</a> | 
              <a href="https://nexustech.com/privacy" style="color: #00ff9d; text-decoration: none;">Privacy Policy</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    attachments: [
      {
        filename: 'discovery-session.ics',
        content: calendarAttachment,
        encoding: 'base64',
        contentType: 'text/calendar; charset=utf-8; method=REQUEST'
      }
    ]
  };

  return transporter.sendMail(mailOptions);
}

// Send notification email to admin
async function sendAdminNotificationEmail(bookingData: any) {
  const mailOptions = {
    from: `"NexusTech Bookings" <${process.env.EMAIL_USER}>`,
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `🔔 New Discovery Session Booked - ${bookingData.client_name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0a0f14; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .detail { padding: 10px; background: white; margin: 10px 0; border-radius: 4px; }
          .label { font-weight: 600; color: #6b7280; display: inline-block; width: 150px; }
          .value { color: #111827; }
          .urgent { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New Discovery Session Booked</h2>
          </div>
          <div class="content">
            <div class="detail">
              <span class="label">Client Name:</span>
              <span class="value"><strong>${bookingData.client_name}</strong></span>
            </div>
            <div class="detail">
              <span class="label">Email:</span>
              <span class="value">${bookingData.client_email}</span>
            </div>
            <div class="detail">
              <span class="label">Phone:</span>
              <span class="value">${bookingData.client_phone || 'Not provided'}</span>
            </div>
            <div class="detail">
              <span class="label">Company:</span>
              <span class="value">${bookingData.client_company || 'Not provided'}</span>
            </div>
            <div class="detail">
              <span class="label">Date & Time:</span>
              <span class="value"><strong>${new Date(bookingData.booking_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at ${bookingData.booking_time} EAT</strong></span>
            </div>
            <div class="detail">
              <span class="label">Project Type:</span>
              <span class="value">${bookingData.project_type || 'Not specified'}</span>
            </div>
            <div class="detail">
              <span class="label">Budget:</span>
              <span class="value">${bookingData.project_budget || 'Not specified'}</span>
            </div>
            ${bookingData.notes ? `
            <div class="urgent">
              <strong>Client Notes:</strong><br/>
              ${bookingData.notes}
            </div>
            ` : ''}
            <div class="detail">
              <span class="label">Booked At:</span>
              <span class="value">${new Date().toLocaleString()}</span>
            </div>
            <p style="margin-top: 20px; text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/bookings/${bookingData.id}" 
                 style="background: #00ff9d; color: #0a0f14; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                View in Dashboard
              </a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  return transporter.sendMail(mailOptions);
}

// Main POST handler
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['client_name', 'client_email', 'booking_date', 'booking_time'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check for double booking
    const { data: existingBookings } = await supabase
      .from('discovery_bookings')
      .select('id')
      .eq('booking_date', body.booking_date)
      .eq('booking_time', body.booking_time)
      .in('status', ['pending', 'confirmed']);

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json(
        { error: 'This time slot is already booked. Please choose another time.' },
        { status: 409 }
      );
    }

    // Generate Google Meet link
    const meetLink = await generateGoogleMeetLink(body);

    // Insert booking into database
    const { data: booking, error: dbError } = await supabase
      .from('discovery_bookings')
      .insert({
        client_name: body.client_name,
        client_email: body.client_email,
        client_phone: body.client_phone,
        client_company: body.client_company,
        booking_date: body.booking_date,
        booking_time: body.booking_time,
        project_type: body.project_type,
        project_budget: body.project_budget,
        notes: body.notes,
        google_meet_link: meetLink,
        status: 'pending',
        timezone: 'Africa/Nairobi'
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save booking' },
        { status: 500 }
      );
    }

    // Send emails asynchronously
    try {
      await Promise.all([
        sendClientConfirmationEmail({ ...booking, google_meet_link: meetLink }, meetLink),
        sendAdminNotificationEmail(booking)
      ]);

      // Update confirmation sent timestamp
      await supabase
        .from('discovery_bookings')
        .update({ confirmation_sent_at: new Date().toISOString() })
        .eq('id', booking.id);

    } catch (emailError) {
      console.error('Email error:', emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      booking: {
        id: booking.id,
        client_name: booking.client_name,
        booking_date: booking.booking_date,
        booking_time: booking.booking_time,
        google_meet_link: meetLink
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

// GET handler - fetch bookings (for admin)
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status');
  const date = searchParams.get('date');

  let query = supabase
    .from('discovery_bookings')
    .select('*')
    .order('booking_date', { ascending: true })
    .order('booking_time', { ascending: true });

  if (status) {
    query = query.eq('status', status);
  }

  if (date) {
    query = query.eq('booking_date', date);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ bookings: data });
}