'use client';

type Props = {
  children: React.ReactNode;
  classes?: string;
  backGround?: string;
  flexDirection?: string;
  align?: string;
};

const Box = ({
  classes,
  backGround = 'bg-white',
  flexDirection = 'flex-col',
  align = 'items-center',
  children,
}: Props) => {
  return <div className={`flex ${flexDirection} ${align} rounded-lg ${backGround} ${classes}`}>{children}</div>;
};

export default Box;
