'use server';

import { supabaseServer } from '@/supabase/utils/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function UserEmailVerification(formData: FormData) {
  const supabase = supabaseServer();
  const cookieStore = cookies();

  let digitCode = '';
  for (const pair of formData.entries()) digitCode += pair[1];
  const user_email = cookieStore.get('user_email');

  const { data, error } = await supabase.auth.verifyOtp({
    email: user_email!.value,
    token: digitCode,
    type: 'email',
  });

  if (error) return false;
  else {
    cookieStore.delete('user_email');
    revalidatePath('/profile');
    redirect(`/profile/${data.user?.user_metadata.user_name}`);
  }
}

export async function reSendEmailVerification() {
  const supabase = supabaseServer();
  const cookieStore = cookies();
  const user_email = cookieStore.get('user_email');
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: user_email!.value,
  });
  if (error) return false;
  return true;
}

export async function changeWrongEmailAction(data: { email: string }) {
  const supabase = supabaseServer();
  const cookieStore = cookies();
  const wrong_user_email = cookieStore.get('user_email')?.value as string;
  const username = cookieStore.get('username')?.value as string;
  const full_name = cookieStore.get('full_name')?.value as string;
  const password = cookieStore.get('password')?.value as string;
  const { error } = await supabase.rpc('delete_user_by_email', {
    email_to_delete: wrong_user_email,
  });
  if (!error) {
    const { error: signUPError } = await supabase.auth.signUp({
      email: data.email,
      password: password,
      options: {
        data: {
          full_name: full_name,
          user_name: username,
          avatar_url: '',
        },
      },
    });
    console.log(signUPError, password);
    if (!signUPError) {
      cookieStore.set('user_email', data.email);
      cookieStore.delete('full_name');
      cookieStore.delete('password');
      redirect('/auth/email-verification');
    } else return false;
  } else return false;
}
