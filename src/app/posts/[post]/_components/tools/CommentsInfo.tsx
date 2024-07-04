'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { supabaseClient } from '@/supabase/utils/client';
import CommentsLoading from '@/app/posts/comments/[comments]/loading';
import { CommentsTable } from '@/supabase/models/database';

type Props = {
  post_id: string;
  profiles: {
    avatar_url: string;
    user_name: string;
  };
  caption: string;
  errorClasses?: string;
};

const CommentsInfo = ({ post_id, profiles, caption, errorClasses = 'h-1/2' }: Props) => {
  const supabase = supabaseClient();
  const [data, setData] = useState<CommentsTable[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchComments();

    const commentSubscription = supabase
      .channel('comments-channel')
      .on<CommentsTable>(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
        },
        (payload) => {
          setData((prevComments) => [...(prevComments || []), payload.new]);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(commentSubscription);
    };
  }, []);

  async function fetchComments() {
    setLoading(true);
    const { data: commentsData } = await supabase.from('comments').select('*').eq('post_id', post_id);
    setLoading(false);
    if (commentsData && commentsData.length > 0) setData(commentsData);
  }

  return (
    <>
      <div className="flex items-center gap-x-2 my-2 border-b pb-2">
        <Image
          src={profiles.avatar_url ? profiles.avatar_url : '/anonymous.png'}
          alt={`avatar of ${profiles.user_name}`}
          width={150}
          height={150}
          className={'w-[35px] h-[35px] rounded-full'}
        />
        <div className="flex flex-col flex-y-1">
          <p className="text-black text-sm">{profiles.user_name}</p>
          <span className="text-sm">{caption}</span>
        </div>
      </div>
      {loading ? (
        <CommentsLoading />
      ) : data && data.length ? (
        <div className="w-full flex flex-col gap-y-2">
          {data
            .slice()
            .sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime())
            .map((comment) => (
              <Link href={`/profile/${comment.user_name}`} key={comment.id}>
                <div className="flex items-center gap-x-2">
                  <Image
                    src={comment.avatar_url ? comment.avatar_url : '/anonymous.png'}
                    alt={`avatar of ${comment.user_name}`}
                    width={150}
                    height={150}
                    className={'w-[35px] h-[35px] rounded-full'}
                  />
                  <div className="flex flex-col flex-y-1">
                    <p className="text-black text-sm">{comment.user_name}</p>
                    <span className="text-sm">{comment.comment_text}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      ) : (
        <div className={`py-2 w-full flex flex-col gap-y-2 ${errorClasses}`}>
          <div className="flex flex-col items-center justify-center w-full h-full">
            <h4 className="text-2xl font-bold text-black">No comments yet.</h4>
            <p>Start the conversation.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CommentsInfo;
