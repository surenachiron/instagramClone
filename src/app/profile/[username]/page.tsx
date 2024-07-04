import Box from '@/components/Box';
import ProfileInfo from './_component/info/ProfileInfo';
import { supabaseClient } from '@/supabase/utils/client';
import { cookies } from 'next/headers';
import PostsInProfile from './_component/posts';

export const revalidate = 240;

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const supabase = supabaseClient();
  const username = decodeURIComponent(params.username);
  const enterUsername = cookies().get('username');
  const { data } = await supabase.from('profiles').select(`*, posts(id)`).eq('user_name', username).single();

  if (data) {
    if (username === enterUsername?.value)
      return (
        <>
          <ProfileInfo
            key={data.id}
            profile={{ name: data.full_name!, username: data.user_name!, bio: data.bio!, avatar: data.avatar_url! }}
            buttons={[
              { primaryText: data.posts.length.toString(), secondaryText: 'Posts' },
              { primaryText: '2', secondaryText: 'Followers' },
              { primaryText: '0', secondaryText: 'Following' },
            ]}
          />
          <PostsInProfile user_id={data.user_id} />
        </>
      );
    else {
      return (
        <>
          <ProfileInfo
            key={data.id}
            profile={{ name: data.full_name!, username: data.user_name!, bio: data.bio!, avatar: data.avatar_url! }}
            buttons={[
              { primaryText: data.posts.length.toString(), secondaryText: 'Posts' },
              { primaryText: '0', secondaryText: 'Followers' },
              { primaryText: '0', secondaryText: 'Following' },
            ]}
            privateProfile={true}
          />
          <PostsInProfile privatePosts={true} user_id={data.user_id} />
        </>
      );
    }
  } else
    return (
      <Box classes="h-min-[80vh]">
        <div className="w-full h-full flex justify-center items-center text-black">
          something went wrong, please try again.
        </div>
      </Box>
    );
};

export default ProfilePage;
