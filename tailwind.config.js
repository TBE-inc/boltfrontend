/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'heading1': '700',
        'heading2': '600', 
        'heading3': '500',
        'body': '400',
        'caption': '300',
        'button': '500',
      },
      colors: {
        weedify: {
          accent: '#6B8F71',
          'bg-light': '#FFFDFA',
          'bg-dark': '#121212',
          'text-main': '#111111',
          'text-reverse': '#FFFFFF',
          'text-muted': '#6B7280',
          border: '#E2E8F0',
        },
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
      borderRadius: {
        'xs': '0.125rem',
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
      },
    },
  },
  plugins: [],
}