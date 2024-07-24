import { cache } from 'react';
import { cookies } from 'next/headers';

import { supabaseServer } from '@/supabase/utils/server';

import Box from '@/components/Box';
import ProfileInfo from './ProfileInfo';
import CopyLink from '@/components/CopyLink';

const getProfileWithPosts = cache(async () => {
  const supabase = supabaseServer();
  const enterUsername = cookies().get('username')?.value as string;
  const { data } = await supabase
    .from('profiles')
    .select(`*, posts(id, media_url)`)
    .eq('user_name', enterUsername)
    .limit(9, { foreignTable: 'posts' })
    .single();
  return data;
});

const ProfileSide = async () => {
  const enterUsername = cookies().get('username')?.value as string;
  const data = await getProfileWithPosts();

  return (
    <Box classes="col-span-1 h-fit rounded-md desktop:flex hidden bg-none sticky top-16">
      {data ? (
        <ProfileInfo
          profile={{
            avatar: data?.avatar_url as string,
            bio: data.bio as string,
            name: data.full_name as string,
            username: data.user_name as string,
          }}
          posts={data.posts}
          buttons={[
            { primaryText: 'Edit Profile', link: '/profile/edit' },
            {
              element: (
                <CopyLink
                  text="Share profile"
                  customPath={`/profile/${enterUsername}`}
                  classes="bg-[#f1f1f1] justify-center text-[14px]"
                />
              ),
            },
          ]}
        />
      ) : (
        <div className="p-2">Something went wrong, Please check your internet connection.</div>
      )}
    </Box>
  );
};

export default ProfileSide;
