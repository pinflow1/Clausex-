/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: '#FEFFF9',
        surface: '#F6F5EC',
        ink: '#1A1A1A',
        inkSoft: '#7A7A72',
        line: '#E4E2D6',
        lime: '#BFE93F',
        red: '#E8483C',
        orange: '#F2894A',
        amber: '#F5B833',
      },
      fontFamily: {
        serif: ['Georgia', "'Times New Roman'", 'serif'],
      },
    },
  },
  plugins: [],
};
