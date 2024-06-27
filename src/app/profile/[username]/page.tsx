import Box from '@/components/Box';
import ProfileInfo from './_component/ProfileInfo';
import { supabaseClient } from '@/supabase/utils/client';
import { cookies } from 'next/headers';

export const revalidate = 240;

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const supabase = supabaseClient();
  const username = decodeURIComponent(params.username);
  const enterUsername = cookies().get('username');
  const { data } = await supabase.from('profiles').select('*').eq('user_name', username);

  if (data) {
    if (username === enterUsername?.value)
      return (
        <>
          {data?.map((user) => (
            <ProfileInfo
              key={user.id}
              profile={{ name: user.full_name!, username: user.user_name!, bio: user.bio!, avatar: user.avatar_url! }}
              buttons={[
                { primaryText: '0', secondaryText: 'Posts' },
                { primaryText: '0', secondaryText: 'Followers' },
                { primaryText: '0', secondaryText: 'Following' },
              ]}
            />
          ))}
        </>
      );
    else {
      return (
        <>
          {data.map((user) => (
            <ProfileInfo
              key={user.id}
              profile={{ name: user.full_name!, username: user.user_name!, bio: user.bio!, avatar: user.avatar_url! }}
              buttons={[
                { primaryText: '0', secondaryText: 'Posts' },
                { primaryText: '0', secondaryText: 'Followers' },
                { primaryText: '0', secondaryText: 'Following' },
              ]}
              privateProfile={true}
            />
          ))}
        </>
      );
    }
  } else
    return (
      <Box classes="h-fit">
        <div className="w-full h-full flex justify-center items-center text-black">
          something went wrong, please try again.
        </div>
      </Box>
    );
};

export default ProfilePage;
