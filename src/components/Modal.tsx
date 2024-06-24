'use client';

import { forwardRef } from 'react';
import Button from './Button';

type Props = {
  onOpen: () => void;
  icon: React.ReactElement;
  iconStyle?: string;
  title: string;
  children: React.ReactNode;
};

const Modal = forwardRef<HTMLDialogElement, Props>(
  ({ onOpen, icon, iconStyle = 'bg-blue p-[.3rem]', title, children }, ref) => {
    // for forwardRef
    Modal.displayName = title;

    return (
      <div className="z-50">
        <Button classes="pt-2 pl-3 absolute right-0 bottom-0" onClick={onOpen}>
          <div className={`rounded-full ${iconStyle}`}>{icon}</div>
        </Button>
        <dialog id="my_modal_3" className="modal" ref={ref}>
          <div className="modal-box bg-white cursor-auto">
            <form method="dialog">
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
