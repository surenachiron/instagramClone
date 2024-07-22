'use client';

type Props = {
  count: number;
  activeIndex: number;
  progress: number | null;
  nested?: boolean;
};

const StoryProgress = ({ count, activeIndex, progress }: Props) => {
  return (
    <div className="w-full flex justify-center absolute mt-2">
      <div className="w-[95%] flex gap-x-2 relative">
        {Array.from({ length: count }, (_, storyIndex) => (
          <div className="bg-grayMiddle h-[5px] w-full rounded-xl" key={storyIndex}>
            <div
              className={`progress-bar ${
                activeIndex === storyIndex ? 'active' : storyIndex < activeIndex ? 'w-full' : 'w-0'
              }`}
              style={{
                width:
                  activeIndex === storyIndex
                    ? `${typeof progress === 'number' ? (1 - progress) * 100 : 0}%`
                    : count === 1
                      ? '100%'
                      : '',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryProgress;
