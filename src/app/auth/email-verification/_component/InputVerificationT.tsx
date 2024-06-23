'use client';

import React, { useRef } from 'react';

interface InputVerificationProps {
  numberOfInputs: number;
}

const InputVerificationT: React.FC<InputVerificationProps> = ({ numberOfInputs }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(numberOfInputs).fill(null));

  const handleSelectAll = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  const increaseInput = (inputId: number) => {
    if (inputId < numberOfInputs) {
      inputRefs.current[inputId]?.focus();
    }
  };

  const reduceInput = (inputId: number) => {
    if (inputId > 1) {
      inputRefs.current[inputId - 2]?.focus();
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueLength = e.target.value.length;
    const inputId = +e.target.id;
    if (valueLength === 1 && inputId < numberOfInputs) increaseInput(inputId);
    if (valueLength === 0 && inputId > 1) reduceInput(inputId);
    if (valueLength > 1) e.target.value = e.target.value.slice(valueLength - 1);
  };

  const handleMoveArrow = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const valueLength = e.currentTarget.value.length;
    const valueInput = e.currentTarget.value;
    const inputId = +e.currentTarget.id;
    if (e.key === 'ArrowRight' || e.key === valueInput) increaseInput(inputId);
    if (e.key === 'ArrowLeft' || (valueLength === 0 && e.key === 'Backspace')) reduceInput(inputId);
  };

  return (
    <div className="flex justify-start items-center h-full w-full gap-2">
      {Array.from({ length: numberOfInputs }, (_, index) => (
        <div className="w-[45px] tablet:w-[58px] h-[45px] tablet:h-[58px]" key={index}>
          <input
            type="number"
            name={`input${index + 1}`}
            id={(index + 1).toString()}
            className="h-full w-full rounded-md focus-visible:outline outline-2 outline-blue text-black text-center text-base font-bold border border-grayLight"
            onChange={(e) => handleChangeValue(e)}
            onKeyUp={(e) => handleMoveArrow(e)}
            onFocus={(e) => handleSelectAll(e)}
            ref={(el) => (inputRefs.current[index] = el)}
            required
          />
        </div>
      ))}
    </div>
  );
};

export default InputVerificationT;
