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
        offwhite: "hsl(56, 91%, 94%)",
        // secondary: bleh
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "hsl(235, 58%, 56%)",
          secondary: "#F000B8",
          accent: "#37CDBE",
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
