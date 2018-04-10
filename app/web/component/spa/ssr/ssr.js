import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'component/spa/ssr/components/home';
import Help from 'component/spa/ssr/components/help';
import Detail from 'component/spa/ssr/components/detail';
import Vote from 'component/spa/ssr/components/vote';

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
        <Route path="/ssr" component={Home}/>
      </Switch>
      {/*<img ref={el => this.checkImgWebP = el} src="data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=" onLoad={this.imgWebP} onError={this.imgWebP}/>*/}
    </div>;
  }
}

export default App;
