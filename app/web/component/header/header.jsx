import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './header.less';

const Header = (props) => {
  const { title, titleIsBlueColor, isBack, backIcon, back, isClose, closeIcon, close } = props;
  const goBack = () => {
    props.history.goBack();
  };

  return (
    <header className="header">
      {isBack && <a onClick={back ? back : goBack} className={`header-button ${backIcon || ''}`}></a>}
      {isClose && <a onClick={close} className={`header-button ${closeIcon || ''} header-button-close`}></a>}
      <h3 className={`header-title${titleIsBlueColor ? ' header-title-blue' : ''}`}>{title}</h3>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  titleIsBlueColor: PropTypes.bool.isRequired,
  isBack: PropTypes.bool.isRequired,
  backIcon: PropTypes.string.isRequired,
  back: PropTypes.func,
  isClose: PropTypes.bool.isRequired,
  closeIcon: PropTypes.string.isRequired,
  close: PropTypes.func
};

Header.defaultProps = {
  title: '',
  titleIsBlueColor: true,
  isBack: false,
  backIcon: 'icon-return-1',
  isClose: false,
  closeIcon: 'icon-error'
};

export default Header;
