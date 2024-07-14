'use server';

import { supabaseServer } from '@/supabase/utils/server';
import { SearchInputType } from './SearchBox';

export const searchResult = async (text: SearchInputType) => {
  const searchTerm = `%${'@' + text.searchUser.trim().toLowerCase()}%`;
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('profiles')
    .select(`user_id, user_name, full_name, avatar_url`)
    .like('user_name', searchTerm);
  if (error) return 'Something went wrong, please try again.';
  if (data?.length === 0) return 'no matching profiles found.';
  return data;
};
