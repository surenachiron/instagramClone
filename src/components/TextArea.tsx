'use client';

import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  max?: string;
  valueDefault?: string;
  register?: UseFormRegister<any>;
  error?: string | undefined;
  labelContent?: string;
  labelClasses?: string;
}

const TextArea = ({ register, error, name, valueDefault, max, labelContent, labelClasses, ...props }: Props) => {
  const [bioLength, setBioLength] = useState(valueDefault?.length);

  return (
    <div className="w-full">
      {labelContent && <label className={labelClasses}>{labelContent}</label>}
      <div className="mt-2 relative">
        <textarea
          spellCheck={false}
          className={`w-full pl-2 pr-14 py-1 bg-white border font-light border-grayBack rounded-xl resize-none text-black ${max && bioLength! > +max && 'border-red-600 outline-none'}`}
          {...(register && { ...register(name!, { onChange: (e) => setBioLength(e.target.value.length) }) })}
          {...props}
        />
        {max && (
          <span className={`absolute bottom-2 right-5 ${bioLength! > +max && 'text-red-600'}`}>
            {bioLength ? bioLength : 0} / {max}
          </span>
        )}
      </div>
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default TextArea;
