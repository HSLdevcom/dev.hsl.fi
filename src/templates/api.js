import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";
import AsideContent from "../components/AsideContent";
import Responsive from "../components/Responsive";

const PageContent = ({ page }) => (
  <>
    <h1>{page.frontmatter.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: page.html }} />
  </>
);

const Endpoint = ({ endpoint }) => (
  <li>
    {endpoint.title}
    {": "}
    <code>{endpoint.url}</code>
  </li>
);

const EndpointList = ({ endpoints }) => (
  <ul>
    {endpoints.map(endpoint => (
      <Endpoint key={endpoint.url} endpoint={endpoint} />
    ))}
  </ul>
);

const DocumentationList = ({ documentation }) => (
  <ul>
    {documentation.map(documentation => (
      <li key={documentation.url}>
        <a href={documentation.url}>{documentation.title}</a>
      </li>
    ))}
  </ul>
);

const SideContent = ({ page }) => (
  <ul style={{ marginBottom: 0 }}>
    {page.frontmatter.documentation && (
      <li>
        <b>Documentation:</b>
        <DocumentationList documentation={page.frontmatter.documentation} />
      </li>
    )}
    {page.frontmatter.endpoints && (
      <li>
        <b>Endpoints:</b>
        <EndpointList endpoints={page.frontmatter.endpoints} />
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
              <AsideContent style={{ flex: "1 0 270px" }}>
                <SideContent page={page} />
              </AsideContent>
            </div>
          }
          mobile={
            <div>
              <Content>
                <PageContent page={page} />
              </Content>
              <AsideContent style={{ marginLeft: "0" }}>
                <SideContent page={page} />
              </AsideContent>
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
        documentation {
          title
          url
        }
        endpoints {
          title
          url
        }
      }
      excerpt(pruneLength: 200, format: PLAIN)
    }
  }
`;
