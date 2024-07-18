'use client';

import Image from 'next/image';
import Link from 'next/link';

import UserInfoByPost from '@/app/posts/[post]/_components/UserInfoByPost';
import CaptionAndTools from './tools/CaptionAndTools';
import PostDropdown from './tools/PostDropdown';
import SuggestUsers from './SuggestUsers';

type homePostT = {
  data:
    | {
        id: string;
        content: string;
        media_url: string;
        profiles: {
          user_name: string | null;
          avatar_url: string | null;
          user_id: string;
          full_name: string | null;
        } | null;
      }[]
    | null;
  user: { id: string; avatar: string; username: string };
};

const ShowPosts = ({ data, user }: homePostT) => {
  return (
    <div className="relative flex flex-col gap-5">
      {data ? (
        data.length > 0 ? (
          data?.slice(0, 10).map((post) => (
            <div className="relative justify-between rounded-lg w-full h-[85vh] desktop:h-[90vh]" key={post.id}>
              <Image
                src={post.media_url}
                alt={post.profiles?.user_name as string}
                width={500}
                height={300}
                className="w-full h-full rounded-lg"
              />
              <div className="absolute top-0 w-full px-3 py-2 text-white flex justify-between items-center">
                <div className="group relative w-fit">
                  <Link href={`/profile/${post.profiles?.user_name}`} className="flex items-center gap-2">
                    <Image
                      src={post.profiles?.avatar_url ? post.profiles?.avatar_url : '/anonymous.png'}
                      alt="user profile"
                      width={500}
                      height={500}
                      className="rounded-full bg-grayMiddle w-[30px] h-[30px]"
                    />
                    <p className="text-white text-xs mix-blend-difference">{post.profiles?.user_name}</p>
                  </Link>
                  <UserInfoByPost
                    classes="hidden group-hover:inline-block"
                    userData={{
                      avatar_url: post.profiles?.avatar_url as string,
                      user_name: post.profiles?.user_name as string,
                      full_name: post.profiles?.full_name as string,
                      user_id: post.profiles?.user_id as string,
                    }}
                  />
                </div>
                <PostDropdown
                  postId={post.id}
                  profileID={post.profiles?.user_id as string}
                  userID={user.id}
                  privateUser={user.id !== post.profiles?.user_id}
                  avatar={post.media_url}
                  followValue={true}
                />
              </div>
              <CaptionAndTools
                caption={post.content}
                postId={post.id}
                user={{
                  username: user.username,
                  avatar_url: user.avatar,
                  user_id: user.id,
                }}
              />
            </div>
          ))
        ) : (
          <SuggestUsers data={data} ownUserId={user.id} />
        )
      ) : (
        <div className="h-[200px] w-full flex flex-col items-center justify-center bg-white rounded-lg">
          <h3 className="text-xl text-bold text-black">Something went wrong, please try again.</h3>
        </div>
      )}
    </div>
  );
};

export default ShowPosts;
