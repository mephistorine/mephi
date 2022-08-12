/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      mono: [ "\"Cascadia Code\"", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "\"Liberation Mono\"", "\"Courier New\"", "monospace" ]
    }
  },
  plugins: []
};
