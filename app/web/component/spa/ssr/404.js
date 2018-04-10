import React, { Component } from 'react';
import Header from 'component/header/header';
import img404 from 'asset/images/tinified/404.png';

import 'asset/css/app.less';

class NotFound extends Component {

  constructor(props) {
    super(props);
    // const { url } = props;
    this.goHome = this.goHomeHandle.bind(this);
  }

  goHomeHandle() {
    window.location.pathname = '/';
  }

  render() {
    return <div className="main">
      <Header {...this.props} title="404" titleIsBlueColor={false} isBack={true} back={this.goHome}></Header>
      <div className="bottom notfound">
        <img src={img404} className="notfound-img"/>
        <h5 className="notfound-message">页面在网络里迷路了~</h5>
      </div>
    </div>;
  }
}

export default NotFound;
