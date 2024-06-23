'use server';

import { createServerSupabaseClient } from '@/supabase/utils/server';
import { ForgotPasswordSchema, FormForgotPassword } from '@/types/auth/forgotPasswordType';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function sendResetEmail(data: FormForgotPassword) {
  const supabase = createServerSupabaseClient();
  const isDataValid = ForgotPasswordSchema.safeParse(data);

  if (isDataValid.success) {
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: 'http://localhost:3000/auth/reset-password',
    });
    if (error) return true;
    revalidatePath('/auth/reset-password');
    redirect('/auth/forgot-password/sent');
  }
  return true;
}