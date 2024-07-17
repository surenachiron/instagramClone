'use client';

import { type ElementRef, MouseEvent, RefObject, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

import { CgClose } from 'react-icons/cg';

import Button from '@/components/Button';

export function ModalRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<'dialog'>>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  const handleBackdropClick = (
    event: MouseEvent<HTMLDivElement>,
    modalRef: RefObject<HTMLDialogElement>,
    closeModal: () => void
  ) => {
    if (modalRef.current && modalRef.current === event.target) {
      closeModal();
    }
  };

  return createPortal(
    <div className="modal-backdrop" onClick={(e) => handleBackdropClick(e, dialogRef, onDismiss)}>
      <dialog ref={dialogRef} className="modal text-white" onClose={onDismiss}>
        <Button
          onClick={onDismiss}
          classes="hidden desktop:block absolute right-[35px] top-[10px] p-1 rounded-full border bg-white"
        >
          <CgClose className="text-xl text-black" />
        </Button>
        {children}
      </dialog>
    </div>,
    document.getElementById('modal-root')!
  );
}
