// app/api/bookings/[id]/email/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import nodemailer from "nodemailer";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_APP_PASSWORD,
	},
});

async function sendApprovalEmail(booking: any) {
	const mailOptions = {
		from: `"NexusTech" <${process.env.EMAIL_USER}>`,
		to: booking.client_email,
		subject: "✅ Your Discovery Session is Confirmed!",
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
          .success-badge { background: #10b981; color: white; padding: 8px 16px; border-radius: 20px; display: inline-block; font-weight: 600; margin-bottom: 20px; }
          .detail-box { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00ff9d; }
          .meet-button { display: inline-block; background: #00ff9d; color: #0a0f14; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 12px 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Session Approved!</h1>
          </div>
          
          <div class="content">
            <span class="success-badge">✓ CONFIRMED</span>
            
            <p>Hi <strong>${booking.client_name}</strong>,</p>
            
            <p>Great news! Your discovery session has been reviewed and confirmed. We're looking forward to discussing your project with you!</p>
            
            <div class="detail-box">
              <h3 style="margin-top: 0; color: #111827;">📅 Session Details</h3>
              <p><strong>Date:</strong> ${new Date(booking.booking_date).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
              <p><strong>Time:</strong> ${booking.booking_time} EAT</p>
              <p><strong>Duration:</strong> 60 minutes</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${booking.google_meet_link}" class="meet-button">
                🎥 Join Google Meet
              </a>
            </div>

            <h3>What's Next?</h3>
            <ul>
              <li>Add the session to your calendar (attachment included)</li>
              <li>Prepare any questions or materials you'd like to discuss</li>
              <li>Test your camera and microphone before the session</li>
              <li>Join 5 minutes early to ensure everything works smoothly</li>
            </ul>

            <p>If you need to reschedule or have any questions, please reply to this email.</p>
          </div>

          <div class="footer">
            <p><strong>NexusTech</strong> | Transforming Ideas into Reality</p>
            <p>Westlands, Nairobi, Kenya</p>
          </div>
        </div>
      </body>
      </html>
    `,
	};

	return transporter.sendMail(mailOptions);
}

async function sendCompletionEmail(booking: any) {
	const mailOptions = {
		from: `"NexusTech" <${process.env.EMAIL_USER}>`,
		to: booking.client_email,
		subject: "🎯 Thank You for Your Discovery Session",
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
          .highlight-box { background: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b; }
          .cta-button { display: inline-block; background: #00ff9d; color: #0a0f14; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 14px; color: #6b7280; border-radius: 0 0 12px 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Session Complete!</h1>
          </div>
          
          <div class="content">
            <p>Hi <strong>${booking.client_name}</strong>,</p>
            
            <p>Thank you for taking the time to discuss your project with us. It was great learning about your vision and goals!</p>

            <div class="highlight-box">
              <h3 style="margin-top: 0;">📋 Next Steps</h3>
              <p>Our team is now reviewing everything we discussed. You can expect to receive:</p>
              <ul>
                <li>A detailed project proposal within 2-3 business days</li>
                <li>Timeline and milestone breakdown</li>
                <li>Comprehensive cost estimate</li>
                <li>Technology recommendations</li>
              </ul>
            </div>

            <h3>📝 Quick Feedback</h3>
            <p>Your feedback helps us improve. How was your experience?</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" class="cta-button">
                Share Your Feedback
              </a>
            </div>

            <h3>📞 Questions?</h3>
            <p>Feel free to reach out anytime:</p>
            <ul>
              <li>Email: <a href="mailto:hello@nexustech.com">hello@nexustech.com</a></li>
              <li>Phone: +254 712 345 678</li>
            </ul>

            <p>We're excited about the possibility of working together!</p>
          </div>

          <div class="footer">
            <p><strong>NexusTech</strong> | Transforming Ideas into Reality</p>
            <p>Westlands, Nairobi, Kenya</p>
            <p style="font-size: 12px; margin-top: 10px;">
              <a href="#" style="color: #00ff9d; text-decoration: none;">Website</a> | 
              <a href="#" style="color: #00ff9d; text-decoration: none;">Portfolio</a> | 
              <a href="#" style="color: #00ff9d; text-decoration: none;">Contact</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
	};

	return transporter.sendMail(mailOptions);
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params;
		const { type } = await request.json();

		// Fetch booking details
		const { data: booking, error } = await supabase
			.from("discovery_bookings")
			.select("*")
			.eq("id", id)
			.single();

		if (error || !booking) {
			return NextResponse.json({ error: "Booking not found" }, { status: 404 });
		}

		// Send appropriate email
		if (type === "approval") {
			await sendApprovalEmail(booking);
		} else if (type === "completion") {
			await sendCompletionEmail(booking);
		} else {
			return NextResponse.json(
				{ error: "Invalid email type" },
				{ status: 400 },
			);
		}

		return NextResponse.json({
			success: true,
			message: `${type} email sent successfully`,
		});
	} catch (error: any) {
		console.error("Email error:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to send email" },
			{ status: 500 },
		);
	}
}