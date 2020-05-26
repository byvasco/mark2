/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Mark2Media`,
    titleTemplate: `%s – Mark2Media`,
    description: `Uniting passionates for the Mark2 Golfs and Jettas.`,
    url: `https://mark2.media`,
    image: ''
  },

  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-netlify-cms',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/stories`,
        name: 'stories',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/creatives`,
        name: 'creatives',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      plugins: []
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Mark2CMS',
        fieldName: 'mark2cms',
        url: 'https://cms.mk2swag.com/graphql'
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-112988312-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/localhost:8000/**"],
      },
    }
  ]
}
