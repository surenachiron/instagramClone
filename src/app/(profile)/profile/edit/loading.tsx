import Box from '@/components/Box';
import Skeleton from '@/components/Skeleton';

const EditProfileLoading = () => {
  return (
    <Box classes="rounded-md w-full py-4 gap-2" backGround="bg-grayBack">
      <Box classes="p-3 desktop:p-6 justify-start w-full tablet:w-3/4 gap-y-6" align="items-start">
        <Skeleton column={1} parentClass="w-full" classes="w-1/5 py-2" />
        <Box classes="flex justify-between items-center w-full p-3" flexDirection="flex-row" backGround="bg-grayBack">
          <div className="flex items-center gap-x-3">
            <Skeleton classes="h-[65px] w-full" column={1} />
          </div>
        </Box>
        <div className="flex flex-col gap-y-6 w-full">
          <div>
            <Skeleton column={1} classes="w-1/5 py-2" />
            <Skeleton column={1} classes="w-full py-5 px-2 mt-4" />
          </div>
          <div>
            <Skeleton column={1} classes="w-1/5 py-2" />
            <Skeleton column={1} classes="w-full py-5 px-2 mt-4" />
          </div>
          <div>
            <Skeleton column={1} classes="w-1/5 py-2" />
            <Skeleton column={1} classes="w-full py-5 px-2 mt-4" />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default EditProfileLoading;
