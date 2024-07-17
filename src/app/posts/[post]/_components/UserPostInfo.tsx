import Image from 'next/image';
import Link from 'next/link';

import UserInfoByPost from './UserInfoByPost';
import PostDropdown from '@/app/(home)/_component/HomeContent/posts/tools/PostDropdown';

type Props = {
  profile: {
    user_name: string | null;
    full_name: string | null;
    avatar_url: string | null;
    user_id: string;
  };
  post_id: string;
  ownUserID: string;
  avatar: string;
};

const UserPostInfo = ({ profile, post_id, ownUserID, avatar }: Props) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="group relative w-fit">
        <Link href={`/profile/${profile.user_name}`} className="flex items-center gap-2">
          <div className="w-[35px] h-[35px]">
            <Image
              src={profile.avatar_url ? profile.avatar_url : '/anonymous.png'}
              alt={`avatar of ${profile.user_name}`}
              width={150}
              height={150}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <p className="swiper-no-swiping text-black">{profile.user_name}</p>
        </Link>
        <UserInfoByPost classes="hidden group-hover:inline-block" userData={profile} />
      </div>
      <PostDropdown
        postId={post_id}
        profileID={profile.user_id}
        userID={ownUserID}
        avatar={avatar}
        privateUser={profile.user_id === ownUserID ? false : true}
      />
    </div>
  );
};

export default UserPostInfo;
