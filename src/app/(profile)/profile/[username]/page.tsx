import { cookies } from 'next/headers';
import { supabaseServer } from '@/supabase/utils/server';
import Box from '@/components/Box';
import ProfileInfo from './_component/info/ProfileInfo';
import PostsInProfile from './_component/posts';
import { cache } from 'react';
import { getUser } from '@/supabase/getUser';

const getProfiles = cache(async (username: string) => {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from('profiles')
    .select(
      `*,
      posts(id),
      following: follows!follower_id (
        followed_id,
        followed_profile: profiles!followed_id (user_id, user_name, avatar_url)
      ),
      followers: follows!followed_id (
        follower_id,
        follower_profile: profiles!follower_id (user_id, user_name, avatar_url)
      )
      `
    )
    .eq('user_name', username)
    .single();
  return data;
});

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const username = decodeURIComponent(params.username);
  const enterUsername = cookies().get('username');
  const data = await getProfiles(username);
  const userData = await getUser();

  if (data && userData) {
    if (username === enterUsername?.value)
      return (
        <>
          <ProfileInfo
            key={data.id}
            profile={{
              name: data.full_name!,
              username: data.user_name!,
              bio: data.bio!,
              avatar: data.avatar_url!,
              id: data.user_id!,
              nowUserId: userData.id as string,
            }}
            buttons={[
              { primaryText: data.posts.length, secondaryText: 'Posts', classes: 'cursor-auto' },
              {
                primaryText: data?.followers.length,
                secondaryText: 'Followers',
                link: `/followers/${data.user_name}/${data.user_id!}`,
              },
              {
                primaryText: data?.following.length,
                secondaryText: 'Following',
                link: `/following/${data.user_name}/${data.user_id!}`,
              },
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
            profile={{
              name: data.full_name!,
              username: data.user_name!,
              bio: data.bio!,
              avatar: data.avatar_url!,
              id: data.user_id!,
              nowUserId: userData.id as string,
            }}
            buttons={[
              { primaryText: data.posts.length, secondaryText: 'Posts', classes: 'cursor-auto' },
              {
                primaryText: data?.followers.length,
                secondaryText: 'Followers',
                link: `/followers/${data.user_name}/${data.user_id!}`,
              },
              {
                primaryText: data?.following.length,
                secondaryText: 'Following',
                link: `/following/${data.user_name}/${data.user_id!}`,
              },
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
