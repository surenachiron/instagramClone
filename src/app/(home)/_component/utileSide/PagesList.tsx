'use client';

import { useEffect, useState, Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { GoHomeFill } from 'react-icons/go';
import { IoPersonCircle } from 'react-icons/io5';
import { MdOutlineExplore } from 'react-icons/md';
import { RiMovie2Line } from 'react-icons/ri';

import { useUtilStore } from '@/store/util';

export const PagesDetail: { name: string; link: string; icon: React.ReactNode }[] = [
  { name: 'Home', link: '/', icon: <GoHomeFill className="text-3xl tablet:text-2xl" /> },
  { name: 'Explore', link: '/explore', icon: <MdOutlineExplore className="text-3xl tablet:text-2xl" /> },
  { name: 'Reels', link: '/reels', icon: <RiMovie2Line className="text-3xl tablet:text-2xl" /> },
  { name: 'Profile', link: '/profile/', icon: <IoPersonCircle className="text-3xl tablet:text-2xl" /> },
];

const PagesList = () => {
  const { username } = useUtilStore();
  const pathname = usePathname();
  const [avatar, setAvatar] = useState<string | null>();

  useEffect(() => {
    setAvatar(localStorage.getItem('avatar'));
  }, []);

  return (
    <div className="flex flex-col items-start gap-3 w-full">
      {username.length > 1 &&
        PagesDetail.map((page) => (
          <Fragment key={page.link}>
            {page.link === '/profile/' ? (
              <Link href={`/profile/${username}`}>
                <div
                  className={`flex items-start justify-start gap-x-2 ${pathname === page.link + username || pathname === page.link ? 'text-black' : 'text-grayMiddle'}`}
                >
                  <Image
                    src={
                      avatar
                        ? `https://rawrrhqbuqlxiqvuhbmc.supabase.co/storage/v1/object/public/avatars/${avatar}`
                        : '/anonymous.png'
                    }
                    alt="profile avatar"
                    width={150}
                    height={150}
                    className="w-[25px] h-[25px] rounded-full"
                  />
                  <h3 className="font-regular">{page.name}</h3>
                </div>
              </Link>
            ) : (
              <Link href={page.link}>
                <div
                  className={`flex items-start justify-start gap-x-2 ${pathname === page.link + username || pathname === page.link ? 'text-black' : 'text-grayMiddle'}`}
                >
                  {page.icon}
                  <h3 className="font-regular">{page.name}</h3>
                </div>
              </Link>
            )}
          </Fragment>
        ))}
    </div>
  );
};

export default PagesList;
