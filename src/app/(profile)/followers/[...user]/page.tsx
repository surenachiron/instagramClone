import Image from 'next/image';
import Link from 'next/link';
import { supabaseServer } from '@/supabase/utils/server';
import Box from '@/components/Box';
import RemoveFollower from './_component/RemoveFollower';
import FollowUser from '../../profile/[username]/_component/info/FollowUser';
import { getUser } from '@/supabase/getUser';

type Props = {
  user: [username: string, user_id: string];
};

const FollowersPage = async ({ params }: { params: Props }) => {
  const supabase = supabaseServer();
  const { data: followers } = await supabase
    .from('follows')
    .select(`follower:profiles!follows_follower_id_fkey (user_id, user_name, avatar_url, full_name)`)
    .eq('followed_id', params.user[1])
    .order('created_at', { ascending: false });
  const nowUsername = await getUser();

  return (
    <Box classes="rounded-md w-full min-h-[80vh] h-full pt-0 tablet:py-4 gap-2" backGround="bg-grayBack">
      <Box classes="p-3 desktop:p-6 justify-start w-full h-full tablet:h-fit tablet:w-3/4 gap-y-2" align="items-start">
        {followers ? (
          followers.length > 0 ? (
            <>
              {followers.map(({ follower }) => (
                <div className="flex justify-between items-center w-full" key={follower?.user_id}>
                  <Link href={`/profile/${follower?.user_name}`}>
                    <div className="flex items-center gap-x-3 pb-2">
                      <Image
                        src={follower?.avatar_url ? follower?.avatar_url : '/anonymous.png'}
                        alt={`avatar of ${follower?.user_name}`}
                        width={150}
                        height={150}
                        className={'w-[55px] h-[55px] rounded-full'}
                      />
                      <div className="flex flex-col gap-y-1">
                        <p className="text-black text-sm">{follower?.user_name}</p>
                        <span className="text-sm">{follower?.full_name}</span>
                      </div>
                    </div>
                  </Link>
                  {follower?.user_id !== (nowUsername.id as string) && nowUsername.id !== params.user[1] && (
                    <div className="w-fit">
                      <FollowUser user_id={nowUsername.id as string} user_profile={follower?.user_id as string} />
                    </div>
                  )}
                  <RemoveFollower
                    followerID={follower?.user_id as string}
                    followedID={params.user[1]}
                    privateArea={nowUsername.id === params.user[1]}
                  />
                </div>
              ))}
            </>
          ) : (
            <div className="flex justify-between items-center w-full">You have no followers.</div>
          )
        ) : (
          'Something went wrong, Please check your internet connection.'
        )}
      </Box>
    </Box>
  );
};

export default FollowersPage;
