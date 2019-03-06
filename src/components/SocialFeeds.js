import React from "react";

import { Timeline } from "react-twitter-widgets";

import { FacebookTimeline } from "./Facebook";
import GithubOrganizationEvents from "./GithubOrganizationEvents";
import Content from "./Content";
import Responsive from "./Responsive";

import typography from "../utils/typography";
import { StaticQuery, graphql } from "gatsby";

const { rhythm } = typography;

const DesktopContainer = ({ children }) => (
  <div style={{ height: "500px", width: "33%", overflow: "hidden" }}>
    {children}
  </div>
);

const MobileContainer = ({ children }) => (
  <div
    style={{
      flex: "0 1 300px",
      width: "100%",
      maxWidth: "500px",
      overflow: "hidden",
      margin: `${rhythm(1 / 3)} 0`
    }}
  >
    {children}
  </div>
);

const DesktopSocialFeeds = ({ twitter, github, facebook }) => {
  return (
    <div style={{ display: `flex`, justifyContent: `space-between` }}>
      <DesktopContainer>
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: twitter
          }}
          options={{
            username: twitter,
            height: "500",
            width: "100%"
          }}
        />
      </DesktopContainer>

      <DesktopContainer>
        <GithubOrganizationEvents
          style={{ height: "100%", width: "100%" }}
          organization={github}
        />
      </DesktopContainer>

      <DesktopContainer>
        <FacebookTimeline page={facebook} />
      </DesktopContainer>
    </div>
  );
};

const MobileSocialFeeds = ({ twitter, github, facebook }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <MobileContainer>
        <Timeline
          dataSource={{
            sourceType: "profile",
            screenName: twitter
          }}
          options={{
            username: twitter,
            height: "300",
            width: "100%"
          }}
        />
      </MobileContainer>

      <MobileContainer>
        <GithubOrganizationEvents
          style={{ height: "100%", width: "100%" }}
          organization={github}
        />
      </MobileContainer>

      <MobileContainer>
        <FacebookTimeline page={facebook} height={300} />
      </MobileContainer>
    </div>
  );
};

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
    render={data => {
      return (
        <Content
          style={{ backgroundColor: data.site.siteMetadata.colors.secondary }}
        >
          <Responsive
            desktop={
              <DesktopSocialFeeds {...data.site.siteMetadata.socialMedia} />
            }
            mobile={
              <MobileSocialFeeds {...data.site.siteMetadata.socialMedia} />
            }
          />
        </Content>
      );
    }}
  />
);
