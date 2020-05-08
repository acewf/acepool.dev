/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';

import pic01 from '../../assets/images/pic01.jpg';

const PoolInfo = ({ title, description }) => (
  <section id="one" className="main style1">
    <div className="grid-wrapper">
      <div className="col-6">
        <header className="major">
          <h2 dangerouslySetInnerHTML={{ __html: title }} />
        </header>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      <div className="col-6">
        <span className="image fit">
          <img src={pic01} alt="" />
        </span>
      </div>
    </div>
  </section>
);

PoolInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
};

PoolInfo.defaultProps = {
  title: '',
  description: ''
};


export default PoolInfo;
