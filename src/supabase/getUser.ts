import { cache } from 'react';
import { createServerSupabaseClient } from '@/supabase/utils/server';
import { redirect } from 'next/navigation';

export const getUser = cache(async () => {
  const supabase = createServerSupabaseClient();

  const { data } = await supabase.auth.getUser();
  if (data.user == null) redirect('auth/login');

  return {
    id: data.user.id,
    email: data.user.email,
    fullName: data.user.user_metadata['full_name'],
    username: data.user.user_metadata['user_name'],
    avatar: data.user.user_metadata['avatar_url'],
  };
});
