'use server';

import { redirect } from 'next/navigation';
import { supabaseServer } from './utils/server';
import RandomPath from '@/hooks/RandomPath';

export const setAvatar = async (formData: FormData) => {
  const file = formData.get('imageAvatar') as File;
  const oldAvatar = formData.get('oldAvatarUrl') as string;
  const filePath = RandomPath(file.name);
  const supabase = supabaseServer();

  const { error: userError } = await supabase.auth.getUser();
  if (userError) return redirect('/auth/login');

  await supabase.storage.from('avatars').remove([oldAvatar]);
  const { data, error } = await supabase.storage.from('avatars').upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) return { response: false, newFile: undefined };

  const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${data.path}`;
  await supabase.auth.updateUser({
    data: { avatar_url: imageUrl },
  });
  return { response: true, newFile: filePath };
};

export const removeAvatar = async (oldAvatar: string) => {
  const supabase = supabaseServer();
  const { error: userError } = await supabase.auth.getUser();
  if (userError) return redirect('/auth/login');

  const { error } = await supabase.storage.from('avatars').remove([oldAvatar]);
  await supabase.auth.updateUser({
    data: { avatar_url: '' },
  });

  if (!error) return true;
};
