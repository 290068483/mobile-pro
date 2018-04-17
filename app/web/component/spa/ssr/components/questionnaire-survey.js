import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import Toast from 'component/toast/toast';
import Loading from 'component/loading/loading';
import SelectMenus from 'component/select-menus';
import {
	Checkbox,
	Button,
	WingBlank
} from 'antd-mobile';


import RadioMultiSelect from 'component/radio-multi-select/radio-multi-select'
const CheckboxItem = Checkbox.AgreeItem,
	  sessionKey = 'QuestionnaireSurvey';

class QuestionnaireSurvey extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			//activityId //titleId
		};
	}

	componentDidMount() {
		
	}
	componentWillMount(){
				this.state.voteInfo  = [ {
					// 1单 2多
					type: 1,
					list: [ {
						img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
						title: '1.问卷调查题目内容问卷调查题目内容问卷调查题目内容问卷调查题目内容问卷调查题目内容',
						isActive:false
					}, {
						img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
						title: '2.我不是内容哦你个',
						isActive:false
					},
					{
						img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
						title: '2.我不是内容哦你个',
						isActive:false
					},
					{
						img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
						title: '2.我不是内容哦你个',
						isActive:false
					} ]
				}];
				this.state.titles = 10;//从后台取
				this.state.titleId = this.props.match.params.titleId;
				const {titles,titleId} = this.state,first ='1';
				if(titleId == '' ||isNaN(Number(titleId))||titleId == 0){
					this.props.history.push(first);
						this.setState({
							titleId:first
						})
				}
				
	}
	goNextQuestion(){
		console.log('goNextQuestion');
		let titleId = this.state.titleId;
		if(++titleId > this.state.titles){
				return;
		}
		this.setState({
           titleId
          })
		this.props.history.push((titleId).toString());
	}

	checkBoxChange(index_p,index_c){
		let {voteInfo} = this.state, parentObj = voteInfo[index_p],parentList = parentObj['list'],type = parentObj['type'];

		console.log('当前type',parentObj['type'])
		if(type== 1){
			parentList.forEach((el)=>{
					el.isActive = false;
			});
		}
		parentList[index_c].isActive =  type == 1 ? true:!parentList[index_c].isActive;
		this.setState({
			voteInfo
		  });
		console.log('index_childdddd',index_c,'index_ppppp',index_p);
	}

	goBack(){
		let titleId = this.state.titleId;
		if(--titleId < 1){
			this.props.history.goBack();
			return;
	     }
		this.setState({
			titleId
		   });
		this.props.history.goBack();
	}

	componentWillUnmount(){
		console.log('----componentWillUnmount----')
	 }

	render() {
		let {voteInfo,titles,titleId} = this.state;
		return (
			<div className="main-activity-wrap ">
				<Header titleIsBlueColor={false} isBack={true} back={() =>this.goBack()} title="问卷调查"/>
				<div className="header-content">
					<p className="font-hCenter">第{titleId}题/{titles}题</p>
					<p className='title'>问卷调查题目内容问卷调查题目内容问卷调查题目内容问卷调查题目内容问卷调查题目内容问卷调查题目内</p>
				</div>
				<RadioMultiSelect 
				voteInfo = {voteInfo} type="questionnaireSurvey"
				checkBoxChange={this.checkBoxChange.bind(this)} />
				<WingBlank  className="button-full-reset">
				<Button onClick={this.goNextQuestion.bind(this)}
					type="primary" style={{ background: '#1AAD19' }}>
				{ titleId >= titles ? '已完成':'下一题'}</Button></WingBlank>
			</div>
		);
	}
}

export default QuestionnaireSurvey
