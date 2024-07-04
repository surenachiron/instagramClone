'use client';

import Link from 'next/link';
import { PagesDetail } from './PagesList';
import { usePathname } from 'next/navigation';
import { useUtilStore } from '@/store/util';
import NewPost from '@/app/profile/newPost/post/NewPost';
import { IoMdAddCircleOutline } from 'react-icons/io';

const NavigateMobile = () => {
  const { username } = useUtilStore();
  const pathname = usePathname();

  return (
    <div className="desktop:hidden flex justify-center fixed z-30 inset-x-5 bottom-1">
      <div className="bg-white flex justify-around items-center gap-x-8 p-2 rounded-xl w-full tablet:w-[65%] shadow-lg">
        {username.length > 1 &&
          PagesDetail.map((page, index) => (
            <>
              {index === 2 && (
                <div className={`flex items-start justify-start gap-x-2 h text-grayMiddle`}>
                  <NewPost icon={<IoMdAddCircleOutline className="text-2xl" />} />
                </div>
              )}
              <Link href={page.link === '/profile/' ? `/profile/${username}` : page.link} key={page.link}>
                <div
                  className={`flex items-start justify-start gap-x-2 ${pathname === page.link + username || pathname === page.link ? 'text-black' : 'text-grayMiddle'}`}
                >
                  {page.icon}
                </div>
              </Link>
            </>
          ))}
      </div>
    </div>
  );
};

export default NavigateMobile;
