import { cache } from 'react';

import { supabaseServer } from './utils/server';

export const getSingleProfile = cache(async (username: string) => {
  const supabase = supabaseServer();

  const { data, error } = await supabase.from('profiles').select('*').eq('user_name', username!).single();

  if (error) return error;
  return data;
});
