import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import Layout from '../components/layout';
import pic01 from '../assets/images/pic01.jpg';
import pic02 from '../assets/images/pic02.jpg';
import pic03 from '../assets/images/pic03.jpg';
import pic04 from '../assets/images/pic04.jpg';

const Homepage = ({ data }) => {
  const { pool: { logo, info } } = data;

  const siteTitle = 'Gatsby Starter - Photon';

  return (
    <Layout logo={logo} headerInfo={info} footerInfo={info}>
      <Helmet title={siteTitle} />

      <section id="one" className="main style1">
        <div className="grid-wrapper">
          <div className="col-6">
            <header className="major">
              <h2>
                Lorem ipsum dolor adipiscing
                <br />
                amet dolor consequat
              </h2>
            </header>
            <p>
              Adipiscing a commodo ante nunc accumsan et interdum mi ante
              adipiscing. A nunc lobortis non nisl amet vis sed volutpat
              aclacus nascetur ac non. Lorem curae et ante amet sapien sed
              tempus adipiscing id accumsan.
            </p>
          </div>
          <div className="col-6">
            <span className="image fit">
              <img src={pic01} alt="" />
            </span>
          </div>
        </div>
      </section>

      <section id="two" className="main style2">
        <div className="grid-wrapper">
          <div className="col-6">
            <ul className="major-icons">
              <li>
                <span className="icon style1 major fa-code" />
              </li>
              <li>
                <span className="icon style2 major fa-bolt" />
              </li>
              <li>
                <span className="icon style3 major fa-camera-retro" />
              </li>
              <li>
                <span className="icon style4 major fa-cog" />
              </li>
              <li>
                <span className="icon style5 major fa-desktop" />
              </li>
              <li>
                <span className="icon style6 major fa-calendar" />
              </li>
            </ul>
          </div>
          <div className="col-6">
            <header className="major">
              <h2>
                Lorem ipsum dolor adipiscing
                <br />
                amet dolor consequat
              </h2>
            </header>
            <p>
              COPY
            </p>
          </div>
        </div>
      </section>

      <section id="three" className="main style1 special">
        <div className="grid-wrapper">
          <div className="col-12">
            <header className="major">
              <h2>Adipiscing amet consequat</h2>
            </header>
            <p>
              Ante nunc accumsan et aclacus nascetur ac ante amet sapien sed.
            </p>
          </div>

          <div className="col-4">
            <span className="image fit">
              <img src={pic02} alt="" />
            </span>
            <h3>Magna feugiat lorem</h3>
            <p>
              Adipiscing a commodo ante nunc magna lorem et interdum mi ante
              nunc lobortis non amet vis sed volutpat et nascetur.
            </p>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  More
                </a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <span className="image fit">
              <img src={pic03} alt="" />
            </span>
            <h3>Magna feugiat lorem</h3>
            <p>
              Adipiscing a commodo ante nunc magna lorem et interdum mi ante
              nunc lobortis non amet vis sed volutpat et nascetur.
            </p>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  More
                </a>
              </li>
            </ul>
          </div>
          <div className="col-4">
            <span className="image fit">
              <img src={pic04} alt="" />
            </span>
            <h3>Magna feugiat lorem</h3>
            <p>
              Adipiscing a commodo ante nunc magna lorem et interdum mi ante
              nunc lobortis non amet vis sed volutpat et nascetur.
            </p>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  More
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="four" className="main style2 special">
        <div className="container">
          <header className="major">
            <h2>Ipsum feugiat consequat?</h2>
          </header>
          <p>Sed lacus nascetur ac ante amet sapien.</p>
          <ul className="actions uniform">
            <li>
              <a href="#" className="button special">
                Sign Up
              </a>
            </li>
            <li>
              <a href="#" className="button">
                Learn More
              </a>
            </li>
          </ul>
        </div>
      </section>
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
  }
`;
