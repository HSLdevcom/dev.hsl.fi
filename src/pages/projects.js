import React from "react";

import { Link, graphql } from "gatsby";
import Img from "gatsby-image";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";

import typography from "../utils/typography";

const { rhythm } = typography;

export default ({ data, ...props }) => {
  const pages = data.allMarkdownRemark.edges;
  return (
    <>
      <Layout title="Projects">
        <SEO
          pageTitle="Projects"
          pageDescription="List of ongoing projects at HSL"
          pagePath={props.location.pathname}
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridColumnGap: rhythm(2 / 3),
            gridAutoRows: "1fr"
          }}
        >
          {pages.map(({ node: page }) => (
            <Content style={{ minWidth: "0", overflow: "hidden" }}>
              <Link to={page.fields.slug}>
                <h2>{page.frontmatter.title}</h2>
              </Link>
              {page.frontmatter.image && (
                <Img fluid={page.frontmatter.image.childImageSharp.fluid} />
              )}
              <p style={{ margin: `${rhythm(2 / 3)} 0 0 0` }}>{page.excerpt}</p>
            </Content>
          ))}
        </div>
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { fields: { slug: { regex: "/projects/" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 300, maxHeight: 150, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          excerpt(pruneLength: 150, format: PLAIN)
        }
      }
    }
  }
`;