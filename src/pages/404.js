import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '../components/layout';

const NotFoundPage = ({ data }) => {
  const { pool: { logo, info } } = data;

  return (
    <Layout logo={logo} headerInfo={info} footerInfo={info}>
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  );
};

NotFoundPage.propTypes = {
  data: PropTypes.object
};

NotFoundPage.defaultProps = {
  data: {}
};


export default NotFoundPage;

export const query = graphql`
  query {
    ...PoolInfoData
  }
`;
