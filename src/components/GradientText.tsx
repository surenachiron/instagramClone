'use client';

type Props = {
  Wrapper: React.ElementType;
  text: string;
  classes?: string;
};

const GradientText = ({ Wrapper, text, classes }: Props) => {
  return (
    <Wrapper
      className={`text-transparent bg-gradient-to-r from-[#fbaa47] via-[#D91A46] to-[#A60F93] bg-clip-text ${classes}`}
    >
      {text}
    </Wrapper>
  );
};

export default GradientText;
