'use client';

import { forwardRef, useEffect, useRef } from 'react';
import Image from 'next/image';
import { ShowSingePosts, UserData } from './TsShowPosts';
import Modal from '@/components/Modal';
import { useUtilStore } from '@/store/util';
import { usePostsStore } from '@/store/posts';
import CommentsInfo from '@/app/posts/[post]/_components/tools/CommentsInfo';
import PostTools from '@/app/posts/[post]/_components/tools/PostTools';
import UserPostInfoModalSlide from './UserPostInfoModalSlide';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = { data: ShowSingePosts; userData: UserData; onOpen: () => void };

const PostModalSlide = forwardRef<HTMLDialogElement, Props>(({ data, userData, onOpen }, ref) => {
  PostModalSlide.displayName = 'postModal';

  const { username } = useUtilStore();
  const { initialPost } = usePostsStore();
  const swiperRef = useRef<SwiperClass | null>(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(initialPost);
    }
  }, [initialPost]);

  return (
    <div>
      <Modal
        onOpen={onOpen}
        ref={ref}
        iconStyle="p-0"
        divideClose={true}
        DialogContentClasses={'max-w-[75%] p-0 rounded-none'}
      >
        <Swiper
          navigation={true}
          modules={[Navigation]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className="h-full singlePostSwi"
        >
          {data.map((post) => (
            <SwiperSlide key={post.id} className="flex w-full gap-3 h-[calc(100vh-5em)]">
              <div className="h-full w-full tablet:w-1/2 order-2 tablet:order-1 bg-grayMiddle">
                <Image src={post.media_url} alt={post.content} width={500} height={500} className="w-full h-full" />
              </div>
              <div className="w-full tablet:w-1/2 order-1 tablet:order-2 flex flex-col px-3 pt-2">
                <UserPostInfoModalSlide
                  profiles={post.profiles!}
                  post_id={post.id}
                  privateUser={username !== post.profiles?.user_name ? true : false}
                />
                <hr className="hidden tablet:block w-full mt-1" />
                <div className="hidden tablet:block h-full overflow-auto relative">
                  {post.profiles && (
                    <CommentsInfo
                      post_id={post.id}
                      profiles={{ avatar_url: post.profiles.avatar_url!, user_name: post.profiles.user_name! }}
                      caption={post.content}
                    />
                  )}
                </div>
                <hr className="w-full hidden tablet:block" />
                <div className="hidden tablet:block">
                  <PostTools
                    avatar={userData.user?.user_metadata.avatar_url}
                    username={userData.user?.user_metadata.user_name}
                    user_id={userData.user?.id as string}
                    post_id={post.id}
                    createdAt={post.created_at!}
                  />
                </div>
              </div>
              <div className="block order-3 tablet:hidden mx-3">
                <PostTools
                  avatar={userData.user?.user_metadata.avatar_url}
                  username={userData.user?.user_metadata.user_name}
                  user_id={userData.user?.user_metadata.user_id}
                  post_id={post.id}
                  createdAt={post.created_at!}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Modal>
    </div>
  );
});

export default PostModalSlide;
