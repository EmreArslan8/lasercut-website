export const defaultPalette = {
  logo: { src: '/static/images/logo5.png', width: 105, height: 30 },
  primary: {
    main: '#A166FF',
    light: '#F5EFFF',
    dark: '#8051CB',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.75deg, #270163 2.2%, #431985 45.17%, #380091 82.3%)',
  },
  primaryDark: {
    main: '#6636B3',
    light: '#F5EFFF',
    dark: '#6636B3',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.75deg, #270163 2.2%, #431985 45.17%, #380091 82.3%)',
  },
  bg: { main: '#FFFFFF', dark: '#F5EFFF', light: '#F7F8FA', contrastText: '#0A1A3B' },
  blue: {
    main: '#4A87E3',
    dark: '#4A87E3',
    light: '#F5F9FF',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.11deg, #00327D 2.24%, #1754B0 50.27%, #78A3E3 98.95%)',
  },
  info: {
    main: '#4A87E3',
    dark: '#4A87E3',
    light: '#F5F9FF',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.11deg, #00327D 2.24%, #1754B0 50.27%, #78A3E3 98.95%)',
  },
  green: {
    main: '#71A63C',
    dark: '#71A63C',
    light: '#F1F7EA',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.11deg, #71A63C 2.24%, #BEDC9F 98.95%)',
  },
  success: {
    main: '#71A63C',
    dark: '#71A63C',
    light: '#F1F7EA',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.11deg, #71A63C 2.24%, #BEDC9F 98.95%)',
  },
  error: {
    main: '#F27261',
    dark: '#F27261',
    light: '#FFF1EF',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.11deg, #F27261 2.24%, #F69C90 98.95%)',
  },
  warning: {
    main: '#FFC003',
    dark: '#CCA300',
    light: '#FFFAE3',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.11deg, #FFC003 2.24%, #FFDA69 98.95%)',
  },
  secondary: {
    main: '#0A1A3B',
    light: '#E3EAFA',
    dark: '#E3EAFA',
    contrastText: '#FFFFFF',
    gradient: 'linear-gradient(102.11deg, #00327D 2.24%, #1754B0 50.27%, #78A3E3 98.95%)',
  },
  tertiary: { main: '#596680', light: '#E7EAF0', dark: '#DFE3EB', contrastText: '#596680' },
  neutral: { main: '#596680', light: '#F7F8FA', dark: '#DFE3EB', contrastText: '#596680' },
  text: {
    main: '#0A1A3B',
    medium: '#596680',
    mediumLight: '#8090AD',
    light: '#DFE3EB',
    secondary: '#596680',
    disabled: '#DFE3EB',
  },
  white: { main: '#FFFFFF', contrastText: '#0A1A3B' },
  gradient: {
    g1: 'linear-gradient(100.11deg, #C4FFF6 0%, #33C1CD 100%)',
    g1r: 'linear-gradient(261.7deg, #B8FFF4 0%, #29C0CD 100%)',
    g2: 'linear-gradient(96.66deg, #FFD1B5 0%, #FF8CAA 100%)',
    g2r: 'linear-gradient(67.25deg, #FF668E 0%, #FFB88E 100%)',
    g3: 'linear-gradient(96.66deg, #E872D0 0%, #8A32A8 100%)',
    g3r: 'linear-gradient(68.75deg, #8A32A8 0%, #E872D0 99.99%)',
    g4: `linear-gradient(120deg, #D9F4FF, #8ED9FF, #009EFF)`, // Yeni custom gradient 1
    g5: `linear-gradient(120deg, #80C9F1, #006BB3, #004A8D)`, // Daha koyu tonlar
    g6: `radial-gradient(circle at bottom center, #3975ca 20%, #a9c7ff 50%, #d0ddf0 80%),
            linear-gradient(to bottom, #f5f7fa 0%, #e6ecf3 40%, #d0ddf0 70%),
            background: linear-gradient(to bottom, #ffffff 0%, #e6f0ff 40%, #c2d9ff 70%, #a0c0ff 100%);
`,

  },
};

export type Palette = typeof defaultPalette;
