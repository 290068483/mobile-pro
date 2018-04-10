import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  helpListAdd,
  helpListClear,
  helpTotalCountUpdate,
  helpListPageIndexUpdate,
  helpListScrollTopUpdate,
  currHelpTitleUpdate
} from 'component/spa/ssr/actions';
import Header from 'component/header/header';
import ListViewBody from 'component/listview/listviewbody';
import ListViewFooter from 'component/listview/listviewfooter';
import ListViewIndicator from 'component/listview/listviewindicator';
import ListViewNoData from 'component/listview/listviewnodata';
import Toast from 'component/toast/toast';
import Loading from 'component/loading/loading';
import {
  PullToRefresh,
  ListView
} from 'antd-mobile';

import '../../../../../service/api';

const getMockData = (pageSize = 20, pageIndex = 1) => {
  const data = [];
  if (pageIndex > 10) {
    return data;
  }
  let i = 0;
  for (i = 0; i < pageSize; i++) {
    const id = (pageIndex - 1) * pageSize + i;
    data.push({
      helpId: id,
      helpTitle: '问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题问题'
    });
  }
  return data;
}

class Help extends Component {
  constructor(props) {
    super(props);
    const { helpList, helpListScrollTop } = props;
    this.state = {
      dataGeted: helpList.length !== 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      refreshing: false,
      isLoading: false,
      isHaveMore: false,
      isScrolled: false,
      toastShow: false,
      toastMessage: ''
    };
    this.scrollTop = helpListScrollTop;
    this.t = null;
    this.onScroll = this.onScrollHandle.bind(this);
    this.onRefresh = this.onRefreshHandle.bind(this);
    this.onEndReached = this.onEndReachedHandle.bind(this);
  }

  componentWillMount() {
    this.loadData(true, false);
  }

  componentDidMount() {
    /*// todo: 未解决重复监听问题，react判断返回阻止返回问题
    const { history } = this.props;
    history.listen((listener) => {
      if (listener.pathname === '/ssr') {
      }
    });*/
    this.t = setTimeout(() => {
      if (this.scrollTop > 0) {
        this.lv.scrollTo(0, this.scrollTop);
      }
    }, 10);
  }

  componentWillUnmount() {
    this.closeTimeout();
  }

  showToast (message) {
    const { toastShow } = this.state;
    if (toastShow) {
      this.closeTimeout();
    }
    this.setState({
      toastShow: true,
      toastMessage: message
    }, () => {
      this.t = setTimeout(() => {
        this.setState({
          toastShow: false,
          toastMessage: ''
        });
      }, 2000);
    });
  }

  closeTimeout () {
    if (this.t) {
      clearTimeout(this.t);
      this.t = null;
    }
  }

  onScrollHandle (event) {
    this.scrollTop = event.target.scrollTop;
    const { isScrolled } = this.state;
    if (!isScrolled) {
      this.setState({
        isScrolled: true
      });
    }
  }

  onRefreshHandle () {
    this.loadData(false, true);
  }

  onEndReachedHandle () {
    this.loadData(false, false);
  }

  loadData (isInit, isRefreshing) {
    const { match, appName, pageSize, helpListAdd, helpListClear, helpListPageIndexUpdate, helpTotalCountUpdate } = this.props;
    const { dataSource, refreshing, isLoading, isHaveMore } = this.state;
    if (!isInit && isRefreshing && (refreshing || isLoading)) {
      return;
    }
    if (!isInit && !isRefreshing && (refreshing || isLoading || !isHaveMore)) {
      return;
    }
    this.setState({
      refreshing: !isInit && isRefreshing,
      isLoading: !isInit && !isRefreshing
    });
    if (isInit || isRefreshing) {
      helpListPageIndexUpdate(1);
    } else {
      helpListPageIndexUpdate(this.props.helpListPageIndex + 1);
    }
    const { helpList, helpListPageIndex, helpTotalCount } = this.props;
    if (isInit && helpList.length > 0) {
      this.setState({
        dataGeted: true,
        dataSource: dataSource.cloneWithRows(helpList),
        isHaveMore: helpList.length < helpTotalCount
      });
      return;
    }
    if (ISMOCKDATA) {
      this.mockData(pageSize, helpListPageIndex);
    } else {
      axios.get('/api' + API_GETHELP, {
        params: {
          appName: appName,
          typeId: match.params.typeId,
          pageSize: pageSize,
          pageIndex: helpListPageIndex
        }
      })
        .then((response) => {
          const res = (typeof response === 'string') ? JSON.parse(response).data : response.data;
          if (Number(res.code) === 0) {
            const dataPage = res.data || [];
            const totalCount = res.totalCount !== undefined && res.totalCount !== null ? res.totalCount : 0;
            if (!isInit && isRefreshing) {
              helpListClear();
            }
            helpListAdd(dataPage);
            helpTotalCountUpdate(totalCount);
            const { helpList, helpTotalCount } = this.props;
            this.setState({
              dataGeted: true,
              dataSource: dataSource.cloneWithRows(helpList),
              refreshing: false,
              isLoading: false,
              isHaveMore: helpList.length < helpTotalCount
            });
          } else {
            this.setState({
              dataGeted: true,
              refreshing: false,
              isLoading: false
            });
            this.showToast(res.message || '');
          }
        })
        .catch((error) => {
          console.log('getHelp:', error);
          this.setState({
            dataGeted: true,
            refreshing: false,
            isLoading: false
          });
          this.showToast('系统繁忙，请稍后再试');
        });
    }
  }

  mockData (pageSize = 20, pageIndex = 1) {
    this.t = setTimeout(() => {
      const { helpListAdd, helpListClear } = this.props;
      const { dataSource } = this.state;
      const dataPage = getMockData(pageSize, pageIndex);
      if (pageIndex === 1) {
        helpListClear();
      }
      helpListAdd(dataPage);
      if (pageIndex === 1) {
        helpTotalCountUpdate(200);
      }
      const { helpList, helpTotalCount } = this.props;
      this.setState({
        dataGeted: true,
        dataSource: dataSource.cloneWithRows(helpList),
        refreshing: false,
        isLoading: false,
        isHaveMore: helpList.length < helpTotalCount
      });
    }, 500);
  }

  goDetailHandle (item, event) {
    const { helpListScrollTopUpdate, currHelpTitleUpdate, history } = this.props;
    helpListScrollTopUpdate(this.scrollTop);
    currHelpTitleUpdate(item.helpTitle);
    history.push('/ssr/detail/' + item.helpId);
  };

  render() {
    const renderDefault = () => {
      const total = 3;
      let i = 0;
      let items = [];
      for (i = 0; i < total; i++) {
        items.push(<div key={i} className="list-default-item"></div>);
      }
      return items;
    };
    const renderRow = (rowData, sectionID, rowID) => {
      return (
        <div key={rowID} onClick={this.goDetailHandle.bind(this, rowData)} className="list-item" style={{width: document.documentElement.clientWidth}}>
          <h4 className="list-item-title">{`${Number(rowID) + 1}、${rowData.helpTitle}`}</h4>
          <span className="list-item-icon icon-return-1"></span>
        </div>
      );
    }
    const renderFooter = () => {
      const { pageSize, helpTotalCount } = this.props;
      const { dataGeted, isHaveMore, isScrolled } = this.state;
      const isHide = !isScrolled && helpTotalCount < pageSize;
      return (
        dataGeted && !isHide && <ListViewFooter isHaveMore={isHaveMore}/>
      );
    }
    const { headerTitleDefault, pageSize, helpList, currTypeName } = this.props;
    const { dataGeted, dataSource, refreshing, toastShow, toastMessage } = this.state;
    
    return (
      <div className="main">
        <Header {...this.props} title={currTypeName !== '' ? currTypeName : headerTitleDefault} titleIsBlueColor={false} isBack={true}></Header>
        <section className="bottom help">
          {dataGeted && helpList.length === 0 && <ListViewNoData/>}
          {dataGeted && helpList.length > 0 && <ListView
            ref={el => this.lv = el}
            style={{
              width: '100%',
              overflowX: 'hidden',
              overflowY: 'auto'
            }}
            dataSource={dataSource}
            renderBodyComponent={() => <ListViewBody/>}
            renderRow={renderRow}
            renderFooter={renderFooter}
            pullToRefresh={<PullToRefresh
              distanceToRefresh={window.devicePixelRatio * 25}
              refreshing={refreshing}
              indicator={{activate: <ListViewIndicator message="松开刷新"/>,
                deactivate: <ListViewIndicator message="下拉刷新" loadingShow={false}/>,
                release: <ListViewIndicator message="刷新中..." isLoading={true}/>,
                finish: <ListViewIndicator message="完成刷新" logoShow={false}/>}}
              onRefresh={this.onRefresh}
            />}
            initialListSize={helpList.length > 0 ? helpList.length : pageSize}
            pageSize={pageSize}
            onScroll={this.onScroll}
            // scrollRenderAheadDistance={500}
            onEndReachedThreshold={10}
            onEndReached={this.onEndReached}
          />}
        </section>
        <Toast show={toastShow} message={toastMessage}/>
        <Loading show={!dataGeted}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps-help', state);
  return {
    headerTitleDefault: state.headerTitleDefault,
    appName: state.appName,
    pageSize: state.pageSize,
    code: state.code,
    message: state.message,
    helpList: state.helpList,
    helpTotalCount: state.helpTotalCount,
    helpListPageIndex: state.helpListPageIndex,
    helpListScrollTop: state.helpListScrollTop,
    currTypeName: state.currTypeName
  };
};

export default connect(mapStateToProps, {
  helpListAdd,
  helpListClear,
  helpTotalCountUpdate,
  helpListPageIndexUpdate,
  helpListScrollTopUpdate,
  currHelpTitleUpdate
})(Help);
