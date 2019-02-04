import React from "react";
import { Helmet } from "react-helmet";
import { StaticQuery, graphql } from "gatsby";

const SEO = ({ pageTitle, pageDescription, pagePath, pageKeywords }) => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            keywords
            shareImage
          }
        }
      }
    `}
    render={({ site: { siteMetadata: metadata } }) => {
      const title = pageTitle
        ? `${pageTitle} | ${metadata.title}`
        : metadata.title;

      const canonicalUrl = metadata.siteUrl + pagePath;

      const shareImageUrl = metadata.siteUrl + metadata.shareImage;

      const keywords = [
        ...(metadata.keywords || []),
        ...(pageKeywords || [])
      ].filter(kw => !!kw);

      return (
        <Helmet>
          <title>{title}</title>

          {pageDescription && (
            <meta name="description" content={pageDescription} />
          )}

          <link rel="canonical" href={canonicalUrl} />

          {keywords.length > 0 && <meta name="keywords" content={keywords} />}

          {/* OpenGraph tags http://ogp.me/ */}
          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          {pageDescription && (
            <meta property="og:description" content={pageDescription} />
          )}
          <meta property="og:url" content={canonicalUrl} />
          <meta property="og:image" content={shareImageUrl} />

          {/* Twitter tags https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html */}
          <meta property="twitter:title" content={title} />
          {pageDescription && (
            <meta property="twitter:description" content={pageDescription} />
          )}
          <meta property="twitter:image" content={shareImageUrl} />
        </Helmet>
      );
    }}
  />
);

export default SEO;
