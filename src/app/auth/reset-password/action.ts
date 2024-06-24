'use server';

import { createServerSupabaseClient } from '@/supabase/utils/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function setResetPassword(password: string, code: string) {
  const supabase = createServerSupabaseClient();

  const { error: errorCode } = await supabase.auth.exchangeCodeForSession(code);
  if (!errorCode) {
    const { error } = await supabase.auth.updateUser({
      password: password,
    });
    if (error) return false;
    revalidatePath('/');
    redirect('/');
  }
  return false;
}
