import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/main.scss';

import Header from './Header';
import Footer from './Footer';

const Layout = ({ children, headerInfo, footerInfo }) => {
  const [isLoading, setLoadingState] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingState(true);
    }, 100);
  }, []);

  const activeClass = isLoading ? 'is-loading' : '';

  return (
    <div className={`body ${activeClass}`}>
      <Header data={headerInfo} />
      {children}
      <Footer data={footerInfo} />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.any.isRequired,
  headerInfo: PropTypes.object,
  footerInfo: PropTypes.object
};

Layout.defaultProps = {
  headerInfo: {},
  footerInfo: {}
};


export default Layout;
