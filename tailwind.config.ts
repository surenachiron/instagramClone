import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const rotateY = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180': {
      transform: 'rotateY(180deg)',
    },
  });
});

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '.5rem',
        sm: '.5rem',
        md: '1rem',
        lg: '2rem',
      },
    },
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        grayBack: '#EFEFF0',
        grayMiddle: '#999999',
        grayLight: '#e2e2e2',
        blue: '#3797EF',
      },
      screens: {
        mobile: '560px',
        tablet: '760px',
        desktop: '960px',
        wide: '1370px',
      },
    },
  },
  plugins: [require('daisyui'), rotateY],
  important: true,
};
export default config;
