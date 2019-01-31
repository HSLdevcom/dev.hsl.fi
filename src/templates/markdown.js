import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <>
      <SEO
        pageTitle={post.frontmatter.title}
        pageDescription={post.excerpt}
        pagePath={post.fields.slug}
      />
      <Layout>
        <Content>
          <h1>{post.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Content>
      </Layout>
    </>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      fields {
        slug
      }
      html
      frontmatter {
        title
      }
      excerpt(pruneLength: 200, format: PLAIN)
    }
  }
`;
