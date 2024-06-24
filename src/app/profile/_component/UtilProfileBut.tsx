'use client';

import Button from '@/components/Button';

type Props = {
  primaryText: string;
  secondaryText?: string;
  bgColor?: string;
  colorText?: string;
  onClick?: () => void;
}[];

const UtilProfileBut = () => {
  const utilButton: Props = [
    { primaryText: '0', secondaryText: 'Posts' },
    { primaryText: '0', secondaryText: 'Followers' },
    { primaryText: '0', secondaryText: 'Following' },
    {
      primaryText: 'Edit profile',
      onClick: () => {
        console.log('profile Edited.');
      },
    },
  ];

  return (
    <>
      {utilButton.map((but) => (
        <Button
          key={but.primaryText}
          classes={`col-span-1 ${but?.bgColor ? but.bgColor : 'bg-[#f1f1f1]'} text-black px-7 py-1 rounded-lg w-full`}
          onClick={but.onClick}
        >
          {but.secondaryText ? (
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-md font-bold">{but.primaryText}</h4>
              <p className="text-sm text-[#a1a1a1]">{but.secondaryText}</p>
            </div>
          ) : (
            <p className={`text-sm ${but?.colorText ? but.colorText : 'text-[#a1a1a1] py-1'}`}>{but.primaryText}</p>
          )}
        </Button>
      ))}
    </>
  );
};

export default UtilProfileBut;
