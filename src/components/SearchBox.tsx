'use client';

import { IoIosSearch } from 'react-icons/io';
import { useUtilAction, useUtilStore } from '@/store/util';

type Props = { bg: 'Back' | 'Middle' | 'Light'; paddingH: number };

const SearchBox = ({ bg, paddingH }: Props) => {
  const { changeTextSearch } = useUtilAction();
  const { textSearch } = useUtilStore();

  return (
    <div
      className={`flex gap-1 w-full h-full rounded-2xl items-center bg-gray${bg} text-grayMiddle px-2`}
      style={{ padding: `${paddingH}px 0` }}
    >
      <IoIosSearch className="cursor-pointer text-2xl text-grayMiddle" />
      <input
        className="w-full h-full bg-transparent outline-none border-none font-roboto font-regular grayMiddle"
        type="text"
        placeholder="Search"
        onChange={(e) => changeTextSearch(e.target.value)}
        value={textSearch}
      />
    </div>
  );
};

export default SearchBox;
