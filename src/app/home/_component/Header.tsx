import Link from 'next/link';
import PreviewStories from './HomeContent/story/PreviewStories';
import Button from '@components/Button';
import { LuMessageCircle } from 'react-icons/lu';
import { FaHeart } from 'react-icons/fa6';
import SearchBox from '@components/SearchBox';

const HomeHeader = () => {
  return (
    <div className="grid gap-3 grid-cols-1 desktop:grid-cols-3">
      <div className="col-span-1 desktop:col-span-2 order-2 desktop:order-1">
        <PreviewStories />
      </div>
      <div className="col-span-1 desktop:col-span-1 flex justify-between desktop:justify-end gap-2 order-1 desktop:order-2">
        <Button classes="bg-grayLight rounded-full h-fit p-2 order-3 desktop:order-1">
          <Link href={'/home'}>
            <LuMessageCircle className="text-black text-md tablet:text-lg" />
          </Link>
        </Button>
        <div className="desktop:hidden order-2 w-[50%]">
          <SearchBox bg="Light" padH={1} />
        </div>
        <Button classes="bg-white rounded-full h-fit p-2 order-1 desktop:order-3">
          <Link href={'/home'}>
            <FaHeart color="red" className="text-md tablet:text-lg" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
