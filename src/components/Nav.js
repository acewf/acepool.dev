/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import '~/assets/scss/head.scss';

const Nav = ({ data }) => (
  <nav>
    <ul className="actions">
      <li><a href="#one">Discover</a></li>
    </ul>
  </nav>
);

Nav.propTypes = {
  data: PropTypes.object
};

Nav.defaultProps = {
  data: {}
};


export default Nav;
