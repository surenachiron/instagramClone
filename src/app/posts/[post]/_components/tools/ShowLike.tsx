'use client';

import { useState, useEffect, useCallback } from 'react';

import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import { supabaseClient } from '@/supabase/utils/client';
import { removeLike, setLike } from './likeAction';

import Button from '@/components/Button';

type Props = {
  username: string;
  avatarUrl: string;
  userId: string;
  postId: string;
  isShowCount?: boolean;
  parentClasses?: string;
  likedClasses?: string;
  unLikedClasses?: string;
};

const ShowLike = ({
  username,
  avatarUrl,
  userId,
  postId,
  isShowCount = true,
  parentClasses,
  likedClasses = 'text-2xl',
  unLikedClasses = 'text-2xl',
}: Props) => {
  const [data, setData] = useState<number | null>(null);
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
      console.log(isUserLikedError, error);
      if (error || isUserLikedError) {
        setData(count);
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
      <Button loading={loading} classes={parentClasses} Spinner={{ w: '20px', h: '20px', color: '#3797ef' }}>
        {' '}
      </Button>
    );

  return (
    <div className="flex flex-col items-center">
      {hasLiked ? (
        <Button onClick={removeShowLike} classes={parentClasses}>
          <FaHeart className={likedClasses} color="red" />
        </Button>
      ) : (
        <Button onClick={setShowLike} classes={parentClasses}>
          <FaRegHeart className={`${unLikedClasses}`} color="black" />
        </Button>
      )}
      {typeof data === 'number' && data > 0 && isShowCount && <span>{data}</span>}
    </div>
  );
};

export default ShowLike;
