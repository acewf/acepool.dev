/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '~/assets/scss/about.scss';

const PoolInfo = ({ about: { heading, description, img } }) => (
  <section className="main about listwrapper">
    <div className="wrapper">
      <div className="shadow">
        <div className="container">
          <header className="major">
            <h2 dangerouslySetInnerHTML={{ __html: heading }} />
          </header>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </div>
        <div className="image fit">
          <div className="image--block">
            <Img fluid={img.childImageSharp.fluid} />
          </div>
        </div>
      </div>
    </div>
  </section>
);

PoolInfo.propTypes = {
  about: PropTypes.shape({
    heading: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.object
  })
};

PoolInfo.defaultProps = {
  about: {
    heading: 'Some Title',
    description: '',
    img: {
      childImageSharp: {
        fluid: null
      }
    }
  }
};


export default PoolInfo;
