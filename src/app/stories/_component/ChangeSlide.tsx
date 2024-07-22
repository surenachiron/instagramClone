import type { Swiper as SwiperType } from 'swiper';

const ChangeSlide = ({ parentSwiper }: { parentSwiper: SwiperType | null }) => {
  return (
    <>
      <div
        className="absolute top-[15%] right-0 h-[89%] w-1/4 cursor-pointer"
        onClick={() => parentSwiper?.slideNext()}
      />
      <div
        className="absolute top-[15%] left-0 h-[89%] w-1/4 cursor-pointer"
        onClick={() => parentSwiper?.slidePrev()}
      />
    </>
  );
};

export default ChangeSlide;
