import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ListViewFooter = (props) => {
  const { isHaveMore } = props;
  
  return (
    <div style={{paddingTop: 5, textAlign: 'center'}}>{isHaveMore ? '正在加载数据中...' : '已经到底啦'}</div>
  );
};

ListViewFooter.propTypes = {
  isHaveMore: PropTypes.bool.isRequired
};

ListViewFooter.defaultProps = {
  isHaveMore: true
};

export default ListViewFooter;
