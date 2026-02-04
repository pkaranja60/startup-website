import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get('admin_user');
    
    if (userCookie?.value) {
      try {
        const userData = JSON.parse(userCookie.value);
        const email = userData.email;

        // Log logout
        await supabase
          .from('admin_login_logs')
          .insert({
            email: email,
            action: 'logout',
            ip_address: request.headers.get('x-forwarded-for') || 'unknown',
            user_agent: request.headers.get('user-agent'),
            timestamp: new Date().toISOString()
          });

        // Remove active session
        await supabase
          .from('admin_active_sessions')
          .delete()
          .eq('email', email)
          .eq('ip_address', request.headers.get('x-forwarded-for') || 'unknown');
      } catch (e) {
        console.error('Error logging logout:', e);
      }
    }
    
    // Clear session cookies
    cookieStore.delete('admin_session');
    cookieStore.delete('admin_user');

    return NextResponse.json({ 
      success: true,
      message: 'Logged out successfully' 
    });

  } catch (error: any) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}