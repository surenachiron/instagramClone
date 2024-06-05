'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoHomeFill } from 'react-icons/go';
import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineExplore } from 'react-icons/md';
import { RiMovie2Line } from 'react-icons/ri';

export const PagesDetail: { name: string; link: string; icon: React.ReactNode }[] = [
  { name: 'Home', link: '/home', icon: <GoHomeFill className="text-3xl tablet:text-2xl" /> },
  { name: 'Explore', link: '/explore', icon: <MdOutlineExplore className="text-3xl tablet:text-2xl" /> },
  { name: 'Reels', link: '/reels', icon: <RiMovie2Line className="text-3xl tablet:text-2xl" /> },
  { name: 'Profile', link: '/profile', icon: <IoPersonCircle className="text-3xl tablet:text-2xl" /> },
];

const PagesList = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {PagesDetail.map((page) => (
        <Link href={page.link} key={page.link}>
          <div
            className={`flex items-start justify-start gap-x-2 ${pathname === page.link ? 'text-black' : 'text-grayMiddle'}`}
          >
            {page.icon}
            <h3 className="font-regular">{page.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PagesList;
