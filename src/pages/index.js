import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '~/components/layout';
import PoolInfo from '../components/sections/PoolInfo';
import TechStake from '../components/sections/TechStake';
import PoolData from '../components/sections/PoolData';
import Notify from '../components/sections/Notify';

const Homepage = ({ data }) => {
  const { pool: { logo, info, about } } = data;

  const siteTitle = 'Gatsby Starter - Photon';

  return (
    <Layout logo={logo} headerInfo={info} footerInfo={info}>
      <Helmet title={siteTitle} />
      <PoolInfo title={about.heading} description={about.description} />
      <TechStake />
      <PoolData />
      <Notify />
    </Layout>
  );
};

Homepage.propTypes = {
  data: PropTypes.object
};

Homepage.defaultProps = {
  data: {}
};


export default Homepage;


export const query = graphql`
  query {
    ...PoolInfoData
    ...PoolAboutData
  }
`;
