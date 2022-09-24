// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./views/index.ejs"
  ],
  theme: {
    screens: {
      //sm: '480px',
      //md: '768px',
      //lg: '976px',
      //xl: '1440px'
    },
    extend: {
      colors: {
        primary: 'hsl(100%, 0%, 50%)'
        // secondary: bleh
      }
    },
  },
  plugins: [],
}