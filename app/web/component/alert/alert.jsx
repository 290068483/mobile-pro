import React, { Component } from 'react';
import {
	Button,WingBlank
} from 'antd-mobile';
import PropTypes from 'prop-types';

import './alert.less';

const Alert = (props) => {
  const { show, message,style,confirmHandle } = props;
  return (
    <div className={`alert${show ? ' alert-show' : ''}`}>
    <div className="alert-message">
      <p className="text-wp">{message}</p>
      <WingBlank>
        <Button onClick={confirmHandle} 
        style={style} size="small"  type="primary">
        確定</Button>
      </WingBlank>
      </div>
    </div>
  );
};

Alert.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  confirmHandle:PropTypes.func.isRequired
};

Alert.defaultProps = {
  show: false,
  message: '',
  style:{} //默认没有样式
};

export default Alert;
