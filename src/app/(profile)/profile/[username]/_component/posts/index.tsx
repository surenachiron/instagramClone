import { cache } from 'react';

import { BiCamera } from 'react-icons/bi';

import { supabaseServer } from '@/supabase/utils/server';

import Box from '@/components/Box';
import NewPost from '@/app/(profile)/profile/newPost/post/NewPost';
import ShowPosts from './ShowPosts';

const getPostAndProfile = cache(async (user_id: string) => {
  const supabase = supabaseServer();
  const { data, error } = await supabase
    .from('posts')
    .select('*, profiles(user_name, full_name, avatar_url, user_id), comments(*), likes(count)')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });
  return { data, error };
});

const PostsInProfile = async ({ privatePosts = false, user_id }: { privatePosts?: boolean; user_id: string }) => {
  const { data, error } = await getPostAndProfile(user_id);

  return (
    <>
      {data && data?.length ? (
        <ShowPosts data={data} />
      ) : (
        <Box classes="text-black flex justify-center gap-3 py-10">
          {privatePosts ? (
            <>
              <div className="p-2 border border-black rounded-full">
                <BiCamera className="text-4xl text-black" />
              </div>
              <h4 className="text-2xl font-bold">No Posts Yet</h4>
            </>
          ) : (
            <>
              <div className="p-2 border border-black rounded-full">
                <BiCamera className="text-4xl text-black" />
              </div>
              <h4 className="text-2xl font-bold">Share Photos</h4>
              <span className="text-grayMiddle">When you share photos, they will appear on your profile.</span>
              <div className="w-1/2 desktop:w-1/3">
                <NewPost icon={<p className="text-white font-bold">Create your first post</p>} />
              </div>
            </>
          )}
        </Box>
      )}
      {error && 'Something went wrong, Please check your internet connection.'}
    </>
  );
};

export default PostsInProfile;
