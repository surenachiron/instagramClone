import { ModalRoute } from '../../[post]/ModalRoute';
import Skeleton from '@/components/Skeleton';

const LoadingCommentsIntersectionPage = () => {
  return (
    <ModalRoute>
      <div className="flex flex-col justify-between w-full bg-white text-black overflow-auto overflow-width-scroll desktop:w-1/2 border-0 h-[100vh] desktop:h-[80vh] px-3 pb-12 tablet:pb-0">
        <div className="flex items-center gap-x-2 mb-4 mt-3">
          <Skeleton classes="w-[25px] h-[25px]" radius="full" />
          <div className="flex flex-col gap-y-2 w-full">
            <Skeleton classes="py-0.5 w-[60px]" radius="full" />
            <Skeleton classes="py-0.5 w-[120px]" radius="full" />
          </div>
        </div>
        <hr />
        <div className="h-full mt-3">
          {Array.from({ length: 9 }, (_, colIndex) => (
            <div className="flex items-center gap-x-2 mb-4" key={colIndex}>
              <Skeleton classes="w-[25px] h-[25px]" radius="full" />
              <div className="flex flex-col gap-y-2 w-full">
                <Skeleton classes="py-0.5 w-[60px]" radius="full" />
                <Skeleton classes="py-0.5 w-[120px]" radius="full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalRoute>
  );
};

export default LoadingCommentsIntersectionPage;
