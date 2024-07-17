import { Metadata } from 'next';

import UtileSide from './_component/utileSide';
import NavigateMobile from './_component/utileSide/NavigateMobile';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Instagram Clone',
  authors: [{ name: 'mohammad' }, { name: 'mohammad', url: 'https://github.com/surenachiron' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-3 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 container py-5">
      <UtileSide />
      <div className="col-span-1 tablet:col-span-3">
        <div className="bg-grayBack">
          <div className="text-grayMiddle">{children}</div>
        </div>
        <NavigateMobile />
      </div>
    </div>
  );
}
