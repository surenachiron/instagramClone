'use client';

import Link from 'next/link';
import { PagesDetail } from './PagesList';
import { usePathname } from 'next/navigation';

const NavigateMobile = () => {
  const pathname = usePathname();

  return (
    <div className="desktop:hidden flex fixed z-30 inset-x-0 bottom-2 text-center justify-center">
      <div className="backdrop-blur-3xl bg-[#ffffffc2] flex gap-x-8 p-2 rounded-xl">
        {PagesDetail.map((page) => (
          <Link href={page.link} key={page.link}>
            <div
              className={`flex items-start justify-start gap-x-2 ${pathname === page.link ? 'text-black' : 'text-grayMiddle'}`}
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
