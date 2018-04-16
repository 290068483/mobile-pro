import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import ActivityStatus from 'component/activity-status'
import {
	Checkbox,
	Button,
    WingBlank,
    Row,
    Col
} from 'antd-mobile';


import Alert from 'component/alert/alert';

class ActivitySucess extends Component {
	constructor( props ) {
        super( props );
		this.state = {
            alertShow:false
        };
	}

	componentDidMount() {
        
    }

    checkResult(){
        console.log('查看结果');
        this.props.history.replace('/ssr');
    }

    showAlert (message) {
        const { alertShow } = this.state;
        if (alertShow) {
          this.closeTimeout();
        }
        this.setState({
            alertShow:true,
            toastMessage:message
        })
      }

      componentWillMount() {
        //this.showAlert('啦啦啦啦' || '');
      }
      confirmHandle(){
          this.setState({
            alertShow:false
          })
      }


	render() {
        const {match} = this.props,
              {params} = match,
              {typeId} = params,
              {alertShow,toastMessage} = this.state,
         TypeMaps = {
            1:{
                title:'投票成功'
            },
            2:{
                title:'提交成功'//问卷调查提交
            },
            3:{
                title:'提交成功' //有奖问答
            }
        },statusText = [
                {text:'恭喜你获得',style:{color:'#999999'}},
                {text:'10积分/10点券',style:{color:'#000'}},
                {text:'获得奖品可到"我的奖品"查看',style:{color:'#999999'}}
            ],
            statusButtons = [
                {text:'查看投票结果',func:this.checkResult.bind(this),style:{background: '#1AAD19',color:'#fff' }},
                {text:'返回活动首页',func:this.checkResult.bind(this),style:{ background: '#FFFFFF',color:'#1AAD19' }},
                {text:'谢谢参与',func:this.checkResult.bind(this),style:{ background: '#FFFFFF',color:'#1AAD19' }}
            ];

		return (
			<div className="main-status-wrapper">
              <Alert 
              confirmHandle = {this.confirmHandle.bind(this)}
              show={alertShow} message={toastMessage} style={{backgroundColor:'#1AAD19',color:'#fff'}}/>
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="投票成功"/>
                {/* todo 这里需要换成变量 */}
				<div className="header-content">
					
				</div>
                <section className="body-content">
                <ActivityStatus status={false} statusTips={'投票成功'}
                statusText = {statusText} statusButtons = {statusButtons} />
                </section>
			</div>

		);
	}
}

export default ActivitySucess
