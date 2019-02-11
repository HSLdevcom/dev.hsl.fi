import React from "react";
import { graphql } from "gatsby";

import NonStrechedImage from "../components/NonStrechedImage";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import typography from "../utils/typography";

const { rhythm } = typography;

export default ({ data, pageContext }) => {
  const post = data.markdownRemark;
  return (
    <>
      <SEO
        pageTitle={post.frontmatter.title}
        pageDescription={post.excerpt}
        pagePath={pageContext.slug}
      />
      <Layout>
        <Content>
          <h1>{post.frontmatter.title}</h1>
          {post.frontmatter.image && (
            <NonStrechedImage
              fluid={post.frontmatter.image.childImageSharp.fluid}
              alt={post.frontmatter.imageAlt || ""}
            />
          )}
          <div
            style={{ marginTop: rhythm(1 / 3) }}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Content>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
        imageAlt
      }
      excerpt(pruneLength: 200, format: PLAIN)
    }
  }
`;
