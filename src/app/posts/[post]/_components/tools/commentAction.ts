'use server';

import { supabaseServer } from '@/supabase/utils/server';

type postCommentType = {
  comment: string;
  avatar: string;
  username: string;
  post_id: string;
  user_id: string;
};

export async function postComment(data: postCommentType) {
  const supabase = supabaseServer();
  const { error } = await supabase.from('comments').insert([
    {
      comment_text: data.comment,
      user_name: data.username,
      avatar_url: data.avatar,
      post_id: data.post_id,
      user_id: data.user_id,
    },
  ]);
  if (!error) return true;
  return false;
}
