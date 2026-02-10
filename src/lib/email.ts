"use server";

import { google } from "googleapis";
import nodemailer from "nodemailer";
import { Booking } from "@/types/booking";

// Google Calendar API Setup
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const auth = new google.auth.JWT({
	email: process.env.GOOGLE_CLIENT_EMAIL,
	key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
	scopes: SCOPES,
});

const calendar = google.calendar({ version: "v3", auth });

// Email transporter setup
const transporter = nodemailer.createTransport({
	host: "mail.drdmedia.site",
	port: 465,
	secure: true,
	auth: {
		user: process.env.ADMIN_EMAIL,
		pass: process.env.ADMIN_PASSWORD,
	},
});

export async function generateGoogleMeetLink(
	bookingData: Booking,
): Promise<string> {
	try {
		// Parse booking date and time (assuming YYYY-MM-DD and HH:MM AM/PM)
		const [time, period] = bookingData.booking_time.split(" ");
		const [hours, minutes] = time.split(":").map(Number);
		let hour24 = hours;
		if (period === "PM" && hours !== 12) hour24 += 12;
		if (period === "AM" && hours === 12) hour24 = 0;

		const startDateTime = new Date(
			`${bookingData.booking_date}T${String(hour24).padStart(2, "0")}:${String(minutes || 0).padStart(2, "0")}:00`,
		);
		const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour duration

		console.log("Creating Calendar Event:", {
			start: startDateTime.toISOString(),
			end: endDateTime.toISOString(),
			requestId: `meet-${Date.now()}-${(bookingData.id || "manual").slice(0, 8)}`,
		});

		let eventResponse;
		try {
			eventResponse = await calendar.events.insert({
				calendarId: process.env.ADMIN_EMAIL || "peterkaranja60@gmail.com",
				conferenceDataVersion: 1,
				requestBody: {
					summary: `Discovery Session with ${bookingData.client_name}`,
					description: `Discovery session regarding: ${bookingData.project_type || "Not specified"}\n\nNotes: ${bookingData.notes || "None"}`,
					start: {
						dateTime: startDateTime.toISOString(),
						timeZone: "Africa/Nairobi",
					},
					end: {
						dateTime: endDateTime.toISOString(),
						timeZone: "Africa/Nairobi",
					},
					conferenceData: {
						createRequest: {
							requestId: `meet-${Date.now()}-${(bookingData.id || "manual").slice(0, 8)}`,
							conferenceSolutionKey: {
								type: "hangoutsMeet",
							},
						},
					},
				},
			});
		} catch (insertError: any) {
			console.warn(
				"First attempt with conference data failed, retrying without it...",
			);
			// If it failed with 400 or unauthorized, try creating the event WITHOUT the meet link
			// but including our fallback link in the location and description.
			const manualLink = `https://meet.google.com/discovery-${(bookingData.id || "manual").slice(0, 8)}`;

			eventResponse = await calendar.events.insert({
				calendarId: process.env.ADMIN_EMAIL || "peterkaranja60@gmail.com",
				requestBody: {
					summary: `Discovery Session with ${bookingData.client_name}`,
					description: `Discovery session regarding: ${bookingData.project_type || "Not specified"}\n\nMeeting Link: ${manualLink}\n\nNotes: ${bookingData.notes || "None"}`,
					location: manualLink,
					start: {
						dateTime: startDateTime.toISOString(),
						timeZone: "Africa/Nairobi",
					},
					end: {
						dateTime: endDateTime.toISOString(),
						timeZone: "Africa/Nairobi",
					},
				},
			});
		}

		const meetLink = eventResponse.data.conferenceData?.entryPoints?.[0]?.uri;

		if (!meetLink) {
			console.warn(
				"Failed to generate Google Meet link, falling back to static",
			);
			return `https://meet.google.com/discovery-${(bookingData.id || "manual").slice(0, 8)}`;
		}

		return meetLink;
	} catch (error: any) {
		console.error("Google Calendar Error Full Detail:", {
			message: error.message,
			details: error.response?.data?.error || error.response?.data,
			status: error.status,
		});
		// Return a fallback link instead of failing the whole process
		return `https://meet.google.com/fallback-${(bookingData.id || "error").slice(0, 8)}`;
	}
}

async function createCalendarEvent(bookingData: Booking, meetLink: string) {
	const startDateTime = new Date(
		`${bookingData.booking_date}T${bookingData.booking_time}`,
	);
	const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour session

	const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//DrD Solutions//Discovery Session//EN
BEGIN:VEVENT
UID:${bookingData.id}@drdsolutions.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${startDateTime.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDateTime.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:Discovery Session with DrD Solutions - ${bookingData.client_name}
DESCRIPTION:Project Type: ${bookingData.project_type || "Not specified"}\\nBudget: ${bookingData.project_budget || "Not specified"}\\n\\nGoogle Meet: ${meetLink}\\n\\nNotes: ${bookingData.notes || "None"}
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

	return Buffer.from(icsContent).toString("base64");
}

// 1. Initial Booking Receipt (Sent to client immediately after booking)
export async function sendBookingReceiptEmail(
	bookingData: Booking,
	meetLink: string,
) {
	const calendarAttachment = await createCalendarEvent(bookingData, meetLink);

	const mailOptions = {
		from: `"DrD Solutions" <${process.env.ADMIN_EMAIL}>`,
		to: bookingData.client_email,
		subject: "📅 Discovery Session Request Received - DrD Solutions",
		html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #0a0f14 0%, #1a1f24 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: #ffffff; margin: 0; font-size: 28px; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .status-badge { background: #fef3c7; color: #92400e; padding: 6px 12px; border-radius: 20px; display: inline-block; font-weight: 600; font-size: 12px; margin-bottom: 20px; border: 1px solid #fde68a; }
          .detail-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ff9d; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 12px 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Booking Received</h1>
          </div>
          <div class="content">
            <span class="status-badge">PENDING REVIEW</span>
            <p>Hi <strong>${bookingData.client_name}</strong>,</p>
            <p>We've received your discovery session request! Our team will review the details and send you a final confirmation email shortly.</p>
            <div class="detail-box">
              <h3 style="margin-top: 0; color: #111827;">📅 Requested Details</h3>
              <p><strong>Date:</strong> ${new Date(bookingData.booking_date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              <p><strong>Time:</strong> ${bookingData.booking_time} EAT</p>
              <p><strong>Duration:</strong> 60 minutes</p>
            </div>
            <p>Once approved, you'll receive a calendar invite and a Google Meet link for the session.</p>
            <p>If you have any immediate questions, feel free to reply to this email.</p>
          </div>
          <div class="footer">
            <p><strong>DrD Solutions</strong> | Westlands, Nairobi, Kenya</p>
          </div>
        </div>
      </body>
      </html>
    `,
		attachments: [
			{
				filename: "discovery-session.ics",
				content: calendarAttachment,
				encoding: "base64",
				contentType: "text/calendar; charset=utf-8; method=REQUEST",
			},
		],
	};

	return transporter.sendMail(mailOptions);
}

// 2. Admin Notification (Sent to admin immediately after booking)
export async function sendAdminNotificationEmail(bookingData: Booking) {
	const mailOptions = {
		from: `"DrD Solutions Bookings" <${process.env.ADMIN_EMAIL}>`,
		to: process.env.USER_EMAIL,
		subject: `🔔 New Booking Request - ${bookingData.client_name}`,
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
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>🔔 New Booking for Review</h2>
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
              <span class="label">Company:</span>
              <span class="value">${bookingData.client_company || "Not provided"}</span>
            </div>
            <div class="detail">
              <span class="label">Date & Time:</span>
              <span class="value"><strong>${new Date(bookingData.booking_date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })} at ${bookingData.booking_time} EAT</strong></span>
            </div>
            <div class="detail">
              <span class="label">Project Type:</span>
              <span class="value">${bookingData.project_type || "Not specified"}</span>
            </div>
            ${
							bookingData.notes
								? `
            <div class="urgent">
              <strong>Client Notes:</strong><br/>
              ${bookingData.notes}
            </div>
            `
								: ""
						}
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
    `,
	};

	return transporter.sendMail(mailOptions);
}

// 3. Admin Approval (Sent manually by admin to confirm session)
export async function sendApprovalEmail(booking: Booking) {
	const mailOptions = {
		from: `"DrD Solutions" <${process.env.ADMIN_EMAIL}>`,
		to: booking.client_email,
		subject: "✅ Your Discovery Session is Officially Confirmed!",
		html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #00ff9d 0%, #00d9ff 100%); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: #0a0f14; margin: 0; font-size: 28px; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .meet-button { display: inline-block; background: #00ff9d; color: #0a0f14; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 12px 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>📅 Session Confirmed!</h1></div>
          <div class="content">
            <p>Hi <strong>${booking.client_name}</strong>,</p>
            <p>Your discovery session has been approved. We're looking forward to discussing your project!</p>
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ff9d;">
              <p><strong>Date:</strong> ${new Date(booking.booking_date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              <p><strong>Time:</strong> ${booking.booking_time} EAT</p>
            </div>
            <div style="text-align: center;">
              <a href="${booking.google_meet_link}" class="meet-button">🎥 Join Google Meet</a>
            </div>
          </div>
          <div class="footer"><p><strong>DrD Solutions</strong></p></div>
        </div>
      </body>
      </html>
    `,
	};

	return transporter.sendMail(mailOptions);
}

// 4. Session Completion (Sent manually by admin after meeting)
export async function sendCompletionEmail(booking: Booking) {
	const mailOptions = {
		from: `"DrD Solutions" <${process.env.ADMIN_EMAIL}>`,
		to: booking.client_email,
		subject: "🎯 Discovery Session: Notes & Next Steps",
		html: `
      <!DOCTYPE html>
      <html>
      <body>
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Thank you for meeting with us! 🚀</h2>
          <p>Hi ${booking.client_name}, it was great learning about your project.</p>
          <p>Our team is now reviewing the notes from our session. You can expect a follow-up proposal within 2-3 business days.</p>
          <p>Best regards,<br/>The DrD Solutions Team</p>
        </div>
      </body>
      </html>
    `,
	};

	return transporter.sendMail(mailOptions);
}

// 5. Booking Cancellation (Sent manually by admin)
export async function sendCancellationEmail(booking: Booking) {
	const mailOptions = {
		from: `"DrD Solutions" <${process.env.ADMIN_EMAIL}>`,
		to: booking.client_email,
		subject: "🚫 Update Regarding Your Discovery Session",
		html: `
      <!DOCTYPE html>
      <html>
      <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #ef4444; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
          <h2>Session Cancelled</h2>
        </div>
        <div style="padding: 20px; border: 1px solid #e5e7eb;">
          <p>Hi ${booking.client_name},</p>
          <p>Your discovery session scheduled for ${booking.booking_date} at ${booking.booking_time} has been cancelled.</p>
          <p>If you'd like to reschedule, please visit our website to book a new time slot.</p>
        </div>
      </body>
      </html>
    `,
	};

	return transporter.sendMail(mailOptions);
}

/**
 * Syncs a booking to Google Calendar.
 * If the event doesn't exist, it creates it.
 * Since we don't store event IDs, this actually creates a new event.
 */
export async function syncCalendarEvent(booking: Booking) {
	try {
		const [time, period] = booking.booking_time.split(" ");
		const [hours, minutes] = time.split(":").map(Number);
		let hour24 = hours;
		if (period === "PM" && hours !== 12) hour24 += 12;
		if (period === "AM" && hours === 12) hour24 = 0;

		const startDateTime = new Date(
			`${booking.booking_date}T${String(hour24).padStart(2, "0")}:${String(minutes || 0).padStart(2, "0")}:00`,
		);
		const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000);

		await calendar.events.insert({
			calendarId: process.env.ADMIN_EMAIL || "peterkaranja60@gmail.com",
			requestBody: {
				summary: `Discovery Session with ${booking.client_name}`,
				description: `Discovery session regarding: ${booking.project_type || "Not specified"}\n\nMeeting Link: ${booking.google_meet_link}\n\nNotes: ${booking.notes || "None"}\n\nAdmin Notes: ${booking.admin_notes || "None"}`,
				location: booking.google_meet_link,
				start: {
					dateTime: startDateTime.toISOString(),
					timeZone: "Africa/Nairobi",
				},
				end: {
					dateTime: endDateTime.toISOString(),
					timeZone: "Africa/Nairobi",
				},
			},
		});
		return true;
	} catch (error) {
		console.error("Failed to sync calendar event:", error);
		return false;
	}
}
