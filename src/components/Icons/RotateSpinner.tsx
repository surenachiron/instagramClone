export type SpinnerT = { w?: string; h?: string; color?: string };

export const RotateSpinner = ({ w = '30px', h = '30px', color = 'white' }: SpinnerT) => (
  <svg
    width={w}
    height={h}
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    xmlns="http://www.w3.org/2000/svg"
    className="spinner"
  >
    <circle
      cx="50"
      cy="50"
      r="32"
      strokeWidth="15"
      stroke={color}
      strokeDasharray="50.26548245743669 50.26548245743669"
      fill="none"
      strokeLinecap="round"
    >
      <animateTransform
        attributeName="transform"
        type="rotate"
        repeatCount="indefinite"
        dur="1s"
        values="0 50 50;360 50 50"
        keyTimes="0;1"
      />
    </circle>
  </svg>
);
