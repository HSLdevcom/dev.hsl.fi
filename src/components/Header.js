import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

import typography from '../utils/typography'

const { rhythm, options } = typography;

const NavLink = props => (
  <Link to={props.to} style={{ color: `white`, fontWeight: `bold`, fontFamily: options.headerFontFamily, marginRight: rhythm(2/3) }}>{props.children}</Link>
)

export default () => (
  <StaticQuery
    query={graphql`
      query {
        file(name: {eq: "hsl_logo"}) {
          childImageSharp {
            fixed(width: 295) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        site {
          siteMetadata {
            title
            colors {
              primary
            }
          }
        }
      }`
   } render={data => (
       <div style={{ margin: `0 auto` }}>
         <header style={{ 
           marginBottom: rhythm(2/3), 
           padding: rhythm(1), 
           display: `flex`, 
           justifyContent: `start`, 
           alignItems: `center`, 
           flexWrap: `wrap`,
           background: data.site.siteMetadata.colors.primary
          }}>   
            <a href="https://www.hsl.fi/en">
                <Img fixed={data.file.childImageSharp.fixed} alt="HSL logo" critical={true} fadeIn={false} style={{marginRight: rhythm(1)}} />
            </a>  
            <Link to="/" style={{ flexGrow: '1', textShadow: `none`, backgroundImage: `none`, marginRight: rhythm(1) }}>    
                <h3 style={{ display: `inline`, color: `white` }}>{ data.site.siteMetadata.title }</h3>      
            </Link>
            <nav style={{ display: `inline-block` }}>
              <NavLink to="/projects/">Projects</NavLink>
              <NavLink to="/apis/">APIs</NavLink>
              <NavLink to="/contact/">Contact</NavLink>
            </nav>
         </header>
       </div>
     )}
   />
)
