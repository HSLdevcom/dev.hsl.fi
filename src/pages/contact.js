import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";

export default props => (
  <>
    <Layout>
      <SEO
        pageTitle="Contact"
        pageDescription="Contact information for HSL developer community"
        pagePath={props.location.pathname}
      />
      <Content>
        <h1>Contact us</h1>
        <ul>
          <li>
            <a href="https://www.facebook.com/HSLdevcom">
              <strong>facebook</strong>.com/HSLdevcom
            </a>
          </li>
          <li>
            <a href="https://twitter.com/HSLdevcom">
              <strong>twitter</strong>.com/HSLdevcom
            </a>
          </li>
          <li>
            <a href="https://github.com/HSLdevcom">
              <strong>github</strong>.com/HSLdevcom
            </a>
          </li>
        </ul>
      </Content>
    </Layout>
  </>
);
