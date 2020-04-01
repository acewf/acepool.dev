import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';

const Header = ({ data }) => {
  const { title, description, image } = data;

  return (
    <section id="header">
      <div className="inner">
        <div className="imageContainer">
          <Img fluid={image.childImageSharp.fluid} />
        </div>
        <h1>{title}</h1>
        <p>{description}</p>
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
