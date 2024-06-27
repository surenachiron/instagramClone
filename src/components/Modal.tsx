'use client';

import { forwardRef } from 'react';
import Button from './Button';

type Props = {
  onOpen: () => void;
  onClose?: () => void;
  icon?: React.ReactElement | string;
  iconStyle?: string;
  parentIconStyle?: string;
  title: string;
  children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, Props>(
  ({ onOpen, onClose, icon, iconStyle = 'rounded-full bg-blue p-[.3rem]', parentIconStyle, title, children }, ref) => {
    // for forwardRef
    Modal.displayName = title;

    return (
      <div className="z-50">
        <Button classes={`${parentIconStyle}`} onClick={onOpen}>
          <div className={`${iconStyle}`}>{icon}</div>
        </Button>
        <dialog id="my_modal_3" className="modal" ref={ref}>
          <div className="modal-box bg-white cursor-auto">
            <form method="dialog" onClick={onClose}>
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-lg text-center w-full">{title}</h3>
            <hr />
            {children}
          </div>
        </dialog>
      </div>
    );
  }
);

export default Modal;
