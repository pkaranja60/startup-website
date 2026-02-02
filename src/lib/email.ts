import nodemailer from "nodemailer";

// Email transporter setup
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_APP_PASSWORD,
	},
});

export async function generateGoogleMeetLink(
	bookingData: any,
): Promise<string> {
	// In a real app, integrate with Google Calendar API
	// For now, returning a static meet link or generating a dynamic one if possible
	return `https://meet.google.com/${Math.random().toString(36).substring(7)}`;
}

async function createCalendarEvent(bookingData: any, meetLink: string) {
	const startDateTime = new Date(
		`${bookingData.booking_date}T${bookingData.booking_time}`,
	);
	const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hour session

	const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//NexusTech//Discovery Session//EN
BEGIN:VEVENT
UID:${bookingData.id}@nexustech.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${startDateTime.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTEND:${endDateTime.toISOString().replace(/[-:]/g, "").split(".")[0]}Z
SUMMARY:Discovery Session with NexusTech - ${bookingData.client_name}
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

export async function sendClientConfirmationEmail(
	bookingData: any,
	meetLink: string,
) {
	const calendarAttachment = await createCalendarEvent(bookingData, meetLink);

	const mailOptions = {
		from: `"NexusTech" <${process.env.EMAIL_USER}>`,
		to: bookingData.client_email,
		subject: "✅ Discovery Session Confirmed - NexusTech",
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
                <span class="detail-value">${new Date(bookingData.booking_date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
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
              ${
								bookingData.project_type
									? `
              <div class="detail-row">
                <span class="detail-label">Project Type:</span>
                <span class="detail-value">${bookingData.project_type}</span>
              </div>
              `
									: ""
							}
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${meetLink}" class="meet-button">
                🎥 Join Google Meet
              </a>
              <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
                <a href="${meetLink}" style="color: #00ff9d;">${meetLink}</a>
              </p>
            </div>

            ${
							bookingData.notes
								? `
            <div class="notes-box">
              <strong>📝 Your Notes:</strong><br/>
              ${bookingData.notes}
            </div>
            `
								: ""
						}

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
				filename: "discovery-session.ics",
				content: calendarAttachment,
				encoding: "base64",
				contentType: "text/calendar; charset=utf-8; method=REQUEST",
			},
		],
	};

	return transporter.sendMail(mailOptions);
}

export async function sendAdminNotificationEmail(bookingData: any) {
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
              <span class="value">${bookingData.client_phone || "Not provided"}</span>
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
            <div class="detail">
              <span class="label">Budget:</span>
              <span class="value">${bookingData.project_budget || "Not specified"}</span>
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

export async function sendFollowUpEmail(bookingData: any) {
	const mailOptions = {
		from: `"NexusTech" <${process.env.EMAIL_USER}>`,
		to: bookingData.client_email,
		subject: "🚀 Thank you for meeting with NexusTech",
		html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0a0f14; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; }
          .content { background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 12px 12px; }
          .cta-button { display: inline-block; background: #00ff9d; color: #0a0f14; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank You! 🚀</h1>
          </div>
          
          <div class="content">
            <p>Hi <strong>${bookingData.client_name}</strong>,</p>
            
            <p>It was a pleasure meeting with you today! We really enjoyed discussing your project and learning more about your vision.</p>
            
            <p>Our team is currently reviewing our notes and we will be staring to put together a proposal or next steps for you shortly.</p>
            
            <p>In the meantime, if you have any follow-up questions or additional thoughts that came to mind after our call, please don't hesitate to reply to this email.</p>
            
            <p>We look forward to the possibility of working together!</p>

            <div style="text-align: center;">
              <a href="mailto:hello@nexustech.com" class="cta-button">Contact Us</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>NexusTech</strong> | Transforming Ideas into Reality</p>
          </div>
        </div>
      </body>
      </html>
    `,
	};

	return transporter.sendMail(mailOptions);
}
