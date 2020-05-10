import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Layout from '~/components/layout';
import PoolInfo from '../components/sections/PoolInfo';
import TechStake from '../components/sections/TechStake';
import FAQs from '../components/sections/FAQs';
import SEO from '../components/SEO';
// import Notify from '../components/sections/Notify';

const Homepage = ({ data }) => {
  const { pool: { logo, info, about, stack, faqs, metadata } } = data;

  return (
    <Layout logo={logo} headerInfo={info} footerInfo={info}>
      <SEO data={metadata} />
      <PoolInfo about={about} />
      <TechStake data={stack} />
      <FAQs data={faqs} />
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
    ...PoolStackData
    ...PoolFaqsData
    ...PoolMetaData
  }
`;
