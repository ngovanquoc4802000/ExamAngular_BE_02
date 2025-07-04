// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Đảm bảo đường dẫn này khớp với vị trí tệp HTML chính của bạn
    "./index.html",
    // Đường dẫn này sẽ quét tất cả các tệp JavaScript, TypeScript, JSX, TSX
    // trong thư mục `src` và các thư mục con của nó.
    // Điều này bao gồm `src/App.tsx`
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}