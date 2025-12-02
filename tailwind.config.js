export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5faff',
          100: '#e6f0ff',
          200: '#cce0ff',
          300: '#99c2ff',
          400: '#66a3ff',
          500: '#3385ff',
          600: '#1a6fe6',
          700: '#1559b3',
          800: '#104380',
          900: '#0b2d4d',
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        findlylight: {
          "primary": "#3385ff",
          "secondary": "#7c3aed",
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#ffffff",
        },
      },
      {
        findlydark: {
          "primary": "#3385ff",
          "secondary": "#7c3aed",
          "accent": "#37cdbe",
          "neutral": "#191d24",
          "base-100": "#0a0b14",
          "base-content": "#ffffff",
        },
      },
    ],
  },
};