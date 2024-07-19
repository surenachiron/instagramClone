import { cache } from 'react';
import { redirect } from 'next/navigation';

import { supabaseServer } from './utils/server';

export const getUser = cache(async () => {
  const supabase = supabaseServer();

  const { data } = await supabase.auth.getUser();
  if (data.user == null) redirect('auth/login');

  return {
    id: data.user.id,
    email: data.user.email,
    fullName: data.user.user_metadata['full_name'] as string,
    username: data.user.user_metadata['user_name'] as string,
    avatar: data.user.user_metadata['avatar_url'] as string,
  };
});
