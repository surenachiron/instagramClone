import { cache } from 'react';
import { supabaseServer } from './utils/server';

export const getMostPopularUsers = cache(async (ownUserId: string) => {
  const supabase = supabaseServer();
  const { data } = await supabase.rpc('get_most_popular_users', { user_id_to_exclude: ownUserId });

  return data;
});
