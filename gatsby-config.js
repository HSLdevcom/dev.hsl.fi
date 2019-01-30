const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `HSL Developer Community`,
    keywords: [`HSL`, `developer`, `open data`],
    colors: {
      //https://www.hsl.fi/tyyliopas/varit
      primary: `#007AC9`,
      secondary: `#00B9E4`,
      background: `#BEE4F8`
    }
  },
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`)
      }
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`
  ]
};
