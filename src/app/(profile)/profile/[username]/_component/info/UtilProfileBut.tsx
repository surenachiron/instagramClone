'use client';

import Button from '@/components/Button';
import Link from 'next/link';

export type ButtonsProfileProps = {
  primaryText: string | number;
  secondaryText?: string | number;
  link?: string;
  bgColor?: string;
  classes?: string;
  colorText?: string;
  onClick?: () => void;
}[];

interface Props {
  buttons: ButtonsProfileProps;
}
const UtilProfileBut = ({ buttons }: Props) => {
  return (
    <>
      {buttons.map((button) => {
        const buttonContent = (
          <Button
            key={button.primaryText}
            classes={`col-span-1 ${button?.bgColor ? button.bgColor : 'bg-[#f1f1f1]'} text-black px-7 py-1 rounded-lg w-full ${button.classes}`}
            onClick={button.onClick}
          >
            {button.secondaryText ? (
              <div className="flex flex-col items-center justify-center">
                <h4 className="text-md font-bold">{button.primaryText}</h4>
                <p className="text-sm text-[#a1a1a1]">{button.secondaryText}</p>
              </div>
            ) : (
              <p className={`text-sm ${button?.colorText ? button.colorText : 'text-[#a1a1a1] py-1'}`}>
                {button.primaryText}
              </p>
            )}
          </Button>
        );

        return button.link ? (
          <Link key={button.primaryText} href={button.link}>
            {buttonContent}
          </Link>
        ) : (
          buttonContent
        );
      })}
    </>
  );
};

export default UtilProfileBut;
