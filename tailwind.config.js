/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', md: '2rem' },
      screens: { '2xl': '1240px' },
    },
    extend: {
      colors: {
        // Navdo brendbuk: Samarqand ko'ki (asosiy), oltin (faqat belgi), to'q kulrang, oq
        brand: {
          50: '#EEF5FB',
          100: '#D7E7F4',
          200: '#AFCDE8',
          500: '#1170B8',
          600: '#0B5E9C',
          700: '#094C7F',
          800: '#073A61',
        },
        gold: '#D4A94F',
        ink: {
          DEFAULT: '#111827',
          700: '#1F2937',
          500: '#4B5563',
          400: '#6B7280',
          300: '#9CA3AF',
        },
        line: '#E5E7EB',
        paper: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.25rem, 4.1vw, 3.75rem)', { lineHeight: '1.06', letterSpacing: '-0.035em' }],
        h2: ['clamp(1.9rem, 3.6vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.03em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,24,39,.04), 0 8px 24px -12px rgba(17,24,39,.12)',
        float: '0 24px 60px -24px rgba(11,94,156,.35)',
      },
    },
  },
  plugins: [],
}
