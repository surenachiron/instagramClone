'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@/components/Box';
import { usePostsAction } from '@/store/posts';
import useSize from '@/hooks/useSize';
import PostModalSlide from './PostModalSlide';
import PreInfoPost from './PreInfoPost';
import { ContentProps, ShowSingePosts, UserData } from './TsShowPosts';

const ShowPosts = ({ data, userData }: { data: ShowSingePosts; userData: UserData }) => {
  const newPostRef = useRef<HTMLDialogElement>(null);
  const { setInitialPost } = usePostsAction();
  const windowSize = useSize();

  const content = ({ id, index, media_url, commentsCount, likesCount }: ContentProps) => {
    return (
      <div
        key={id}
        className="col-span-4 h-40 tablet:h-64 desktop:h-[300px] group transition-all relative cursor-pointer bg-grayMiddle"
        onClick={() => {
          setInitialPost(index);
          newPostRef.current?.showModal();
        }}
      >
        <Image
          src={media_url ? media_url : '/anonymous.png'}
          alt="test"
          className="w-full h-full"
          width={300}
          height={300}
        />
        <PreInfoPost commentsCount={commentsCount} likesCount={likesCount} />
      </div>
    );
  };

  return (
    <div>
      <Box classes="grid grid-cols-12 gap-1">
        {data &&
          data.map((post, index) => (
            <>
              {windowSize! >= 960 ? (
                content({
                  id: post.id,
                  index,
                  media_url: post.media_url,
                  commentsCount: post.comments.length,
                  likesCount: post.likes[0].count,
                })
              ) : (
                <Link href={`/posts/${post.id}`} className="col-span-4">
                  {content({
                    id: post.id,
                    index,
                    media_url: post.media_url,
                    commentsCount: post.comments.length,
                    likesCount: post.likes[0].count,
                  })}
                </Link>
              )}
            </>
          ))}
        {data && windowSize! >= 960 && (
          <PostModalSlide
            data={data!}
            userData={userData}
            onOpen={() => newPostRef.current?.showModal()}
            ref={newPostRef}
          />
        )}
      </Box>
    </div>
  );
};

export default ShowPosts;
