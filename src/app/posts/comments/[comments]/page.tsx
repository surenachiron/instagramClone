import { cache } from 'react';

import { supabaseServer } from '@/supabase/utils/server';
import { getUser } from '@/supabase/getUser';

import CommentsInfo from '../../[post]/_components/tools/CommentsInfo';
import AddComment from '../../[post]/_components/tools/AddComment';

const getPostsProfilesComments = cache(async (commentId: string) => {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from('posts')
    .select(`id, content, profiles(avatar_url, user_name), comments(*)`)
    .eq('id', commentId)
    .single();
  return data;
});

const CommentsPage = async ({ params }: { params: { comments: string } }) => {
  const commentId = params.comments;
  const postData = await getPostsProfilesComments(commentId);
  const userData = await getUser();

  return (
    <>
      {postData?.comments && postData.profiles && userData ? (
        <div className="flex flex-col justify-between w-full h-[85vh]">
          <div className="h-full overflow-auto">
            <CommentsInfo
              post_id={postData.id}
              profiles={{ avatar_url: postData.profiles.avatar_url!, user_name: postData.profiles.user_name! }}
              caption={postData.content}
              errorClasses="h-full"
            />
          </div>
          <AddComment
            post_id={postData.id}
            avatar={userData.avatar}
            user_id={userData.id}
            username={userData.username}
          />
        </div>
      ) : (
        'Something went wrong, Please check your internet connection.'
      )}
    </>
  );
};

export default CommentsPage;
