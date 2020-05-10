/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '~/assets/scss/about.scss';

const PoolInfo = ({ about: { title, description, img } }) => (
  <section className="main style1 about">
    <div className="grid-wrapper">
      <div className="col-6">
        <header className="major">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </header>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="col-6">
        <span className="image fit">
          <div className="image--block">
            <Img fluid={img.childImageSharp.fluid} />
          </div>
        </span>
      </div>
    </div>
  </section>
);

PoolInfo.propTypes = {
  about: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.object
  })
};

PoolInfo.defaultProps = {
  about: {
    title: '',
    description: '',
    img: {
      childImageSharp: {
        fluid: null
      }
    }
  }
};


export default PoolInfo;
