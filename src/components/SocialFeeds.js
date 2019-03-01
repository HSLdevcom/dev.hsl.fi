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
      height: "300px",
      width: "100%",
      overflow: "hidden",
      margin: `${rhythm(1 / 3)} 0`
    }}
  >
    {children}
  </div>
);

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
      const desktop = (
        <div style={{ display: `flex`, justifyContent: `space-between` }}>
          <DesktopContainer>
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
          </DesktopContainer>

          <DesktopContainer>
            <GithubOrganizationEvents
              style={{ height: "100%", width: "100%" }}
              organization={data.site.siteMetadata.socialMedia.github}
            />
          </DesktopContainer>

          <DesktopContainer>
            <FacebookTimeline
              page={data.site.siteMetadata.socialMedia.facebook}
            />
          </DesktopContainer>
        </div>
      );

      const mobile = (
        <div>
          <MobileContainer>
            <Timeline
              dataSource={{
                sourceType: "profile",
                screenName: data.site.siteMetadata.socialMedia.twitter
              }}
              options={{
                username: data.site.siteMetadata.socialMedia.twitter,
                height: "300",
                width: "100%"
              }}
            />
          </MobileContainer>

          <MobileContainer>
            <GithubOrganizationEvents
              style={{ height: "100%", width: "100%" }}
              organization={data.site.siteMetadata.socialMedia.github}
            />
          </MobileContainer>

          <MobileContainer>
            <FacebookTimeline
              page={data.site.siteMetadata.socialMedia.facebook}
              height={300}
            />
          </MobileContainer>
        </div>
      );

      return (
        <Content
          style={{ backgroundColor: data.site.siteMetadata.colors.secondary }}
        >
          <Responsive desktop={desktop} mobile={mobile} />
        </Content>
      );
    }}
  />
);
