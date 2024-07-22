'use server';

import { redirect } from 'next/navigation';

import { supabaseServer } from '@/supabase/utils/server';
import { getUser } from '@/supabase/getUser';

import RandomPath from '@/hooks/RandomPath';

export default async function setStory(formData: FormData) {
  const storyFile = formData.get('storyImage') as File;
  const filePath = RandomPath(storyFile.name);
  console.log(filePath);

  const supabase = supabaseServer();
  const userData = await getUser();
  console.log('user response', userData);

  const { data, error } = await supabase.storage.from('stories').upload(filePath, storyFile, {
    cacheControl: '3600',
    upsert: false,
  });
  console.log('upload response', error, data);

  if (error) return false;
  ``;
  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/stories/${data.path}`;
  const { error: postingStoryError } = await supabase
    .from('stories')
    .insert({ user_id: userData.id, file_url: imageUrl });
  console.log('post story response', postingStoryError);

  if (postingStoryError) return false;
  return true;
}
