import React, { ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  dropText: ReactNode;
  items: { element: ReactNode }[];
};

const DropDown = ({ dropText, items }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown dropdown-end" ref={dropdownRef}>
      <div tabIndex={0} role="button" className="m-1 text-black py-1 px-1 border-0" onClick={toggleDropdown}>
        {dropText}
      </div>
      {isOpen && (
        <ul tabIndex={0} className="dropdown-content menu bg-white text-black border rounded-lg z-[1] w-52 p-2 shadow">
          {items.map((item, index) => (
            <li key={index} className="w-full text-start mb-2">
              {item.element}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
