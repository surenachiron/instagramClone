'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCreative, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export type TMultiPosts = { post: { image: string; link: string }[] };

const MultiplePosts = ({ post }: TMultiPosts) => {
  return (
    <Swiper
      grabCursor={true}
      effect={'creative'}
      creativeEffect={{
        prev: {
          shadow: true,
          translate: ['20%', 0, -1],
        },
        next: {
          translate: ['100%', 0, 0],
        },
      }}
      navigation={true}
      pagination={{
        dynamicBullets: true,
      }}
      className="postNav z-0 rounded-lg w-full h-full"
      modules={[EffectCreative, Navigation, Pagination]}
    >
      {post.map((data) => (
        <SwiperSlide key={data.link} className={'rounded-lg'}>
          <Image src={data.image} alt={data.link} width={500} height={300} className="w-full h-full" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MultiplePosts;
