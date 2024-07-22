import Skeleton from '@/components/Skeleton';
import StoryDetail from './_component/StoryDetail';

const LoadingStory = () => {
  return (
    <div className="bg-[#1a1a1a] fixed inset-0 opacity-100 z-40 p-2">
      <StoryDetail />
      <div className="hidden tablet:flex gap-x-2 mt-2 h-full w-full justify-center">
        {Array.from({ length: 3 }, (_, storyIndex) => (
          <div className="relative w-[400px] h-[90%]" key={storyIndex}>
            <div className="relative justify-between rounded-lg w-full h-full">
              <Skeleton classes="w-full h-full rounded-lg" parentClass="h-full" />
            </div>
            <div className="absolute top-0 w-full py-4 px-2 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Skeleton classes="w-[40px] h-[40px]" radius="full" />
                <Skeleton classes="text-white text-sm w-[50px]" />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex tablet:hidden h-full w-full">
        <div className="relative w-full h-full">
          <div className="relative justify-between rounded-lg w-full h-full">
            <Skeleton classes="w-full h-full rounded-lg" parentClass="h-full" />
          </div>
          <div className="absolute top-0 w-full py-4 px-2 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Skeleton classes="w-[40px] h-[40px]" radius="full" />
              <Skeleton classes="text-white text-sm w-[50px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingStory;
