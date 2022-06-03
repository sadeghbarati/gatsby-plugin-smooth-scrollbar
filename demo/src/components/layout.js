/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react'
import PropTypes from 'prop-types'

// import Scroll from "./smoothScroll"

import Header from './header'
import './layout.css'

// eslint-disable-next-line react/prop-types
const Layout = ({ children, location }) => {
  return (
    <>
      <Header siteTitle={'Title'} />

      {/* <Scroll callbacks={location} /> */}

      <div
        style={{
          margin: '0 auto',
          maxWidth: 'var(--size-content)',
          padding: 'var(--size-gutter)',
        }}
      >
        <main>{children}</main>
        <footer
          style={{
            marginTop: 'var(--space-5)',
            fontSize: 'var(--font-sm)',
          }}
        >
          © {new Date().getFullYear()} &middot; Built with
          {' '}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
