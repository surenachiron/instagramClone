'use client';

import { forwardRef } from 'react';

import { BsArrowLeft } from 'react-icons/bs';

import Button from './Button';

type Props = {
  onOpen: () => void;
  onClose?: () => void;
  icon?: React.ReactElement | string;
  iconStyle?: string;
  parentIconStyle?: string;
  title?: string;
  showClose?: boolean;
  showBackButton?: boolean;
  onClickBackButton?: () => void;
  divideClose?: boolean;
  dialogContentClasses?: string;
  modalClass?: string;
  children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, Props>(
  (
    {
      onOpen,
      onClose,
      icon,
      iconStyle = 'rounded-full bg-blue p-[.3rem]',
      parentIconStyle,
      title,
      showClose = true,
      showBackButton,
      onClickBackButton,
      children,
      divideClose = false,
      dialogContentClasses,
      modalClass,
    },
    ref
  ) => {
    Modal.displayName = title;

    return (
      <div>
        <Button classes={`${parentIconStyle}`} onClick={onOpen}>
          <div className={`${iconStyle}`}>{icon}</div>
        </Button>
        <dialog className={`modal z-[1000] ${modalClass}`} ref={ref}>
          <div className="fixed inset-0 bg-black opacity-40" onClick={onClose}></div>
          {showClose && divideClose && (
            <form method="dialog" onClick={onClose} className="absolute right-7 top-3">
              <button className="btn btn-sm btn-circle btn-ghost bg-white">✕</button>
            </form>
          )}
          <div className={`modal-box bg-white cursor-auto ${dialogContentClasses}`}>
            {showClose && !divideClose && (
              <form method="dialog" onClick={onClose}>
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
              </form>
            )}
            <h3 className="font-bold text-lg text-center w-full">{title}</h3>
            {showBackButton && (
              <button className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2" onClick={onClickBackButton}>
                <BsArrowLeft className="text-lg text-white mix-blend-difference" />
              </button>
            )}
            {title && <hr />}
            {children}
          </div>
        </dialog>
      </div>
    );
  }
);

export default Modal;
