'use server';

import { supabaseServer } from '@/supabase/utils/server';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setResetPassword(password: string, code: string) {
  const supabase = supabaseServer();
  const cookiesStore = cookies();

  const { data, error: errorCode } = await supabase.auth.exchangeCodeForSession(code);
  if (!errorCode) {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) return false;
    cookiesStore.set({
      name: 'username',
      value: data.user.user_metadata.user_name,
      sameSite: 'strict',
      maxAge: 31536000,
    });
    revalidatePath('/');
    redirect('/');
  }
  return false;
}
