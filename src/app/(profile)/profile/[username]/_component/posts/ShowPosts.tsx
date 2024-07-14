'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@/components/Box';
import { usePostsAction } from '@/store/posts';
import PreInfoPost from './PreInfoPost';
import { ShowSingePosts, UserData } from './TsShowPosts';

const ShowPosts = ({ data }: { data: ShowSingePosts; userData: UserData }) => {
  const newPostRef = useRef<HTMLDialogElement>(null);
  const { setInitialPost } = usePostsAction();

  return (
    <Box classes="grid grid-cols-12 gap-1">
      {data &&
        data.map((post, index) => (
          <Link href={`/posts/${post.id}`} className="col-span-4" key={post.id}>
            <div
              key={post.id}
              className="col-span-4 h-40 tablet:h-64 desktop:h-[300px] group transition-all relative cursor-pointer bg-grayMiddle"
              onClick={() => {
                setInitialPost(index);
                newPostRef.current?.showModal();
              }}
            >
              <Image
                src={post.media_url ? post.media_url : '/anonymous.png'}
                alt="test"
                className="w-full h-full"
                width={300}
                height={300}
              />
              <PreInfoPost commentsCount={post.comments.length} likesCount={post.likes[0].count} />
            </div>
          </Link>
        ))}
    </Box>
  );
};

export default ShowPosts;
