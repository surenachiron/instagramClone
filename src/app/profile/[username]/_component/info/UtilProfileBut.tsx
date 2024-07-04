'use client';

import Button from '@/components/Button';

export type ButtonsProfileProps = {
  primaryText: string;
  secondaryText?: string;
  bgColor?: string;
  colorText?: string;
  onClick?: () => void;
}[];

interface Props {
  buttons: ButtonsProfileProps;
}
const UtilProfileBut = ({ buttons }: Props) => {
  return (
    <>
      {buttons.map((buttons) => (
        <Button
          key={buttons.primaryText}
          classes={`col-span-1 ${buttons?.bgColor ? buttons.bgColor : 'bg-[#f1f1f1]'} text-black px-7 py-1 rounded-lg w-full`}
          onClick={buttons.onClick}
        >
          {buttons.secondaryText ? (
            <div className="flex flex-col items-center justify-center">
              <h4 className="text-md font-bold">{buttons.primaryText}</h4>
              <p className="text-sm text-[#a1a1a1]">{buttons.secondaryText}</p>
            </div>
          ) : (
            <p className={`text-sm ${buttons?.colorText ? buttons.colorText : 'text-[#a1a1a1] py-1'}`}>
              {buttons.primaryText}
            </p>
          )}
        </Button>
      ))}
    </>
  );
};

export default UtilProfileBut;
