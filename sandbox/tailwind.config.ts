import type { Config } from 'tailwindcss';

export default {
  content: ['./**/*.{html,ts,tsx}'],
  theme: {
    extend: { fontFamily: { sans: ['Inter var'] } },
  },
  plugins: [],
} satisfies Config;
