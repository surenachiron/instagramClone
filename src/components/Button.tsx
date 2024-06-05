'use client';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  classes?: string;
}

const Button: React.FC<Props> = ({ classes, children, onClick, ...props }) => {
  return (
    <button {...props} className={`flex justify-center items-center font-regular ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
