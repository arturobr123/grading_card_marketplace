import React from 'react';

import Navbar from './Navbar';

function Layout(props) {
  const { children } = props;

  return (
    <React.Fragment>
      <Navbar />
      {children}
    </React.Fragment>
  );
}

export default Layout;
