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
            dataSource={{ sourceType: "profile", screenName: "HSLdevcom" }}
            options={{ username: "HSLdevcom", height: "500", width: "100%" }}
          />

          <GithubOrganizationEvents
            style={{ height: "500px", width: "33%" }}
            organization="HSLdevcom"
          />

          <div style={{ height: "500px", width: "33%" }}>
            <FacebookProvider>
              <FacebookTimeline page="HSLdevcom" />
            </FacebookProvider>
          </div>
        </div>
      </Content>
    )}
  />
);
