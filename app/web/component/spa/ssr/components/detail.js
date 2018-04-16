import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import Button from 'component/button/button';
import Good from 'component/good/good';
import Toast from 'component/toast/toast';
import Loading from 'component/loading/loading';
import { createHtml } from 'component/spa/ssr/util/formatWebContent';
import { isSupportWebp } from 'component/spa/ssr/util/pub';

import '../../../../../service/api';
import '../util/goodsogoodapi';

const getMockData = () => {
  return '1、可能是系统出现故障导致软件闪退，建议将系统重刷还原一下。或者是软件与系统不兼容造成，把更新软件或者系统更新到与软件兼容为止。软件出现故障导致的，把删除掉然后重新安装一遍试试。还有可能是因为在闪退软件因为从第三方平台以外的平台上面下载软件导致的，建议直接在官方的应用商店里面直接下载安装正版软件。1、可能是系统出现故障导致软件闪退，建议将系统重刷还原一下。或者是软件与系统不兼容造成，把更新软件或者系统更新到与软件兼容为止。软件出现故障导致的，把删除掉然后重新安装一遍试试。还有可能是因为在闪退软件因为从第三方平台以外的平台上面下载软件导致的，建议直接在官方的应用商店里面直接下载安装正版软件。1、可能是系统出现故障导致软件闪退，建议将系统重刷还原一下。或者是软件与系统不兼容造成，把更新软件或者系统更新到与软件兼容为止。软件出现故障导致的，把删除掉然后重新安装一遍试试。还有可能是因为在闪退软件因为从第三方平台以外的平台上面下载软件导致的，建议直接在官方的应用商店里面直接下载安装正版软件。';
}

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataGeted: false,
      helpTitle: '',
      helpText: '',
      postShow: false,
      feedbackText: '',
      postInput: false,
      isGood: false,
      goodShow: false,
      toastShow: false,
      toastMessage: ''
    };
    this.userId = null;
    this.t = null;
    this.goPost = this.goPostHandle.bind(this);
    this.good = this.goodHandle.bind(this);
    this.hidePost = this.hidePostHandle.bind(this);
    this.post = this.postHandle.bind(this);
    this.input = this.inputHandle.bind(this);
    this.inputFocus = this.inputFocusHandle.bind(this);
    this.inputBlur = this.inputBlurHandle.bind(this);
  }

  componentWillMount() {
    hostSdk.init(() => {
      hostSdk.getUserInfo((res) => {
        if (Number(res.code) === 0) {
          this.userId = res.data && res.data.userId;
        }
      });
    });
    if (ISMOCKDATA) {
      this.mockData();
    } else {
      const { match } = this.props;
      axios.get('/api' + API_GETHELPDETAIL, {
        params: {
          helpId: match.params.helpId
        }
      })
        .then((response) => {
          const res = (typeof response === 'string') ? JSON.parse(response).data : response.data;
          if (Number(res.code) === 0) {
            const data = res.data || {};
            this.setState({
              dataGeted: true,
              helpTitle: data.helpTitle || '',
              helpText: data.helpText || ''
            });
          } else {
            this.setState({
              dataGeted: true
            });
            this.showToast(res.message || '');
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            dataGeted: true
          });
          this.showToast('系统繁忙，请稍后再试');
        });
    }
  }

  componentDidMount() {
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

  mockData () {
    this.t = setTimeout(() => {
      const helpText = getMockData();
      this.setState({
        dataGeted: true,
        helpText: helpText
      });
    }, 500);
  }

  goPostHandle() {
    const { goodShow } = this.state;
    if (goodShow) {
      return;
    }
    this.setState({
      postShow: true
    });
  }

  goodHandle() {
    const { goodShow } = this.state;
    if (goodShow) {
      return;
    }
    if (ISMOCKDATA) {
      this.showGood();
      return;
    }
    if (!this.userId) {
      this.showToast('获取用户信息失败');
      return;
    }
    const { match, csrfToken } = this.props;
    axios.post('/api' + API_GETHELPUSED, {
      helpId: match.params.helpId,
      openId: this.userId
    },{
      headers: {
        'x-csrf-token': csrfToken
      }
    })
      .then((response) => {
        const res = (typeof response === 'string') ? JSON.parse(response).data : response.data;
        if (Number(res.code) === 0) {
          this.showGood();
        } else {
          this.showToast(res.message || '');
        }
      })
      .catch((error) => {
        console.log(error);
        this.showToast('系统繁忙，请稍后再试');
      });
  }

  showGood() {
    this.setState({
      isGood: true,
      goodShow: true
    }, () => {
      this.t = setTimeout(() => {
        this.setState({
          goodShow: false
        });
      }, 2000);
    });
  }

  hidePostHandle() {
    this.setState({
      postShow: false
    });
  }

  postHandle() {
    const { feedbackText } = this.state;
    if (feedbackText === '') {
      return;
    }
    if (ISMOCKDATA) {
      this.postSuccess();
      return;
    }
    if (!this.userId) {
      this.showToast('获取用户信息失败');
      return;
    }
    const { match, csrfToken } = this.props;
    const { helpTitle } = this.state;
    axios.post('/api' + API_GETHELPFEEDBACK, {
      helpId: match.params.helpId,
      helpTitle: encodeURI(helpTitle),
      openId: this.userId,
      feedbackText: encodeURI(feedbackText)
    },{
      headers: {
        'x-csrf-token': csrfToken
      }
    })
      .then((response) => {
        const res = (typeof response === 'string') ? JSON.parse(response).data : response.data;
        if (Number(res.code) === 0) {
          this.postSuccess();
        } else {
          this.showToast(res.message || '');
        }
      })
      .catch((error) => {
        console.log(error);
        this.showToast('系统繁忙，请稍后再试');
      });
  }

  postSuccess() {
    this.hidePostHandle();
    this.inputBlurHandle();
    this.setState({
      feedbackText: ''
    });
    this.showToast('反馈成功');
  }

  inputHandle(event) {
    this.setState({
      feedbackText: event.target.value.trim()
    });
  }

  inputFocusHandle() {
    this.setState({
      postInput: true
    });
  }

  inputBlurHandle() {
    this.setState({
      postInput: false
    });
  }

  render() {
    const { headerTitleDefault, currHelpTitle } = this.props;
    const { dataGeted, helpText, postShow, feedbackText, postInput, isGood, goodShow, toastShow, toastMessage } = this.state;

    return <div className="main">
      <Header {...this.props} title={currHelpTitle !== '' ? currHelpTitle : headerTitleDefault} titleIsBlueColor={false} isBack={true} isClose={postShow} close={this.hidePost}></Header>
      <div className="bottom detail">
        <h2 className="detail-title">{currHelpTitle}</h2>
        <section className="detail-bar">
          <Button text="没用" icon="icon-like" iconRotate={true} click={this.goPost}></Button>
          <Button text="有用" icon={isGood ? 'icon-like-red' : 'icon-like'} buttonClass={isGood ? 'button-red' : ''} click={this.good}></Button>
        </section>
        <div className="detail-content" dangerouslySetInnerHTML={createHtml(helpText, isSupportWebp())}></div>
        <section className={`detail-post${postShow ? ' detail-post-show' : ''}`}>
          <div className={`detail-post-hide-area${postInput ? ' detail-post-hide-area-input' : ''}`} onClick={this.hidePost}></div>
          <div className={`detail-post-container${postInput ? ' detail-post-container-input' : ''}`}>
            <div className={`detail-post-container-bar${postShow ? ' fade-in' : ''}`}>
              <Button text="提交" buttonClass={feedbackText !== '' ? 'button-blue' : ''} click={this.post}></Button>
            </div>
            {/* todo: react监听键盘弹出收
            起问题 */}
            <div className={`detail-post-container-area${postShow ? ' fade-in' : ''}`}>
              <textarea onInput={this.input} onFocus={this.inputFocus} onBlur={this.inputBlur} placeholder="请告诉我们您的困惑，我们会更新帮助说明。" value={feedbackText} className="detail-post-container-textarea"></textarea>
            </div>
          </div>
        </section>
      </div>
      <Good key="goodexample" show={goodShow}></Good>
      <Toast show={toastShow} message={toastMessage}/>
      <Loading show={!dataGeted}/>
    </div>;
  }
}

const mapStateToProps = state => {
  console.log('mapStateToProps-detail', state);
  return {
    headerTitleDefault: state.headerTitleDefault,
    currHelpTitle: state.currHelpTitle,
    csrfToken: state.csrfToken
  };
};

export default connect(mapStateToProps, {})(Detail);
