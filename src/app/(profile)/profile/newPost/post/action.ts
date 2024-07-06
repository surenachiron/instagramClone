'use server';

import RandomPath from '@/hooks/RandomPath';
import { supabaseServer } from '@/supabase/utils/server';

export const createNewPost = async (data: FormData) => {
  const caption = data.get('caption') as string;
  const imagePost = data.get('media') as File;

  const filePath = RandomPath(imagePost.name);
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/posts/${filePath}`;

  const supabase = supabaseServer();
  const { data: userData } = await supabase.auth.getUser();
  if (userData) {
    const { data: dataUpload } = await supabase.storage.from('posts').upload(filePath, imagePost, {
      cacheControl: '3600',
      upsert: false,
    });
    if (dataUpload) {
      await supabase.from('posts').insert({ media_url: imageUrl, content: caption, user_id: userData.user?.id });
      return true;
    }
    return false;
  }
};
