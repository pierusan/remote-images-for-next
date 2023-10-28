export default {
  plugins: {
    // https://tailwindcss.com/docs/using-with-preprocessors#nesting
    'tailwindcss/nesting': 'postcss-nesting',
    tailwindcss: { config: "./sandbox/tailwind.config" },
    autoprefixer: {},
    'postcss-preset-env': {
      features: { 'nesting-rules': false },
    },
  },
};
