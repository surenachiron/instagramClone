'use client';

type Props = {
  children: React.ReactNode;
  classes?: string;
  childClasses?: string;
};

const GradientContainer = ({ children, classes, childClasses }: Props) => {
  return (
    <div className={`bg-gradient-to-r from-[#fbaa47] via-[#D91A46] to-[#A60F93] p-0.5 rounded-full ${classes}`}>
      <div className={`bg-white p-0.5 rounded-full ${childClasses}`}>{children}</div>
    </div>
  );
};

export default GradientContainer;
