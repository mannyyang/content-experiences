/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

function Layout(props) {
  const {
    children,
  } = props;

  return (
    <div>
      {children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
