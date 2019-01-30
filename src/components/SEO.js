import React from "react"
import { Helmet } from "react-helmet"
import { StaticQuery, graphql } from 'gatsby';

const SEO = ({ pageTitle, pageDescription, pageKeywords }) => (
    <StaticQuery query={ graphql`
        query {
            site {
                siteMetadata {
                    title
                    keywords
                }
            }
        }` 
    } render={ ({ site: { siteMetadata: metadata }}) => {
            const title = pageTitle ? `${pageTitle} | ${metadata.title}` : metadata.title
            const keywords = [...(metadata.keywords || []), ...(pageKeywords || [])]

            return (
                <Helmet>
                    <title>{ title }</title>

                    { pageDescription && <meta name="description" content={ pageDescription }></meta> }

                    { keywords && <meta name="keywords" content={ keywords }></meta> }
                    
                    {/* OpenGraph tags http://ogp.me/ */}
                    <meta property="og:title" content={ title }></meta>
                    { pageDescription && <meta property="og:description" content={ pageDescription }></meta>}

                    {/* Twitter tags https://developer.twitter.com/en/docs/tweets/optimize-with-cards/overview/markup.html */}
                    <meta property="twitter:title" content={ title }></meta>
                    { pageDescription && <meta property="twitter:description" content={ pageDescription }></meta>}
                </Helmet>
            )
        }}></StaticQuery>
)

export default SEO