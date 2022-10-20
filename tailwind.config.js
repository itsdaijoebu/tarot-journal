// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs"],
  theme: {
    screens: {
      //sm: '480px',
      //md: '768px',
      //lg: '976px',
      //xl: '1440px'
    },
    extend: {
      colors: {
        // primary: "hsl(235, 58%, 56%)",
        // accent: "hsl(235, 43%, 60%)",
        // offwhite: "56, 91%, 94%",
        offwhite: "hsl(51, 100%, 98%)"
        // offwhite: "#F7F9F9",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "hsl(235, 58%, 56%)",
          secondary: "#F000B8",
          accent: "hsl(235, 43%, 60%)",
          neutral: "#3D4451",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
