import React from 'react'

import { Helmet } from "react-helmet";

import Header from './Header'

import typography from '../utils/typography'
import { StaticQuery } from 'gatsby';

const { rhythm } = typography;

export default ({children}) => (
  <StaticQuery query={graphql`
    query {
      site {
        siteMetadata {
          title
          colors {
            primary
            secondary
          }
        }
      }
    }`
 } render={ data => (
    <>
      <Helmet>
        <style>{ `html { background-color: ${data.site.siteMetadata.colors.secondary}}` }</style>
      </Helmet>
      <Header/>
      <div style={{ margin: `0 auto`, maxWidth: 1000, padding: `0 ${rhythm(1)}` }}>
        {children}
      </div>
    </>
 )}></StaticQuery>
)
