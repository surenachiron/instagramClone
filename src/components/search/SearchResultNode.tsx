import Link from 'next/link';
import Image from 'next/image';

import { MdPersonSearch } from 'react-icons/md';

import { resultType } from './SearchBox';

export const SearchResultNode = ({ result, classes }: { result: resultType; classes?: string }) => {
  return (
    <div className={`w-full h-[240px] border rounded-lg  bg-white transition-all fade-in ${classes}`}>
      {result?.length !== 0 ? (
        typeof result === 'string' ? (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <p className="text-sm text-bold text-black">{result}</p>
          </div>
        ) : (
          <div className="flex flex-col justify-start w-full h-full gap-y-2 overflow-auto overflow-width-scroll">
            {result?.map((user) => (
              <Link
                href={`/profile/${user.user_name}`}
                key={user.user_id}
                className="flex gap-x-2 items-center w-fit group"
              >
                <Image
                  src={user.avatar_url ? user.avatar_url : '/anonymous.png'}
                  alt={`avatar of ${user.user_name}`}
                  width={100}
                  height={100}
                  className="w-[35px] h-[35px] rounded-full border border-grayMiddle"
                />
                <div className="flex flex-col justify-center">
                  <p className="text-black text-sm">{user.user_name}</p>
                  <span className="text-sm">{user.full_name}</span>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center">
          <MdPersonSearch className="text-lg text-black" />
          <p className="text-xl text-bold text-black">No searches just yet</p>
          <p className="text-sm">Search for your favorite user</p>
        </div>
      )}
    </div>
  );
};
