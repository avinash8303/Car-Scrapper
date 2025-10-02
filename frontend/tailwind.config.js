/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-blue': '#1A2E40',
        'steel-gray': '#4B5563',
        'vibrant-orange': '#F97316',
        'lime-green': '#10B981',
        'off-white': '#F9FAFB',
        'light-gray': '#E5E7EB',
        'charcoal-black': '#111827',
        'slate-gray': '#6B7280',
      },
    },
  },
  plugins: [],
};