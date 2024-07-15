import { supabaseServer } from '@/supabase/utils/server';
import ShowPosts from './ShowPosts';
import { getUser } from '@/supabase/getUser';

const PostsViewer = async () => {
  const supabase = supabaseServer();
  const userInfo = await getUser();
  if (!userInfo) return 'Something went wrong, please check your internet connection';
  const { data: following, error: followingError } = await supabase
    .from('follows')
    .select('followed_id')
    .eq('follower_id', userInfo.id as string);

  if (followingError) return <ShowPosts data={null} ownUserId={userInfo.id as string} />;
  const followingIds = following.map((follow) => follow.followed_id);
  const { data: posts } = await supabase
    .from('posts')
    .select(`id, content, media_url, profiles(user_name, avatar_url, user_id, full_name)`)
    .in('user_id', [userInfo.id as string, ...followingIds])
    .order('created_at', { ascending: false });

  return (
    <div className="tablet:mx-5">
      <ShowPosts data={posts} ownUserId={userInfo.id as string} />
    </div>
  );
};

export default PostsViewer;
