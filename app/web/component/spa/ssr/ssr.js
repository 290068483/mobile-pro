import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'component/spa/ssr/components/home';
import Help from 'component/spa/ssr/components/help';
import Detail from 'component/spa/ssr/components/detail';
// 投票界面
import Vote from 'component/spa/ssr/components/vote';
// 报名活动详情
import SignUpActivity from 'component/spa/ssr/components/sign-up-activity';
// 票类选择
import SelectVoteType from 'component/spa/ssr/components/select-vote-type';
// 个人信息填写
import InputPersionInfo from 'component/spa/ssr/components/input-persion-info';
// 确认订单页
import SureActivityInfo from 'component/spa/ssr/components/sure-activity-info';

import 'asset/css/app.less';

class App extends Component {
  constructor(props) {
    super(props);
    // const { url } = props;
    this.imgWebP = this.imgWebPHandle.bind(this);
  }

  imgWebPHandle (event) {
    if (localStorage) {
      localStorage.setItem('isSupportWebp', event && event.type === 'load' ? this.checkImgWebP.width === 1 : false);
    }
  }

  render() {
    return <div>
      <Switch>
        <Route path="/ssr/help/:typeId" component={Help}/>
        <Route path="/ssr/detail/:helpId" component={Detail}/>
        <Route path="/ssr/vote" component={Vote}/>
        <Route path="/ssr/sign-up-activity" component={SignUpActivity}/>
        <Route path="/ssr/select-vote-type" component={SelectVoteType}/>
        <Route path="/ssr/input-persion-info" component={InputPersionInfo}/>
        <Route path="/ssr/sure-activity-info" component={SureActivityInfo}/>
        <Route path="/ssr" component={Home}/>
      </Switch>
      {/*<img ref={el => this.checkImgWebP = el} src="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=" onLoad={this.imgWebP} onError={this.imgWebP}/>*/}
    </div>;
  }
}

export default App;
