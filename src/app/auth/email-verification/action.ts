'use server';

import { createServerSupabaseClient } from '@/supabase/utils/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function UserEmailVerification(formData: FormData) {
  const supabase = createServerSupabaseClient();
  const cookieStore = cookies();

  let digitCode = '';
  for (const pair of formData.entries()) digitCode += pair[1];
  const user_email = cookieStore.get('user_email');

  const { error } = await supabase.auth.verifyOtp({
    email: user_email!.value,
    token: digitCode,
    type: 'email',
  });

  if (error) return false;
  else {
    cookieStore.delete('user_email');
    revalidatePath('/profile');
    redirect('/profile');
  }
}

export async function reSendEmailVerification() {
  const supabase = createServerSupabaseClient();
  const cookieStore = cookies();
  const user_email = cookieStore.get('user_email');
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: user_email!.value,
  });
  if (error) return false;
  return true;
}
