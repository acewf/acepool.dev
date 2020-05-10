/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import '~/assets/scss/head.scss';

const Header = ({ data }) => {
  const { title, description } = data;

  return (
    <section id="header">
      <div className="inner">
        <div className="imageContainer">
          <Img fluid={data.image.childImageSharp.fluid} />
        </div>
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <ul className="actions">
          <li><a href="#one" className="button scrolly">Discover</a></li>
        </ul>
      </div>
    </section>
  );
};

Header.propTypes = {
  data: PropTypes.object
};

Header.defaultProps = {
  data: {}
};


export default Header;
