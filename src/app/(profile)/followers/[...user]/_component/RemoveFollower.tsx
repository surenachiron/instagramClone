'use client';

import { useState } from 'react';
import Button from '@/components/Button';
import { supabaseClient } from '@/supabase/utils/client';

type Props = {
  followerID: string;
  followedID: string;
  privateArea?: boolean;
};

const RemoveFollower = ({ followerID, followedID, privateArea }: Props) => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const supabase = supabaseClient();

  async function unFollowing() {
    setLoading(true);
    const { error } = await supabase
      .from('follows')
      .delete()
      .eq('follower_id', followerID)
      .eq('followed_id', followedID);
    if (!error) setResult(true);
    setLoading(false);
  }

  return (
    <>
      {privateArea && (
        <Button
          classes="bg-grayBack text-black py-1 px-3 rounded-lg text-sm"
          loading={loading}
          direction="row"
          onClick={unFollowing}
          disabled={result}
          Spinner={{ color: 'black', w: '20px', h: '20px' }}
        >
          Remove
        </Button>
      )}
    </>
  );
};

export default RemoveFollower;
