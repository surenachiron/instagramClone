'use client';

import Link from 'next/link';
import { PagesDetail } from './PagesList';
import { usePathname } from 'next/navigation';
import { useUtilStore } from '@/store/util';

const NavigateMobile = () => {
  const { username } = useUtilStore();
  const pathname = usePathname();

  return (
    <div className="desktop:hidden flex justify-center fixed z-30 inset-x-5 bottom-1">
      <div className="bg-white flex justify-around gap-x-8 p-2 rounded-xl w-full tablet:w-[65%] shadow-lg">
        {username.length > 1 &&
          PagesDetail.map((page) => (
            <Link href={page.link === '/profile/' ? `/profile/${username}` : page.link} key={page.link}>
              <div
                className={`flex items-start justify-start gap-x-2 h ${pathname === page.link + username ? 'text-black' : 'text-grayMiddle'}`}
              >
                {page.icon}
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default NavigateMobile;
