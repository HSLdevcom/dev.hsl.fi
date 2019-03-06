import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import Responsive from "./Responsive";

import typography from "../utils/typography";

const { rhythm, options, adjustFontSizeTo } = typography;

const NavLink = props => (
  <Link
    to={props.to}
    style={{
      color: `white`,
      fontWeight: `bold`,
      fontFamily: options.headerFontFamily,
      marginRight: rhythm(2 / 3)
    }}
  >
    {props.children}
  </Link>
);

const navLinks = [
  <NavLink key="/projects/" to="/projects/">
    Projects
  </NavLink>,
  <NavLink key="/apis/" to="/apis/">
    APIs
  </NavLink>,
  <NavLink key="/contact/" to="/contact/">
    Contact
  </NavLink>
];

const HSLLogo = ({ image }) => (
  <a
    href="https://www.hsl.fi/en"
    style={{
      width: image.width,
      height: image.height,
      margin: `0`,
      padding: `0`,
      marginRight: rhythm(1)
    }}
  >
    <Img
      fixed={image}
      alt="HSL logo"
      critical={true}
      fadeIn={false}
      imgStyle={{ margin: `0`, padding: `0` }}
    />
  </a>
);

const DesktopHeader = ({ backgroundColor, logo, title }) => {
  return (
    <div style={{ margin: `0 auto` }}>
      <header
        style={{
          padding: rhythm(1),
          display: `flex`,
          justifyContent: `start`,
          alignItems: `center`,
          flexWrap: `wrap`,
          background: backgroundColor
        }}
      >
        <HSLLogo image={logo} />
        <Link
          to="/"
          style={{
            flexGrow: "1",
            textShadow: `none`,
            backgroundImage: `none`,
            marginRight: rhythm(1),
            color: `white`
          }}
        >
          <h3 style={{ display: `inline` }}>{title}</h3>
        </Link>
        <nav style={{ display: `inline-block` }}>{navLinks}</nav>
      </header>
    </div>
  );
};

const MobileHeader = ({ backgroundColor, logo, title }) => {
  return (
    <div
      style={{
        margin: `0 auto`,
        position: `sticky`,
        width: `100%`,
        top: `0`,
        zIndex: `3`
      }}
    >
      <header
        style={{
          marginBottom: rhythm(1 / 3),
          padding: rhythm(1 / 2),
          background: backgroundColor
        }}
      >
        <div
          style={{
            display: `flex`,
            justifyContent: `start`,
            alignItems: `center`,
            flexWrap: `wrap`
          }}
        >
          <HSLLogo image={logo} />
          <Link
            to="/"
            style={{
              flexGrow: "1",
              textShadow: `none`,
              backgroundImage: `none`,
              color: `white`
            }}
          >
            <h3
              style={{
                margin: `0`,
                display: `inline`,
                ...adjustFontSizeTo("15px")
              }}
            >
              {title}
            </h3>
          </Link>
        </div>
        <nav
          style={{
            display: `flex`,
            justifyContent: `space-around`,
            alignItems: `center`,
            flexWrap: `wrap`,
            marginTop: rhythm(1 / 3)
          }}
        >
          {navLinks}
        </nav>
      </header>
    </div>
  );
};

export default () => (
  <StaticQuery
    query={graphql`
      query {
        mobileLogo: file(name: { eq: "hsl_logo" }) {
          childImageSharp {
            fixed(width: 80) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
        desktopLogo: file(name: { eq: "hsl_logo" }) {
          childImageSharp {
            fixed(width: 295) {
              ...GatsbyImageSharpFixed_noBase64
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
      }
    `}
    render={data => (
      <Responsive
        mobile={
          <MobileHeader
            backgroundColor={data.site.siteMetadata.colors.primary}
            logo={data.mobileLogo.childImageSharp.fixed}
            title={data.site.siteMetadata.title}
          />
        }
        desktop={
          <DesktopHeader
            backgroundColor={data.site.siteMetadata.colors.primary}
            logo={data.desktopLogo.childImageSharp.fixed}
            title={data.site.siteMetadata.title}
          />
        }
      />
    )}
  />
);
