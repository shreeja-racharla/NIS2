/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/globalcomponents/**/*.{js,ts,jsx,tsx,mdx}"  // Add this line
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        scrollbar: ['rounded'], // Optional: Adds rounded scrollbar support
        primary: '#007ACC',  // Main blue color
        secondary: '#4CAF50',  // Secondary green color
        danger: '#FF5722',  // Red-orange for danger
        'sidebar-bg': '#050038',  // Sidebar background color
        'heading-primary': '#050038',  // Dark heading color
        'heading-secondary': '#333333',  // Sub-heading color
        'tab-active': '#007ACC',  // Active tab background color
        'tab-hover': '#005A99',  // Hover color for active tabs
        'page-bg': '#F4F4F9',  // Light page background color
        'card-bg': '#F8F9FA',  // Card/accordion background
        'text-primary': '#333333',  // Primary text color
        'text-secondary': '#757575',  // Secondary text color
      },
      fontFamily: {
        heading: ['Lato', 'sans-serif'],  // Heading font
        body: ['Roboto', 'sans-serif'],   // Body font
      },
      boxShadow: {
        't-lg': '0 -4px 10px rgba(0, 0, 0, 0.1)', // Add custom top shadow
        'b-lg': '0 4px 10px rgba(0, 0, 0, 0.1)',  // Custom bottom shadow

      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Add the scrollbar plugin
  ],
};
