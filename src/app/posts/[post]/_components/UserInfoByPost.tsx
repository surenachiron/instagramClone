import Image from 'next/image';
import Link from 'next/link';
import { supabaseServer } from '@/supabase/utils/server';
import Box from '@/components/Box';
import SkeletonUserInfoByPost from './SkeletonUserInfoByPost';

type Props = {
  userData: {
    user_name: string | null;
    full_name: string | null;
    avatar_url: string | null;
    user_id: string;
  };
  classes: string;
};

const UserInfoByPost = async ({ userData, classes }: Props) => {
  const supabase = supabaseServer();
  const { data } = await supabase.from('posts').select('*').eq('user_id', userData.user_id).limit(3);

  return (
    <>
      {data ? (
        <Box classes={`absolute top-[34px] z-20 p-[6px] w-[350px] shadow-xl ${classes}`}>
          <Link href={`/profile/${userData.user_name}`} className="flex items-center gap-2 mx-3 group relative">
            <div className="w-[55px] h-[55px]">
              <Image
                src={userData.avatar_url ? userData.avatar_url : '/anonymous.png'}
                alt={`avatar of ${userData.user_name}`}
                width={150}
                height={150}
                className="rounded-full object-cover w-full h-full"
              />
            </div>
            <div className="flex flex-col justify-center w-fit">
              <p className="swiper-no-swiping text-black">{userData.user_name}</p>
              <p className="swiper-no-swiping text-grayMiddle text-sm">{userData.full_name}</p>
            </div>
          </Link>
          <hr className="my-2" />
          <div className="grid grid-cols-12 gap-1">
            {data &&
              data.map((post) => (
                <div key={post.id} className="col-span-4 h-36 cursor-pointer">
                  <Link href={`/posts/${post.id}`}>
                    <Image
                      src={post.media_url ? post.media_url : '/anonymous.png'}
                      alt="test"
                      className="w-full h-full"
                      width={300}
                      height={300}
                    />
                  </Link>
                </div>
              ))}
          </div>
        </Box>
      ) : (
        <SkeletonUserInfoByPost />
      )}
    </>
  );
};

export default UserInfoByPost;
