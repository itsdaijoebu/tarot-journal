// /** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/js/*.js"
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
        // primary: "hsl(235, 58%, 56%)",
        // accent: "hsl(235, 43%, 60%)",
        // offwhite: "hsl(56, 91%, 94%)",
        // offwhite: "hsl(51, 100%, 98%)"
        // offwhite: "#F7F9F9",
        // offwhite: '#DCDCDD'
      },
      fontFamily: {
        'sans': ['Atkinson Hyperlegible', 'sans-serif']
      },
      flexGrow: {
        '2': 2,
      },
      flex: {
        '1-auto': '1 1 auto',
        '2-auto': '2 2 auto'
      }
    },
  },
  daisyui: {
    themes: [
      {
        dark: {
          // primary: "#390099", //purple
          // primary: "hsl(235, 58%, 56%)",
          // primary: "hsl(216, 24%, 8%)",  //dark dark dark blue
          primary: "hsl(214, 46%, 14%)",
          // 'primary-content': "#F7F9F9", //offwhite
          'primary-content': "hsl(39, 77%, 77%)",
          'primary-focus': 'hsl(39, 77%, 50%)',
          secondary: "#F000B8",
          // accent: "hsl(235, 43%, 60%)",//purple
          accent: "hsl(39, 77%, 77%)",
          'accent-focus': "hsl(39, 77%, 50%)",
          'accent-content': "hsl(39, 77%, 10%)",
          neutral: "#3D4451",
          "base-100": "hsl(216, 24%, 8%)",
          "base-200": "hsl(216, 24%, 1%)",
          // "base-100": "hsl(214, 46%, 14%)",
          // "base-200": "hsl(214, 46%, 5%)",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      'synthwave', 'cupcake'
    ],
  },
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
};
