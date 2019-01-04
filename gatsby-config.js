module.exports = {
  siteMetadata: {
    title: "Warren White | Bio",
    author: "Warren White",
    description: "A little bit about me."
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'gatsby-starter-default',
        short_name: 'A Bio',
        start_url: '/',
        background_color: '#258',
        theme_color: '#258',
        display: 'minimal-ui',
        icon: 'src/images/favicon-16x16.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-offline'
  ]
}
