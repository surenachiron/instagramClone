import { type NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from './supabase/utils/server';

export async function middleware(request: NextRequest) {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getSession();
  const user_email = request.cookies.get('user_email')?.value;
  const username = request.cookies.get('username')?.value;

  const { pathname } = request.nextUrl;
  const paths = {
    login: '/auth/login',
    sign_up: '/auth/sign-up',
    email_verification: '/auth/email-verification',
    forgot_password: '/auth/forgot-password',
    sent: '/auth/forgot-password/sent',
    reset_password: '/auth/reset-password',
    home: '/',
  };
  const authPrivate = [
    paths.login,
    paths.sign_up,
    paths.email_verification,
    paths.forgot_password,
    paths.sent,
    paths.reset_password,
  ];

  if (user_email && !data.session?.access_token && ![paths.email_verification].includes(pathname)) {
    return NextResponse.redirect(new URL(paths.email_verification, request.url));
  }

  if (
    !user_email &&
    !data.session?.access_token &&
    ![paths.login, paths.sign_up, paths.forgot_password, paths.sent, paths.reset_password].includes(pathname)
  ) {
    return NextResponse.redirect(new URL(paths.login, request.url));
  }

  if (data.session?.access_token && [...authPrivate].includes(pathname)) {
    if (username) return NextResponse.redirect(new URL(paths.home, request.url));
    else return NextResponse.redirect(new URL(paths.login, request.url));
  }
}

export const config = {
  matcher: ['/auth/:path*', '/', '/profile', '/posts/*'],
};
