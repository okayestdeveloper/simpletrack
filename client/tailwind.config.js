module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  important: "#body",
  darkMode: false,
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    fontFamily: {
      display: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      body: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    },
    extend: {},
  },
  variants: {},
  plugins: [],
};
