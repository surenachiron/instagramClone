import { supabaseClient } from '@/supabase/utils/client';
import EditProfile from './_component/EditProfile';
import { cookies } from 'next/headers';

export const revalidate = 30;

const ProfilePage = async () => {
  const supabase = supabaseClient();
  const cookiesStore = cookies();
  const username = cookiesStore.get('username')?.value;
  const { data, error } = await supabase.from('profiles').select('*').eq('user_name', username!).single();

  if (error) return false;
  return <EditProfile profile={data} />;
};

export default ProfilePage;
