import React from "react";

import { Timeline } from "react-twitter-widgets";

import { FacebookProvider, FacebookTimeline } from "./Facebook";
import GithubOrganizationEvents from "./GithubOrganizationEvents";
import Content from "./Content";

//import typography from '../utils/typography'
import { StaticQuery, graphql } from "gatsby";

//const { rhythm } = typography;

export default () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            colors {
              secondary
            }
            socialMedia {
              twitter
              facebook
              github
            }
          }
        }
      }
    `}
    render={data => (
      <Content
        style={{ backgroundColor: data.site.siteMetadata.colors.secondary }}
      >
        <div style={{ display: `flex`, justifyContent: `space-between` }}>
          <Timeline
            dataSource={{
              sourceType: "profile",
              screenName: data.site.siteMetadata.socialMedia.twitter
            }}
            options={{
              username: data.site.siteMetadata.socialMedia.twitter,
              height: "500",
              width: "100%"
            }}
          />

          <GithubOrganizationEvents
            style={{ height: "500px", width: "33%" }}
            organization={data.site.siteMetadata.socialMedia.github}
          />

          <div style={{ height: "500px", width: "33%" }}>
            <FacebookProvider>
              <FacebookTimeline
                page={data.site.siteMetadata.socialMedia.facebook}
              />
            </FacebookProvider>
          </div>
        </div>
      </Content>
    )}
  />
);
