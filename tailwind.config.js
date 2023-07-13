/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        thm: {
          DEFAULT: "#151c2b",
          50: "#ececec",
          100: "#96A5C8",
          200: "#7B8EBA",
          300: "#6077AC",
          400: "#4E6395",
          500: "#40527A",
          600: "#324060",
          700: "#212c42",
          800: "#151c2b",
          900: "#030305",
          950: "#000000",
        },
        green: {
          DEFAULT: "#A3EA2A",
          50: "#EBFAD1",
          100: "#E3F9BF",
          200: "#D3F599",
          300: "#C3F174",
          400: "#B3EE4F",
          500: "#A3EA2A",
          600: "#85C814",
          700: "#63950F",
          800: "#41620A",
          900: "#1F2F05",
          950: "#0E1502",
        },
        gray: {
          500: "#646464",
          700: "#212529",
          900: "#121212",
        },
        blue: {
          500: "#007bff",
        },
      },
    },
  },
  plugins: [],
};
