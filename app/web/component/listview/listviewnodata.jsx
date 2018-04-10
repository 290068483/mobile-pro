import React, { Component } from 'react';
import imgNoData from 'asset/images/tinified/list-no-data@2x.png';

import './listviewnodata.less';

const ListViewNoData = () => {  
  return (
    <div className="listviewnodata">
      <img src={imgNoData} className="listviewnodata-img"/>
      <h5 className="listviewnodata-message">当前暂无内容！</h5>
    </div>
  );
};

export default ListViewNoData;
