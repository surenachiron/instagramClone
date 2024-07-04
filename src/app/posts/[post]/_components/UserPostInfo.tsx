import Image from 'next/image';
import Link from 'next/link';
import UserInfoByPost from './UserInfoByPost';
import DeletePostModal from './DeletePostModal';

type Props = {
  profiles: {
    user_name: string | null;
    full_name: string | null;
    avatar_url: string | null;
    user_id: string;
  };
  post_id: string;
  privateUser?: boolean;
};

const UserPostInfo = ({ profiles, post_id, privateUser = false }: Props) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="group relative w-fit">
        <Link href={`/profile/${profiles.user_name}`} className="flex items-center gap-2">
          <div className="w-[35px] h-[35px]">
            <Image
              src={profiles.avatar_url ? profiles.avatar_url : '/anonymous.png'}
              alt={`avatar of ${profiles.user_name}`}
              width={150}
              height={150}
              className="rounded-full object-cover w-full h-full"
            />
          </div>
          <p className="swiper-no-swiping text-black">{profiles.user_name}</p>
        </Link>
        <UserInfoByPost classes="hidden group-hover:inline-block" userData={profiles} />
      </div>
      {privateUser === false && <DeletePostModal post_id={post_id} user_name={profiles.user_name!} />}
    </div>
  );
};

export default UserPostInfo;
