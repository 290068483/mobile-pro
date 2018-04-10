import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgBkg from 'asset/images/tinified/loading-bkg@2x.png';
import imgRotate from 'asset/images/tinified/loading-rotate@2x.png';
import imgLogo from 'asset/images/tinified/loading-logo@2x.png';

import './loading.less';

const Loading = (props) => {
  const { show } = props;
  
  return (
    <div className={`loading loading-center-middle${show ? '' : ' loading-hide'}`}>
      <img src={imgBkg} className="loading-center-middle loading-rotate loading-rotate-bkg"/>
      <img src={imgRotate} className="loading-center-middle loading-rotate loading-rotate-animation"/>
      <img src={imgLogo} className="loading-center-middle loading-logo"/>
    </div>
  );
};

Loading.propTypes = {
  show: PropTypes.bool.isRequired
};

Loading.defaultProps = {
  show: false
};

export default Loading;
