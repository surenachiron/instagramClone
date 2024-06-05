import Link from 'next/link';
import Button from '@/components/Button';
import SearchBox from '@/components/SearchBox';
import Skeleton from '@/components/Skeleton';
import Box from '@/components/Box';

import { FaHeart } from 'react-icons/fa6';
import { MdOutlineMoreHoriz } from 'react-icons/md';
import { LuMessageCircle } from 'react-icons/lu';

const buttons = [{ primaryText: 'Edit Profile' }, { primaryText: 'Share profile' }];
export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid col-span-1 tablet:col-span-3">
        <div className="grid gap-3 grid-cols-1 desktop:grid-cols-3">
          <div className="col-span-1 desktop:col-span-2 order-2 desktop:order-1">
            <div className="!px-3 mr-2 z-0 grid grid-cols-6 gap-2">
              <Skeleton
                classes="w-full h-[50px] mb-2"
                parentClass="col-span-6"
                radius="full"
                row={{ base: 6, md: 7 }}
              />
              <Skeleton classes="w-full" parentClass="col-span-6" row={{ base: 6, md: 7 }} />
            </div>
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
      </div>
      <div className="grid grid-cols-1 desktop:grid-cols-3 gap-3">
        <div className="col-span-1 desktop:col-span-2">
          <div className="flex flex-col gap-3">
            {Array.from({ length: 3 }, (_, storyIndex) => (
              <div className="relative" key={storyIndex}>
                <div className="relative justify-between rounded-lg w-full h-fit">
                  <Skeleton classes="w-full h-[400px] rounded-lg" />
                </div>
                <div className="absolute top-0 w-full p-4 text-white flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Skeleton classes="w-[40px] h-[40px]" radius="full" />
                    <Skeleton classes="text-white text-sm w-[50px]" />
                  </div>
                  <Button>
                    <MdOutlineMoreHoriz className="text-3xl" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-1 h-fit rounded-md desktop:flex hidden">
          <Box classes="relative px-6 gap-2 py-8 rounded-md w-full">
            <div className="absolute top-[-45px]">
              <Skeleton classes="p-0.5 w-[60px] h-[60px]" radius="full" />
            </div>
            <div className="my-3 flex flex-col gap-3 w-full">
              <Skeleton classes="text-white text-sm w-2/4" />
              <Skeleton classes="text-white text-sm w-full" column={2} />
            </div>
            <div className="flex flex-wrap justify-start gap-2 w-full">
              <Skeleton
                classes="bg-grayLight text-black px-3 py-3 rounded-lg w-full col-span-1"
                parentClass="grid grid-cols-3 col-span-3 w-full"
                row={3}
              />
            </div>
            <div className="flex flex-col gap-2 my-4 w-full">
              <p className="text-sm font-bold text-grayMiddle">Posts</p>
              <div className="grid grid-cols-12 gap-2 ">
                <Skeleton classes="rounded-lg w-full tablet:h-14 desktop:h-20" parentClass="col-span-4" column={5} />
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}
