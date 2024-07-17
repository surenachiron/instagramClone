'use client';

import { Fragment } from 'react';
import Link from 'next/link';

import Button from '@/components/Button';

export type ButtonsProfileProps = {
  primaryText?: string | number;
  secondaryText?: string | number;
  element?: React.ReactNode;
  link?: string;
  bgColor?: string;
  classes?: string;
  linkClasses?: string;
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
            classes={`col-span-1 ${button?.bgColor ? button.bgColor : 'bg-[#f1f1f1]'} text-black py-1 rounded-lg ${button.classes ? button.classes : 'w-full'}`}
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
          <Link
            key={button.secondaryText ? button.secondaryText : button.primaryText}
            href={button.link}
            className={button.linkClasses}
          >
            {buttonContent}
          </Link>
        ) : button.element ? (
          button.element
        ) : (
          <Fragment key={button.secondaryText ? button.secondaryText : button.primaryText}>{buttonContent}</Fragment>
        );
      })}
    </>
  );
};

export default UtilProfileBut;
