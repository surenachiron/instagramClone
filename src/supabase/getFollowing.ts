import { cache } from 'react';

import { supabaseServer } from './utils/server';

export const getFollowings = cache(async (username: string) => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('follows')
    .select(`followed:profiles!follows_followed_id_fkey (user_id, user_name, avatar_url, full_name)`)
    .eq('follower_id', username)
    .order('created_at', { ascending: false });
  return { data, error };
});
