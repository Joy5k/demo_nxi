import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class', // This is the key line!
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
export default config