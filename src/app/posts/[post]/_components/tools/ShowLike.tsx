'use client';

import { useState, useEffect, useCallback } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import { supabaseClient } from '@/supabase/utils/client';
import Button from '@/components/Button';
import { removeLike, setLike } from './likeAction';

type Props = {
  username: string;
  avatarUrl: string;
  userId: string;
  postId: string;
};

const ShowLike = ({ username, avatarUrl, userId, postId }: Props) => {
  const [data, setData] = useState<number | undefined>();
  const [hasLiked, setHasLiked] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = supabaseClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { count, error } = await supabase.from('likes').select('*', { count: 'exact' }).eq('post_id', postId);
      const { error: isUserLikedError } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();
      if (error || isUserLikedError) {
        setData(undefined);
        setHasLiked(false);
      } else {
        setData(count!);
        setHasLiked(true);
      }
    } catch (error) {
      setHasLiked(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function setShowLike() {
    const data = { username, avatarUrl, postId, userId };
    setLoading(true);
    await setLike(data);
    await fetchData();
  }

  async function removeShowLike() {
    const data = { postId, userId };
    setLoading(true);
    await removeLike(data);
    await fetchData();
  }

  if (loading)
    return (
      <Button loading={loading} Spinner={{ w: '20px', h: '20px', color: '#3797ef' }}>
        {' '}
      </Button>
    );

  return (
    <div className="flex flex-col items-center">
      {hasLiked ? (
        <Button onClick={removeShowLike}>
          <FaHeart className="text-2xl" color="red" />
        </Button>
      ) : (
        <Button onClick={setShowLike}>
          <FaRegHeart className="text-2xl" color="black" />
        </Button>
      )}
      {typeof data === 'number' && data > 0 && <span>{data}</span>}
    </div>
  );
};

export default ShowLike;
