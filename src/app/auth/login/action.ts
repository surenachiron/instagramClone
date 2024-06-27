'use server';

import { supabaseServer } from '@/supabase/utils/server';
import { FormLoginData, LoginDataSchema } from '@/types/auth/loginFormType';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(userData: FormLoginData) {
  const supabase = supabaseServer();
  const cookiesStore = cookies();
  const isDataValid = LoginDataSchema.safeParse(userData);

  if (isDataValid.success) {
    const { data, error } = await supabase.auth.signInWithPassword(userData);

    if (error?.message === 'Email not confirmed') {
      cookiesStore.set({
        name: 'user_email',
        value: userData.email,
        sameSite: 'strict',
        maxAge: 1800,
      });
      return {
        status: false,
        message: 'Email not confirmed',
      };
    }
    if (error) return { status: false };
    cookiesStore.set({
      name: 'username',
      value: data.user.user_metadata.user_name,
      sameSite: 'strict',
      maxAge: 31536000,
    });
    revalidatePath('/');
    redirect('/');
  }
}
