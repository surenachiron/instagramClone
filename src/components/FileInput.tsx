'use client';

import React, { useRef } from 'react';

import { UseFormRegisterReturn } from 'react-hook-form';

import Button from './Button';

type Props = {
  classes: string;
  text: string | React.ReactNode;
  register?: UseFormRegisterReturn;
  accept: string;
  onChangeEvent: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
};

const FileInput = ({ classes, text, error, accept, onChangeEvent }: Props) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    hiddenInputRef.current?.click();
  };

  return (
    <>
      <Button type="button" classes={classes} onClick={handleClick}>
        {text}
      </Button>
      <input type="file" className="opacity-0 w-0 h-0" onChange={onChangeEvent} ref={hiddenInputRef} accept={accept} />
      {error && <span className="text-red-600">{error}</span>}
    </>
  );
};

export default FileInput;
