'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/supabase/utils/server';
import { FormSingUpData, SignUpDataSchema } from '@/types/auth/signUpFormType';

export async function signUp(userData: FormSingUpData) {
  const supabase = createServerSupabaseClient();
  const cookieStore = cookies();

  const isDataValid = SignUpDataSchema.safeParse(userData);
  if (isDataValid.success) {
    const userNameExists = await isUsernameExists(userData.userName);
    const emailExists = await isEmailExists(userData.email);
    if (userNameExists)
      return {
        status: false,
        path: 'user_name',
        message: 'username already exists please enter a different username.',
      };
    if (emailExists) return { status: false, path: 'email', message: 'email already exists.' };

    const { data: signUPData, error: signUPError } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: { full_name: userData.firstName, user_name: `@${userData.userName}`, avatar_url: '' },
      },
    });
    if (signUPError) return { status: false };
    if (signUPData) {
      cookieStore.set({
        name: 'user_email',
        value: userData.email,
        sameSite: 'strict',
        maxAge: 1800,
      });
      revalidatePath('/auth/email-verification', 'page');
      redirect('/auth/email-verification');
    }
  }
  return { status: false };
}

export async function isUsernameExists(username: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('profiles').select('user_name').eq('user_name', `@${username}`).single();

  if (data) return true;
  return false;
}

export async function isEmailExists(email: string) {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase.from('profiles').select('email').eq('email', email).single();

  if (data) return true;
  return false;
}