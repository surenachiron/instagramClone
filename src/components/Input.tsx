'use client';

import { useEffect, useRef, useState } from 'react';
import type { InputHTMLAttributes, HTMLInputTypeAttribute } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute;
  name?: string;
  placeholder?: string;
  classes?: string;
  register?: UseFormRegister<any>;
  valueAsNumber?: boolean;
  onChange?: (e: any) => void;
}

const Input = ({ type, name, placeholder, classes, register, valueAsNumber, onChange, ...props }: InputProps) => {
  // all states for password input
  const [usableType, setUsableType] = useState<HTMLInputTypeAttribute>(type);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // use in password input for show outline for div that include the input and an icon
  const [showOutLine, setShowOutLine] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);

  function handleChangeVisibility() {
    setShowPassword((prev) => !prev);
    const realTimeShowPassword = !showPassword;
    if (realTimeShowPassword) setUsableType('text');
    else setUsableType('password');
  }

  function handleActiveOutline() {
    setShowOutLine(true);
  }

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (passwordRef.current && !passwordRef.current.contains(e.target)) {
        setShowOutLine(false);
      }
    };
    document.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      document.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);

  if (type === 'password') {
    return (
      <div
        className={`flex justify-around items-center bg-[#EFEFF0] rounded-xl w-full pr-3 ${showOutLine && 'border border-black'}`}
        ref={passwordRef}
      >
        <input
          type={usableType}
          placeholder={placeholder}
          className={`focus-visible:outline-none text-black rounded-xl ${classes}`}
          onClick={handleActiveOutline}
          {...(register && { ...register(name!, { valueAsNumber }) })}
          {...props}
        />
        <div onClick={handleChangeVisibility}>
          {showPassword ? (
            <MdVisibilityOff className="text-2xl cursor-pointer" />
          ) : (
            <MdVisibility className="text-2xl cursor-pointer" />
          )}
        </div>
      </div>
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`text-black rounded-xl ${classes}`}
      {...(register && { ...register(name!, { onChange: onChange, valueAsNumber }) })}
      {...props}
    />
  );
};

export default Input;
