import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9ecff',
          200: '#b6d9ff',
          300: '#86beff',
          400: '#529bff',
          500: '#2563eb',
          600: '#1e4fcc',
          700: '#1a3fa3',
          800: '#173783',
          900: '#142f6b'
        }
      },
      backgroundImage: {
        'grid': "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
      }
    },
  },
  plugins: [],
}
export default config
