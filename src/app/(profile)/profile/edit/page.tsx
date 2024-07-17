import { cookies } from 'next/headers';

import { getSingleProfile } from '@/supabase/getProfiles';

import EditProfile from './_component/EditProfile';
import Box from '@/components/Box';

export const revalidate = 30;

const ProfilePage = async () => {
  const cookiesStore = cookies();
  const username = cookiesStore.get('username')?.value;
  const data = await getSingleProfile(username as string);

  if (data) return <EditProfile profile={data!} />;
  return (
    <Box classes="p-3 desktop:p-6 justify-start w-full h-full tablet:h-fit tablet:w-3/4 gap-y-2" align="items-start">
      Something went wrong, Please check your internet connection.
    </Box>
  );
};

export default ProfilePage;
