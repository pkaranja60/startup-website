// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  console.log('--- Verify OTP Start ---');
  try {
    const { email, otp } = await request.json();
    console.log('Verifying OTP for:', email);

    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }

    // Verify OTP with Supabase Auth
    const { data: authData, error: verifyError } = await supabase.auth.verifyOtp({
      email: email.toLowerCase(),
      token: otp,
      type: 'email'
    });

    if (verifyError || !authData.user) {
      console.error('OTP verification error:', verifyError);
      
      // Log failed attempt
      await supabase
        .from('admin_login_logs')
        .insert({
          email: email.toLowerCase(),
          action: 'otp_verify_failed',
          timestamp: new Date().toISOString()
        });

      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 401 }
      );
    }

    // Double-check user is in admin_users table
    const { data: adminUser, error: adminError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (adminError || !adminUser || !adminUser.is_active) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 403 }
      );
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ 
        last_login: new Date().toISOString(),
        login_count: (adminUser.login_count || 0) + 1
      })
      .eq('email', email.toLowerCase());

    // Log successful login
    await supabase
      .from('admin_login_logs')
      .insert({
        email: email.toLowerCase(),
        action: 'login_success',
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        user_agent: request.headers.get('user-agent'),
        timestamp: new Date().toISOString()
      });

    // Record active session for settings view
    const userAgent = request.headers.get('user-agent') || '';
    let device = 'Unknown Device';
    if (userAgent.includes('Windows')) device = 'Windows PC';
    else if (userAgent.includes('Macintosh')) device = 'Mac';
    else if (userAgent.includes('Android')) device = 'Android Phone';
    else if (userAgent.includes('iPhone')) device = 'iPhone';

    await supabase
      .from('admin_active_sessions')
      .insert({
        email: email.toLowerCase(),
        user_agent: userAgent,
        ip_address: request.headers.get('x-forwarded-for') || 'unknown',
        device: device,
        last_active: new Date().toISOString()
      });

    // Set session cookie
    const cookieStore = await cookies();
    cookieStore.set('admin_session', authData.session?.access_token || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/'
    });

    // Set user info cookie
    cookieStore.set('admin_user', JSON.stringify({
      email: adminUser.email,
      name: adminUser.name || adminUser.email.split('@')[0]
    }), {
      httpOnly: false, // Allow client-side access for display
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    });

    return NextResponse.json({
      success: true,
      user: {
        email: adminUser.email,
        name: adminUser.name
      }
    });

  } catch (error: any) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}