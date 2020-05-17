/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
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
    }
  ]
}
