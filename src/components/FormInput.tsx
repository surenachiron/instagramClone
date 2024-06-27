'use client';

import { FormInputProps } from '@/types/formTypes';
import Input from './Input';

const FormInput: React.FC<FormInputProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
  labelContent,
  labelClasses,
  classes = 'w-full py-3 px-2',
  parentClasses,
  ...props
}) => {
  return (
    <div className={`w-full h-full flex flex-col gap-1 ${parentClasses}`}>
      {labelContent && <label className={labelClasses}>{labelContent}</label>}
      <Input
        type={type!}
        name={name}
        placeholder={placeholder}
        register={register}
        valueAsNumber={valueAsNumber}
        classes={classes}
        {...props}
      />
      {error && <span className="text-red-600">{error}</span>}
    </div>
  );
};

export default FormInput;
