import React from "react";
import { graphql } from "gatsby";

import NonStrechedImage from "../components/NonStrechedImage";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import AsideContent from "../components/AsideContent";
import Content from "../components/Content";
import Responsive from "../components/Responsive";
import typography from "../utils/typography";

const { rhythm } = typography;

const PageContent = ({ page }) => (
  <>
    <h1>{page.frontmatter.title}</h1>
    {page.frontmatter.image && (
      <a href={page.frontmatter.image.publicURL}>
        <NonStrechedImage
          fluid={page.frontmatter.image.childImageSharp.fluid}
          alt={page.frontmatter.imageAlt || ""}
        />
      </a>
    )}
    <div
      style={{ marginTop: rhythm(1 / 3) }}
      dangerouslySetInnerHTML={{ __html: page.html }}
    />
  </>
);

const DeploymentList = ({ deployments }) => (
  <ul>
    {deployments.map(deployment => (
      <li key={deployment.url}>
        <a href={deployment.url}>{deployment.title}</a>
      </li>
    ))}
  </ul>
);

const SideContent = ({ page }) => (
  <ul style={{ marginBottom: 0 }}>
    {page.frontmatter.deployments && (
      <li>
        <b>Deployments:</b>
        <DeploymentList deployments={page.frontmatter.deployments} />
      </li>
    )}
  </ul>
);

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
        <Responsive
          desktop={
            <div style={{ display: "flex", alignItems: "start" }}>
              <Content style={{ flex: "10 0" }}>
                <PageContent page={page} />
              </Content>
              {page.frontmatter.deployments && (
                <AsideContent style={{ flex: "1 0 270px" }}>
                  <SideContent page={page} />
                </AsideContent>
              )}
            </div>
          }
          mobile={
            <div>
              <Content>
                <PageContent page={page} />
              </Content>
              {page.frontmatter.deployments && (
                <AsideContent style={{ marginLeft: "0" }}>
                  <SideContent page={page} />
                </AsideContent>
              )}
            </div>
          }
        />
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
          publicURL
          childImageSharp {
            fluid(maxWidth: 1000) {
              ...GatsbyImageSharpFluid
              presentationWidth
            }
          }
        }
        imageAlt
        deployments {
          title
          url
        }
      }
      excerpt(pruneLength: 200, format: PLAIN)
    }
  }
`;
