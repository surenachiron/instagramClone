'use client';

import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PagesDetail } from './PagesList';
import { useUtilStore } from '@/store/util';
import NewPost from '@/app/(profile)/profile/newPost/post/NewPost';
import { IoMdAddCircleOutline } from 'react-icons/io';

const NavigateMobile = () => {
  const { username } = useUtilStore();
  const pathname = usePathname();
  const [avatar, setAvatar] = useState<string | null>();

  useEffect(() => {
    setAvatar(localStorage.getItem('avatar'));
  }, []);

  return (
    <div className="desktop:hidden flex justify-center fixed z-30 inset-x-5 bottom-1">
      <div className="bg-white flex justify-around items-center gap-x-8 p-2 rounded-xl w-full tablet:w-[65%] shadow-lg">
        {username.length > 1 &&
          PagesDetail.map((page, index) => (
            <Fragment key={page.link}>
              {index === 2 && (
                <div className={`flex items-start justify-start gap-x-2 h text-grayMiddle`}>
                  <NewPost icon={<IoMdAddCircleOutline className="text-2xl" />} />
                </div>
              )}
              {page.link === '/profile/' ? (
                <Link href={`/profile/${username}`} key={page.link}>
                  <div
                    className={`flex items-start justify-start gap-x-2 ${pathname === page.link + username || pathname === page.link ? 'border border-black rounded-full' : 'text-grayMiddle'}`}
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
                      className="w-[30px] h-[30px] rounded-full"
                    />
                  </div>
                </Link>
              ) : (
                <Link href={page.link} key={page.link}>
                  <div
                    className={`flex items-start justify-start gap-x-2 ${pathname === page.link + username || pathname === page.link ? 'text-black' : 'text-grayMiddle'}`}
                  >
                    {page.icon}
                  </div>
                </Link>
              )}
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default NavigateMobile;
