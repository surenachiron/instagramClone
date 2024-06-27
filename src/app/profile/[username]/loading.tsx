import Box from '@/components/Box';
import Skeleton from '@/components/Skeleton';
import Button from '@/components/Button';

const ProfileSkeleton = () => {
  return (
    <Box classes="rounded-md w-full relative py-4 gap-2" backGround="bg-grayBack">
      <Box
        classes="relative p-3 desktop:p-6 justify-start items-center w-full gap-4 gap-x-8"
        flexDirection="flex-col desktop:flex-row"
        align="items-center desktop:items-start"
      >
        <div className="absolute desktop:static top-[-30px]">
          <Skeleton classes="p-0.5 w-[80px] h-[80px]" radius="full" />
        </div>
        <div className="flex flex-col gap-4 w-3/4 desktop:w-1/3">
          <div className="text-center desktop:text-start mt-10 desktop:mt-0">
            <Skeleton classes="w-full mb-4 mt-3" column={1} row={1} />
            <Skeleton classes="w-full mt-2" column={3} />
          </div>
          <div className="grid grid-cols-3 justify-start gap-2">
            <Skeleton
              classes="bg-grayLight text-black px-3 py-4 rounded-lg w-full col-span-1"
              parentClass="grid grid-cols-3 col-span-3"
              row={3}
            />
          </div>
        </div>
      </Box>

      <div className="flex flex-col gap-2 my-4 w-full">
        <p className="text-sm font-bold text-grayMiddle">Highlights</p>
        <Skeleton classes="cursor-pointer w-[5.5rem] h-28 m-0" row={5} />
      </div>

      <div className="flex flex-col gap-2 my-4 w-full">
        <p className="text-sm font-bold text-grayMiddle">Posts</p>
        <div className="grid grid-cols-12 gap-2">
          <Skeleton classes="rounded-lg w-full h-32 desktop:h-56" parentClass="col-span-4" column={5} />
        </div>
        <div className="flex justify-center my-2">
          <Button classes="text-sm rounded-lg bg-grayLight w-fit px-2 py-1">Hide your posts</Button>
        </div>
      </div>
    </Box>
  );
};

export default ProfileSkeleton;
