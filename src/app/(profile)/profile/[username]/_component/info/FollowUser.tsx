'use client';

import { RotateSpinner } from '@/components/Icons/RotateSpinner';
import { supabaseClient } from '@/supabase/utils/client';
import { useEffect, useState } from 'react';

type Props = {
  user_profile: string;
  user_id: string;
};

const FollowUser = ({ user_profile, user_id }: Props) => {
  const supabase = supabaseClient();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasFollowed, setHasFollowed] = useState<boolean>();

  async function following() {
    setLoading(true);
    const { error } = await supabase.from('follows').insert([{ follower_id: user_id, followed_id: user_profile }]);
    if (!error) setHasFollowed(true);
    setLoading(false);
  }

  async function unFollowing() {
    setLoading(true);
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', user_id)
      .eq('followed_id', user_profile);
    if (!error) setHasFollowed(false);
    setLoading(false);
  }

  useEffect(() => {
    const getInitialFollowed = async () => {
      const { data, error } = await supabase
        .from('follows')
        .select('*')
        .eq('follower_id', user_id)
        .eq('followed_id', user_profile);
      if (!error && data.length > 0) {
        setHasFollowed(true);
      } else {
        setHasFollowed(false);
      }
    };
    getInitialFollowed();
  }, [user_id, user_profile, supabase]);

  return (
    <>
      {hasFollowed === undefined ? (
        <button className="bg-[#f1f1f1] py-1 px-5 text-black rounded-lg text-sm w-full flex justify-center">
          <RotateSpinner color="black" h="20px" w="20px" />
        </button>
      ) : hasFollowed ? (
        <button
          className="bg-[#f1f1f1] py-1 px-5 text-black rounded-lg text-sm w-full"
          onClick={unFollowing}
          disabled={loading}
        >
          Following
        </button>
      ) : (
        <button
          className="bg-blue py-1 px-5 text-white rounded-lg text-sm w-full"
          onClick={following}
          disabled={loading}
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowUser;
