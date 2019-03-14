import Typography from "typography";

const typography = new Typography({
  googleFonts: [
    {
      name: "Open Sans",
      styles: ["400", "700"]
    }
  ],
  baseFontSize: "16px",
  baseLineHeight: 1.5,
  headerFontFamily: ["Open Sans", "sans-serif"],
  headerGray: 15,
  bodyFontFamily: ["Open Sans", "sans-serif"],
  bodyGray: 15,
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    "a:link": {
      textDecoration: "none"
    },
    "a:link:hover": {
      textDecoration: "underline",
      textDecorationColor: "inherit"
    }
  })
});

export default typography;
