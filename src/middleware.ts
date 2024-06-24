import { updateSession } from '@/supabase/utils/middleware';
import { type NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from './supabase/utils/server';

export async function middleware(request: NextRequest) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.auth.getSession();
  const user_email = request.cookies.has('user_email');

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
    ![paths.login, paths.sign_up, paths.forgot_password, paths.sent].includes(pathname)
  ) {
    return NextResponse.redirect(new URL(paths.login, request.url));
  }

  if (data.session?.access_token && [...authPrivate].includes(pathname)) {
    const data = await updateSession(request);
    if (!data) return NextResponse.redirect(new URL(paths.login, request.url));
    return NextResponse.redirect(new URL(paths.home, request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|_public|_src/app/error|.*\\.(?:svg|png|jpg|jpeg)$).*)'],
};
