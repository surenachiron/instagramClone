'use client';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  classes?: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({ classes, children, onClick }) => {
  return (
    <button className={`flex justify-center items-center font-regular ${classes}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
