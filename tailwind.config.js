/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'mobile': '720px',   // A partir de 720px
        'tablet': '1080px',  // A partir de 1080px
        'desktop': '1440px', // A partir de 1440px
        },
      colors: {
        // Paleta Green (Foundation)
        green: {
          50: '#E9F4EE',
          100: '#BADDC9',
          200: '#98CDAF',
          300: '#69B68B',
          400: '#4CA875',
          500: '#1F9252',
          600: '#1C854B',
          700: '#16683A',
          800: '#11502D',
          900: '#0D3D22',
        },
        // Paleta Purple
        purple: {
          50: '#F4EDF2',
          100: '#DCC8D7',
          200: '#CBAEC3',
          300: '#B389A8',
          400: '#A57297',
          500: '#8E4F7D',
          600: '#814872',
          700: '#653859',
          800: '#4E2B45',
          900: '#3C2135',
        },
        // Paleta Neutral (Grays de Figma)
        gray: {
          1: '#FFFFFF',
          2: '#FDFDFD',
          3: '#F1F2F2',
          4: '#E8EAEA',
          5: '#B8BEBD',
          6: '#969E9D',
          7: '#667270',
          8: '#495755',
          9: '#1B2D2A',
          10: '#192926',
          11: '#13201E',
          12: '#0F1917',
          13: '#0B1312',
        },
        // Paleta Red Alert
        redAlert: {
          50: '#FBE9EC',
          100: '#F3BCC3',
          200: '#ED9BA6',
          300: '#E46E7D',
          400: '#DF5164',
          500: '#D7263D',
          600: '#C42338',
          700: '#991B2B',
          800: '#761522',
          900: '#5A101A',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontSize: {
        'display': ['5rem', { lineHeight: '1.1', fontWeight: '900' }],
        'h1': ['4rem', { lineHeight: '1.15', fontWeight: '800' }],
        'h2': ['3rem', { lineHeight: '1.2', fontWeight: '800' }],
        'h3': ['2.5rem', { lineHeight: '1.25', fontWeight: '700' }],
        'h4': ['2rem', { lineHeight: '1.3', fontWeight: '700' }],
        'h5': ['1.5rem', { lineHeight: '1.35', fontWeight: '600' }],
        'h6': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-reg': ['1rem', { lineHeight: '1.5', fontWeight: '400' }],
        'body-bold': ['1rem', { lineHeight: '1.5', fontWeight: '600' }],
        'caption': ['.75rem', { lineHeight: '1.4', fontWeight: '400' }],
        'caption-bold': ['.75rem', { lineHeight: '1.4', fontWeight: '600' }],
        'footer': ['.625rem', { lineHeight: '1.4', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}