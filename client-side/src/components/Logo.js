import React from 'react';
import logo from '../static/logo.png';

const Logo = (props) => {
  return <img className="logo-image" alt="Logo" src={logo} {...props} />;
};

export default Logo;
