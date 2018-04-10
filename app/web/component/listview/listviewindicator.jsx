import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgBkg from 'asset/images/tinified/loading-bkg@2x.png';
import imgRotate from 'asset/images/tinified/loading-rotate@2x.png';
import imgLogo from 'asset/images/tinified/loading-logo@2x.png';

import './listviewindicator.less';

const ListViewIndicator = (props) => {
  const { message, loadingShow, isLoading } = props;
  
  return (
    <div className="listviewindicator">
      {loadingShow && <div className="listviewindicator-loading">
        <img src={imgBkg} className="listviewindicator-rotate listviewindicator-rotate-bkg"/>
        <img src={imgRotate} className={`listviewindicator-rotate${isLoading ? ' listviewindicator-rotate-animation' : ''}`}/>
        <img src={imgLogo} className="listviewindicator-logo"/>
      </div>}
      <h5 className="listviewindicator-message">{message}</h5>
    </div>
  );
};

ListViewIndicator.propTypes = {
  message: PropTypes.string.isRequired,
  loadingShow: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired
};

ListViewIndicator.defaultProps = {
  message: '',
  loadingShow: true,
  isLoading: false
};

export default ListViewIndicator;
