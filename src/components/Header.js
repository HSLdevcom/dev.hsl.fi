import React from "react";
import { Link, StaticQuery, graphql } from "gatsby";
import Img from "gatsby-image";

import Responsive from "./Responsive";

import typography from "../utils/typography";
import MenuButton from "./MenuButton";

const { rhythm, options, adjustFontSizeTo } = typography;

const NavLink = props => (
  <Link
    to={props.to}
    style={{
      color: `white`,
      fontWeight: `bold`,
      fontFamily: options.headerFontFamily,
      marginRight: props.mobile ? 0 : rhythm(2 / 3)
    }}
  >
    {props.children}
  </Link>
);

const NavLinks = ({ mobile }) => [
  <NavLink key="/projects/" to="/projects/" mobile={mobile}>
    Projects
  </NavLink>,
  <NavLink key="/apis/" to="/apis/" mobile={mobile}>
    APIs
  </NavLink>,
  <NavLink key="/contact/" to="/contact/" mobile={mobile}>
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

class Header extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = { mobileMenuOpen: false };
  }

  render() {
    const { backgroundColor, logo, title, mobile } = this.props;

    return (
      <header
        style={{
          margin: `0 auto`,
          background: backgroundColor,
          padding: rhythm(mobile ? 1 / 2 : 1),
          ...(mobile
            ? {
                position: `sticky`,
                width: `100%`,
                top: `0`,
                zIndex: `3`
              }
            : {})
        }}
      >
        <div
          style={{
            display: `flex`,
            justifyContent: `start`,
            alignItems: `center`,
            flexWrap: `nowrap`
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
            <h1
              style={{
                display: `inline`,
                ...(mobile
                  ? adjustFontSizeTo("15px")
                  : adjustFontSizeTo("22px"))
              }}
            >
              {title}
            </h1>
          </Link>
          {mobile ? (
            <MenuButton
              style={{ width: 30, height: 30, marginRight: rhythm(1 / 2) }}
              onChange={open => this.setState({ mobileMenuOpen: open })}
            />
          ) : (
            <nav style={{ display: `inline-block` }}>
              <NavLinks />
            </nav>
          )}
        </div>
        <nav
          style={{
            marginTop: rhythm(1 / 2),
            display: this.state.mobileMenuOpen ? "flex" : "none",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <NavLinks mobile />
        </nav>
      </header>
    );
  }
}

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
      <Responsive>
        {desktop => (
          <Header
            backgroundColor={data.site.siteMetadata.colors.primary}
            logo={
              desktop
                ? data.desktopLogo.childImageSharp.fixed
                : data.mobileLogo.childImageSharp.fixed
            }
            title={data.site.siteMetadata.title}
            mobile={!desktop}
          />
        )}
      </Responsive>
    )}
  />
);
