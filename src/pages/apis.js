import React from "react";

import { Link, graphql } from "gatsby";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";

export default ({ data, ...props }) => {
  const pages = data.allMarkdownRemark.edges;
  return (
    <>
      <Layout title="APIs">
        <SEO
          pageTitle="APIs"
          pageDescription="List of APIs provided by HSL"
          pagePath={props.location.pathname}
        />
        {pages.map(({ node: page }) => (
          <Content>
            <Link to={page.fields.slug}>
              <h2>{page.frontmatter.title}</h2>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: page.excerpt }} />
          </Content>
        ))}
      </Layout>
    </>
  );
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(filter: { fields: { slug: { regex: "/apis/" } } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
          excerpt(pruneLength: 800, format: HTML)
        }
      }
    }
  }
`;
