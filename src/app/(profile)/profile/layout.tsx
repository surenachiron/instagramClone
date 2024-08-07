import { Metadata } from 'next';

import BackPage from '@/components/BackPage';
import UtileSide from '@/app/(home)/_component/utileSide';
import NavigateMobile from '@/app/(home)/_component/utileSide/NavigateMobile';
import LogOutBut from '@/components/LogOutBut';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'a clone of Instagram',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-3 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 container py-5">
      <UtileSide />
      <div className="col-span-1 tablet:col-span-3">
        <div className="bg-grayBack">
          <div className="text-start">
            <div className="flex justify-between items-center">
              <BackPage className="bg-white" />
              <LogOutBut />
            </div>
          </div>
          {children}
        </div>
        <NavigateMobile />
      </div>
    </div>
  );
}
