import { cache } from 'react';

import { supabaseServer } from '@/supabase/utils/server';
import { getUser } from '@/supabase/getUser';

import ShowPosts from './ShowPosts';

const getPosts = cache(async (userId: string, followingIDs: (string | null)[]) => {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from('posts')
    .select(`id, content, media_url, profiles(user_name, avatar_url, user_id, full_name)`)
    .in('user_id', [userId, ...followingIDs])
    .order('created_at', { ascending: false });
  return data;
});

const getFollowings = cache(async (userId: string) => {
  const supabase = supabaseServer();
  const { data } = await supabase.from('follows').select('followed_id').eq('follower_id', userId);
  return { data };
});

const PostsViewer = async () => {
  const userInfo = await getUser();
  if (!userInfo) return 'Something went wrong, please check your internet connection';
  const { data: following } = await getFollowings(userInfo.id);

  if (!following) return <ShowPosts data={null} ownUserId={userInfo.id as string} />;
  const followingIds = following.map((follow) => follow.followed_id);
  const posts = await getPosts(userInfo.id as string, followingIds);

  return (
    <div className="tablet:mx-5">
      <ShowPosts data={posts} ownUserId={userInfo.id as string} />
    </div>
  );
};

export default PostsViewer;
