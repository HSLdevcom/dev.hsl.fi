import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import Content from "../components/Content";

export default props => (
  <>
    <Layout>
      <SEO
        pageDescription="HSL Developer Community is open for all individuals and organisations interested in the Open Data and Open Source software regarding Helsinki Region Transport HSL or wider."
        pagePath={props.location.pathname}
      />
      <Content>
        HSL Developer Community is open for all individuals and organisations
        interested in the Open Data and Open Source software regarding Helsinki
        Region Transport HSL or wider.
        <br />
        HSL is the public authority that plans and procures the public transport
        (ferry, tram, metro, train, bus) within its member municipalities
        (Helsinki, Vantaa, Espoo, Kauniainen, Kirkkonummi, Kerava, Sipoo,
        Siuntio and Tuusula).
      </Content>
    </Layout>
  </>
);
