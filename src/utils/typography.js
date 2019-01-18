import Typography from 'typography'

const typography = new Typography({
  baseFontSize: '16px',
  baseLineHeight: 1.5,
  headerFontFamily: ['Montserrat', 'sans-serif'],
  headerGray: 15,
  bodyFontFamily: ['Georgia', 'serif'],
  bodyGray: 15,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    'a:link': {
      textDecoration: 'none',
    },
  }),
})

export default typography

