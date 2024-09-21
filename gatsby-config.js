module.exports = {
  siteMetadata: {
    title: 'Kiến Thức & Phương Thảo - We are getting married',
    author: 'Kiến Thức',
    description: 'Our wedding site'
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'Wedding',
        short_name: 'ThucTran',
        start_url: '/',
        background_color: '#1b1f22',
        theme_color: '#7f828d',
        display: 'minimal-ui',
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            src: `/pwa-icons/logo.png`,
            sizes: `192x192`,
            type: `image/png`
          },
          {
            src: `/pwa-icons/logo.png`,
            sizes: `512x512`,
            type: `image/png`
          }
        ]
      }
    },
    'gatsby-plugin-offline',
    `gatsby-plugin-styled-components`
  ]
}
