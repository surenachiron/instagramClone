import Skeleton from '@/components/Skeleton';

const CommentsLoading = () => {
  return (
    <div className="flex flex-col justify-between w-full h-[85vh]">
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
  );
};

export default CommentsLoading;
