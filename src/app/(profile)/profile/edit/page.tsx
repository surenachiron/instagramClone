import { cookies } from 'next/headers';

import { getSingleProfile } from '@/supabase/getProfiles';
import EditProfile from './_component/EditProfile';

export const revalidate = 30;

const ProfilePage = async () => {
  const cookiesStore = cookies();
  const username = cookiesStore.get('username')?.value;
  const data = await getSingleProfile(username as string);

  if (data) return false;
  return <EditProfile profile={data} />;
};

export default ProfilePage;
