import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";

export default ({ data, pageContext }) => {
  const page = data.markdownRemark;

  return (
    <>
      <SEO
        pageTitle={page.frontmatter.title}
        pageDescription={page.excerpt}
        pagePath={pageContext.slug}
      />
      <Layout>
        <Content>
          <h1>{page.frontmatter.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.html }} />
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
      }
      excerpt(pruneLength: 200, format: PLAIN)
    }
  }
`;
