const path = require(`path`)

module.exports = {
  siteMetadata: {
    title: `HSL Developer Community`,
    colors: {
      //https://www.hsl.fi/tyyliopas/varit
      primary: `#007AC9`,
      secondary: `#BEE4F8`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
}
