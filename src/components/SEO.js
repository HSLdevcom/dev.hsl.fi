import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

const SEO = ({ pageTitle, pageDescription, pageKeywords }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
            keywords
          }
        }
      }
    `}
    render={({ site: { siteMetadata: metadata } }) => {
      const title = pageTitle
        ? `${pageTitle} | ${metadata.title}`
        : metadata.title;
      const keywords = [...(metadata.keywords || []), ...(pageKeywords || [])];

      return (
        <Helmet>
          <title>{title}</title>

          {pageDescription && (
            <meta name="description" content={pageDescription} />
          )}

          {keywords && <meta name="keywords" content={keywords} />}

          {/* OpenGraph tags http://ogp.me/ */}
          <meta property="og:title" content={title} />
          {pageDescription && (
            <meta property="og:description" content={pageDescription} />
          )}

          {/* Twitter tags https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html */}
          <meta property="twitter:title" content={title} />
          {pageDescription && (
            <meta property="twitter:description" content={pageDescription} />
          )}
        </Helmet>
      );
    }}
  />
);

export default SEO;
