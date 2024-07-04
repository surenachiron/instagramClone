'use client';

import useMedia from '@/hooks/useMedia';

type ResponsiveNumber = number | { [key: string]: number };

type TProps = {
  parentClass?: string;
  classes?: string;
  row?: ResponsiveNumber;
  column?: ResponsiveNumber;
  radius?: string;
};

const Skeleton = ({ parentClass, classes = 'w-full', row = 1, column = 1, radius = 'md' }: TProps) => {
  const isMedium = useMedia('(min-width: 768px)');
  const breakpoint = isMedium ? 'md' : 'base';

  const getResponsiveValue = (prop: ResponsiveNumber): number => {
    if (typeof prop === 'number') {
      return prop;
    }
    return prop[breakpoint] || 1;
  };

  const rows = getResponsiveValue(row);
  const columns = getResponsiveValue(column);

  // if you pass <column> more than 1 then you create number(pass) column of rows(pass number)
  // but if you didn't pass it it's just a one column of rows(pass number)
  return (
    <>
      {Array.from({ length: columns }, (_, colIndex) => (
        <div className={`flex ${parentClass && parentClass} ${columns !== 1 && 'flex-col'} gap-3`} key={colIndex}>
          {Array.from({ length: rows }, (_, rowIndex) => (
            <div
              key={rowIndex}
              className={`bg-[#d4d4d4] shadow-lg animate-pulse h-2 rounded-${radius} ${classes && classes}`}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default Skeleton;
