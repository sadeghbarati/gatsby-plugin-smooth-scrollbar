module.exports = {
  flags: {
    DEV_SSR: true
  },
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
        scrollbarClassName: 'gatsby-another-class',
        gsap: true,
        scrollbarOptions: {
          plugins: {
            overscroll: {
              enable: true,
              effect: 'bounce',
              damping: 0.2,
              maxOverscroll: 150,
              glowColor: '#222a2d',
            },
          }
        }
      }
    },
  ],
}
