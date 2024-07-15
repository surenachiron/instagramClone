import React from 'react';
import UtileSide from '../(home)/_component/utileSide';
import NavigateMobile from '../(home)/_component/utileSide/NavigateMobile';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid gap-3 grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-4 tablet:container py-0 tablet:py-5 bg-white">
      <UtileSide />
      <div className="col-span-1 tablet:col-span-3">
        <div className="bg-white h-full desktop:hidden flex justify-start min-h-[80vh] px-3">{children}</div>
        <NavigateMobile />
      </div>
    </div>
  );
};

export default layout;
