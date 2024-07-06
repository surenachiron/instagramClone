import Image from 'next/image';
import { supabaseServer } from '@/supabase/utils/server';
import PostTools from './_components/tools/PostTools';
import CommentsInfo from './_components/tools/CommentsInfo';
import UserPostInfo from './_components/UserPostInfo';

const ShowSinglePost = async ({ params }: { params: { post: string } }) => {
  const post = params.post;
  const supabase = supabaseServer();
  const { data: postData } = await supabase
    .from('posts')
    .select(`*, profiles(user_name, full_name, avatar_url, user_id), comments(*)`)
    .eq('id', post)
    .single();
  const { data: userData } = await supabase.auth.getUser();

  return (
    <>
      {postData && postData.profiles && userData ? (
        <div className="flex tablet:flex-row flex-col w-full gap-x-3 gap-y-2 pt-2 tablet:pt-0 h-full tablet:h-[90vh] tablet:border">
          <div className="h-[450px] tablet:h-full w-full tablet:w-1/2 order-2 tablet:order-1 bg-grayMiddle">
            <Image src={postData.media_url} alt={postData.content} width={500} height={500} className="w-full h-full" />
          </div>
          <div className="w-full tablet:w-1/2 order-1 tablet:order-2 flex flex-col px-3 pt-2">
            <UserPostInfo
              profiles={postData.profiles}
              post_id={postData.id}
              privateUser={userData.user?.user_metadata.user_name === postData.profiles.user_name ? false : true}
            />
            <hr className="hidden tablet:block w-full mt-1" />
            <div className="hidden tablet:block h-full overflow-auto relative">
              <CommentsInfo
                post_id={postData.id}
                profiles={{ avatar_url: postData.profiles.avatar_url!, user_name: postData.profiles.user_name! }}
                caption={postData.content}
              />
            </div>
            <hr className="w-full hidden tablet:block" />
            <div className="hidden tablet:block">
              <PostTools
                avatar={userData.user?.user_metadata.avatar_url}
                username={userData.user?.user_metadata.user_name}
                user_id={userData.user?.id as string}
                post_id={postData.id}
                createdAt={postData.created_at!}
              />
            </div>
          </div>
          <div className="block order-3 tablet:hidden mx-3">
            <PostTools
              avatar={userData.user?.user_metadata.avatar_url}
              username={userData.user?.user_metadata.user_name}
              user_id={userData.user?.id as string}
              post_id={postData.id}
              createdAt={postData.created_at!}
              caption={{
                id: postData.profiles.user_id!,
                content: postData.content,
                user_name: postData.profiles.user_name!,
              }}
            />
          </div>
        </div>
      ) : (
        'Something went wrong.'
      )}
    </>
  );
};

export default ShowSinglePost;
