'use server';

import { supabaseServer } from '@/supabase/utils/server';

type setLikeType = {
  username: string;
  avatarUrl: string;
  userId: string;
  postId: string;
};

export async function setLike(data: setLikeType) {
  const supabase = supabaseServer();
  const { error } = await supabase.from('likes').insert([
    {
      user_name: data.username,
      avatar_url: data.avatarUrl,
      post_id: data.postId,
      user_id: data.userId,
    },
  ]);
  if (!error) return true;
  return false;
}

type removeLikeType = {
  userId: string;
  postId: string;
};

export async function removeLike(data: removeLikeType) {
  const supabase = supabaseServer();
  const { error } = await supabase.from('likes').delete().eq('post_id', data.postId).eq('user_id', data.userId);
  if (!error) return true;
  return false;
}
