module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: { md: { max: "1050px" }, sm: { max: "550px" } },
    extend: {
      colors: {
        gray_600: "#6c757d",
        gray_900: "#28282a",
        red_300: "#f76c6c",
        gray_300: "#dddddd",
        gray_50: "#fff9fc",
        orange_200: "#ffc071",
        gray_300_01: "#e9ddd0",
        black_900_dd: "#000000dd",
        black_900: "#000000",
        red_300_4c: "#f76c6c4c",
        indigo_800_cc: "#374785cc",
        white_A700: "#ffffff",
        indigo_600: "#233ec9",
      },
      fontFamily: {
        poppins: "Poppins",
        roboto: "Roboto",
        worksans: "Work Sans",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
