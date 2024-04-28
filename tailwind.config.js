const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './stories/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
        comic: ['comic-sans-ms']
      },
      fontSize: {
        xl: '24px',
        lg: '20px',
        md: '16px',
        sm: '14px',
        xs: '12px',
        40: '40px',
        h1: '32px',
        h2: '24px',
        h3: '20px',
        b1: '16px',
        b2: '16px',
        b3: '14px',
      },
      backgroundImage: {
        'intro-bg': 'url(/images/svg/intro-bg.svg)',
        'tokenomics-bg': 'url(/images/svg/tokenomics-bg.svg)',
        'about-bg':'url(/images/svg/about-bg.svg)',
        'roadmap-bg':'url(/images/svg/roadmap-bg.svg)'
      },
      boxShadow: {
        'button': '0px -4px 0px 0px #F59F00 inset',
        'button-ghost': '0px -4px 0px 0px #603309 inset;',
        'button-light': ' 0px -4px 0px 0px #D3D3D3 inset;',
        'button-dark': '0px -4px 0px 0px #3F3F3F inset;'
      }
    },
  },
  darkMode: 'class',
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: '#C4F360',
          'co-gray': {
            1: '#333333',
            2: '#666666',
            3: '#999999',
            4: '#EDEDED',
            5: '#F9FAFB',
            6: '#FFFFFF',
            7: '#8A8A8A',
          },
          'co-purple': {
            1: '#4E46DC',
            2: '#716BE3',
            3: '#F0EDFD',
            4: '#F5F4FA',
            5: '#F5F4FA',
          },
          'co-green': '#01C521',
          'co-light-green': '#93E7A1',
          'co-alert': '#EC5C5C',
          'co-tag': {
            'bg-1': '#183E38',
            'text-1': '#85D3C3',
            'bg-2': '#6F281E',
            'text-2': '#FF8E8E',
            'bg-3': '#4D3C28',
            'text-3': '#FDA948',
            'bg-4': '#EDFAF2',
            'text-4': '#007012',
            'bg-5': '#FEF7ED',
            'text-5': '#FDA948',
          },
          'co-card': {
            title: '#4E46DC',
          },

          'co-primary': '#C4F360',
          'co-primary-opacity-60': '#99C4F360',
          'co-border': '#35382E',
          'co-border-gray': '#7C7C7C',
          'co-border-primary': '#603309',
          'co-text': {
            1: '#603309',
            2: '#080808',
            3: '#0B0C09',
            4: '#C4F360',
            5: 'rgba(255,255,255, 0.6)',
            6: '#F3C160',
            7: '#7C7C7C',
            8: '#3A3140',
            9: '#797979',
            error: '#FF3838',
            black: '#000000',
            white: '#FFFFFF',
            yellow: '#FFC70F',
            'yellow-2': '#F59F00'
          },
          'co-bg': {
            1: '#F4F1D4',
            2: '#FAFAFA',
            3: '#E2DEBC',
            4: 'rgba(244, 241, 212, 0.85)',
            5: '#603309',
            6: 'rgba(0, 0, 0, 0.10)',
            green: '#97C236',
            white: '#FFFFFF',
          },
          'co-button': {
            'primary-bg': '#FFC70F',
            'primary-text': '#603309',
            'default-bg': '#FFFFFF',
            'default-border': '#EDEDED',
            'default-text': '#333333',
            'ghost-text': '#C4F360',
            'ghost-border': '#C4F360',
            'dark-bg': '#0B0C09',
            'dark-text': '#FFFFFF',
            'light-bg': 'transparent',
            'light-text': '#FFFFFF'
          },
          'co-bg-gradient-to': '#57F1BC',
          'co-bg-gradient-from': '#C4F360'
        }
      },
      dark: {
        colors: {
          'co-bg': {
            1: '#1E1E1E',
            2: '#333333',
          },
          'co-gray': {
            1: '#EDEDED',
            2: '#999999',
            3: '#666666',
            4: '#474747',
            5: '#333333',
            6: '#212121',
          },
          'co-purple': {
            1: '#4E46DC',
            2: '#716BE3',
            3: '#9A96EB',
            4: '#F0EDFD',
            5: '#3F3D54',
          },
          'co-green': '#01C521',
          'co-light-green': '#00550E',
          'co-alert': '#EC5C5C',
          'co-tag': {
            'bg-1': '#183E38',
            'text-1': '#85D3C3',
            'bg-2': '#6F281E',
            'text-2': '#FF8E8E',
            'bg-3': '#4D3C28',
            'text-3': '#FDA948',
            'bg-4': '#183E38',
            'text-4': '#85D3C3',
            'bg-5': '#4D3C28',
            'text-5': '#FDA948',
          },
          'co-button': {
            'primary-bg': '#4E46DC',
            'primary-text': '#FFFFFF',
            'default-bg': 'transparent',
            'default-border': '#474747',
            'default-text': '#E4E4E4',
            'ghost-text': '#716BE3',
          },
          'co-card': {
            title: '#9A96EB',
          },
        }
      }
    }
  })],
}
