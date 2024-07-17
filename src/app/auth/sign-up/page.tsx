'use client';

import React from 'react';
import Image from 'next/image';

import SignUpForm from './_component/SignUpForm';

const SignUpPage = () => {
  return (
    <div className="w-full h-fit rounded-xl flex justify-center items-center gap-3 px-3 tablet:px-1 desktop:px-6 backdrop-blur-lg">
      <div className="w-full h-full rounded-xl bg-white flex justify-center items-center gap-3 px-2 py-4">
        <div className="w-full tablet:w-1/2 h-full py-1 flex justify-center">
          <SignUpForm />
        </div>
        <div className="tablet:w-1/2 hidden tablet:flex">
          <div className="w-full h-[83vh] relative">
            <Image src={'/loginPic.png'} alt="login picture" fill={true} className="object-fill" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
