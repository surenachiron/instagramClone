import { cache } from 'react';
import { supabaseServer } from './utils/server';

export const getFollowers = cache(async (username: string) => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('follows')
    .select(`follower:profiles!follows_follower_id_fkey (user_id, user_name, avatar_url, full_name)`)
    .eq('followed_id', username)
    .order('created_at', { ascending: false });
  return { data, error };
});
