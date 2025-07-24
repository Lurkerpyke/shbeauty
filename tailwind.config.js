// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'media',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      cursor: {
        'arrow-right': 'url("/arrow-right.svg") 18 18, auto',
      },
      translate: {
        '101': '101%',
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)'],
        cormorantSC: ['var(--font-cormorant-sc)'],
        montserrat: ['var(--font-montserrat)'],
      },
      colors: {
        background: '#7A6047',
        foreground: '#ffffff',
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        marquee: {
          from: { transform: 'translateX(0%)' },
          to: { transform: 'translateX(-50%)' },
        },
        glitch: {
          "0%": { clipPath: "inset(20% 0 50% 0)" },
          "5%": { clipPath: "inset(10% 0 60% 0)" },
          "10%": { clipPath: "inset(15% 0 55% 0)" },
          "15%": { clipPath: "inset(25% 0 35% 0)" },
          "20%": { clipPath: "inset(30% 0 40% 0)" },
          "25%": { clipPath: "inset(40% 0 20% 0)" },
          "30%": { clipPath: "inset(10% 0 60% 0)" },
          "35%": { clipPath: "inset(15% 0 55% 0)" },
          "40%": { clipPath: "inset(25% 0 35% 0)" },
          "45%": { clipPath: "inset(30% 0 40% 0)" },
          "50%": { clipPath: "inset(20% 0 50% 0)" },
          "55%": { clipPath: "inset(10% 0 60% 0)" },
          "60%": { clipPath: "inset(15% 0 55% 0)" },
          "65%": { clipPath: "inset(25% 0 35% 0)" },
          "70%": { clipPath: "inset(30% 0 40% 0)" },
          "75%": { clipPath: "inset(40% 0 20% 0)" },
          "80%": { clipPath: "inset(20% 0 50% 0)" },
          "85%": { clipPath: "inset(10% 0 60% 0)" },
          "90%": { clipPath: "inset(15% 0 55% 0)" },
          "95%": { clipPath: "inset(25% 0 35% 0)" },
          "100%": { clipPath: "inset(30% 0 40% 0)" },
        },
      },
      animation: {
        "glitch-after": "glitch var(--after-duration) infinite linear alternate-reverse",
        "glitch-before": "glitch var(--before-duration) infinite linear alternate-reverse",
        shine: 'shine 5s linear infinite',
        marquee: 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [],
};
