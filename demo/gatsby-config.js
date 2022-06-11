module.exports = {
  pathPrefix: 'gatsby-plugin-smooth-scrollbar/',
  siteMetadata: {
    title: 'Gatsby Default Starter',
    description: 'Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.',
    author: '@gatsbyjs',
    siteUrl: 'https://gatsbystarterdefaultsource.gatsbyjs.io/',
  },
  plugins: [
    'gatsby-plugin-pnpm',
    {
      resolve: require.resolve('../gatsby-plugin'),
      options: {
        html: {
          scrollbarClassName: "html-dotjs-in-gatsby"
        },
        gsap: true,
        scrollbarOptions: {
          plugins: {
            overscroll: {
              enable: true,
              effect: 'bounce',
              damping: 0.3,
              maxOverscroll: 150,
              glowColor: '#222a2d',
            },
          }
        }
      }
    },
  ],
}
