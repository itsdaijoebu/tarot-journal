// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./views/index.ejs"],
  theme: {
    screens: {
      //sm: '480px',
      //md: '768px',
      //lg: '976px',
      //xl: '1440px'
    },
    extend: {
      colors: {
        primary: "hsl(235, 58%, 56%)",
        offwhite: "hsl(56, 91%, 94%)"
        // secondary: bleh
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
