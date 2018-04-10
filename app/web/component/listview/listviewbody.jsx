import React, { Component } from 'react';

const ListViewBody = (props) => {
  const { children } = props;
  
  return (
    <div className="am-list-body">{children}</div>
  );
};

export default ListViewBody;
