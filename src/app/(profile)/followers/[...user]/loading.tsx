import Box from '@/components/Box';
import Skeleton from '@/components/Skeleton';

const FollowersLoading = () => {
  return (
    <Box classes="rounded-md w-full min-h-[80vh] h-full pt-0 tablet:py-4 gap-2" backGround="bg-grayBack">
      <Box classes="p-3 desktop:p-6 justify-start w-full h-full tablet:h-fit tablet:w-3/4 gap-y-2" align="items-start">
        <div className="flex flex-col justify-between w-full">
          <div className="h-full mt-3">
            {Array.from({ length: 6 }, (_, colIndex) => (
              <div className="flex items-center gap-x-2 mb-4" key={colIndex}>
                <Skeleton classes="w-[50px] h-[50px]" radius="full" />
                <div className="flex flex-col gap-y-2 w-full">
                  <Skeleton classes="py-0.5 w-[60px]" radius="full" />
                  <Skeleton classes="py-0.5 w-[120px]" radius="full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default FollowersLoading;
