import { cache } from 'react';

import { supabaseServer } from '@/supabase/utils/server';
import { getUser } from '@/supabase/getUser';

import CommentsInfo from '@/app/posts/[post]/_components/tools/CommentsInfo';
import AddComment from '@/app/posts/[post]/_components/tools/AddComment';

const getPostsProfilesComments = cache(async (commentId: string) => {
  const supabase = supabaseServer();
  const { data } = await supabase
    .from('posts')
    .select(`id, content, profiles(avatar_url, user_name), comments(*)`)
    .eq('id', commentId)
    .single();
  return data;
});

const DuplicateCommentsPage = async ({ params }: { params: { comments: string } }) => {
  const commentId = params.comments;
  const postData = await getPostsProfilesComments(commentId);
  const userData = await getUser();

  return (
    <>
      {postData?.comments && postData.profiles && userData ? (
        <div
          className={`flex flex-col justify-between w-full bg-white text-black overflow-auto overflow-width-scroll desktop:w-1/2 border-0 h-[100vh] desktop:h-[80vh] px-3 pb-12 tablet:pb-0`}
        >
          <div className="h-full overflow-auto overflow-width-scroll">
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

export default DuplicateCommentsPage;
