'use client';

import { useEffect, useState } from 'react';
import { RotateSpinner, SpinnerT } from './Icons/RotateSpinner';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  loading?: boolean;
  direction?: 'row' | 'empty';
  justify?: 'start' | 'center' | 'end';
  classes?: string;
  Spinner?: SpinnerT;
}

const Button: React.FC<Props> = ({
  classes,
  loading = false,
  direction = 'empty',
  justify = 'center',
  children,
  onClick,
  Spinner,
  ...props
}) => {
  const [output, setOutput] = useState<React.ReactElement>(<>{children}</>);

  useEffect(() => {
    if (loading) {
      if (direction === 'row') {
        setOutput(
          <div className="flex items-center gap-x-1">
            {children} <RotateSpinner {...Spinner} />
          </div>
        );
      } else setOutput(<RotateSpinner {...Spinner} />);
    } else setOutput(<>{children}</>);
  }, [loading, direction, children, Spinner]);

  return (
    <button {...props} className={`flex justify-${justify} items-center font-regular ${classes}`} onClick={onClick}>
      {output}
    </button>
  );
};

export default Button;
