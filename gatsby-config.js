const offline = require('./config/offline');
const importAlias = require('./config/importAlias');
const transformJson = require('./config/transform-json');

module.exports = {
  siteMetadata: {
    title: 'Ace Pool',
    author: 'acewf',
    description: 'AcePool, is Pool operator for cardano cryptocurrency.'
  },
  plugins: [
    offline(),
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        stripMetadata: true
      }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'data/images/logo.png' // This path is relative to the root of the site.
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline',
    'gatsby-transformer-sharp',
    importAlias(__dirname, 'src/'),
    transformJson(),
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/data/`
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-19969281-5'
      }
    }
  ]
};
