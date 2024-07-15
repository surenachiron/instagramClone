import Image from 'next/image';
import Link from 'next/link';

import { getUser } from '@/supabase/getUser';
import { getFollowings } from '@/supabase/getFollowing';

import Box from '@/components/Box';
import FollowUser from '../../profile/[username]/_component/info/FollowUser';

type Props = {
  user: [username: string, user_id: string];
};

const FollowingPage = async ({ params }: { params: Props }) => {
  const { data: following } = await getFollowings(params.user[1]);
  const nowUsername = await getUser();

  return (
    <Box classes="rounded-md w-full min-h-[80vh] h-full pt-0 tablet:py-4 gap-2" backGround="bg-grayBack">
      <Box classes="p-3 desktop:p-6 justify-start w-full h-full tablet:h-fit tablet:w-3/4 gap-y-2" align="items-start">
        {following ? (
          following.length > 0 ? (
            <>
              {following.map(({ followed }) => (
                <div className="flex justify-between items-center w-full" key={followed?.user_id}>
                  <Link href={`/profile/${followed?.user_name}`}>
                    <div className="flex items-center gap-x-3 pb-2">
                      <Image
                        src={followed?.avatar_url ? followed?.avatar_url : '/anonymous.png'}
                        alt={`avatar of ${followed?.user_name}`}
                        width={150}
                        height={150}
                        className={'w-[55px] h-[55px] rounded-full'}
                      />
                      <div className="flex flex-col gap-y-1">
                        <p className="text-black text-sm">{followed?.user_name}</p>
                        <span className="text-sm">{followed?.full_name}</span>
                      </div>
                    </div>
                  </Link>
                  <div className="w-fit">
                    {followed?.user_id !== (nowUsername.id as string) && (
                      <FollowUser user_id={nowUsername.id as string} user_profile={followed?.user_id as string} />
                    )}
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex justify-between items-center w-full">You don&#39;t follow anybody.</div>
          )
        ) : (
          'Something went wrong, Please check your internet connection.'
        )}
      </Box>
    </Box>
  );
};

export default FollowingPage;
