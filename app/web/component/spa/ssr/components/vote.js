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
const CheckboxItem = Checkbox.AgreeItem

class Vote extends Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	componentDidMount() {

	}
	componentWillMount(){
				this.state.voteInfo  = [ {
					// 1单 2多
					type: 1,
					list: [ {
						img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
						title: '1.投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容',
						isActive:false
					}, {
						img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
						title: '2.我不是内容哦你个',
						isActive:false
					} ]
				}, {
					// 1单 2多
					type: 2,
					list: [ {
						title: '1.投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容',
						isActive:false
					}, {
						title: '2.我不是内容哦你个2222222222',
						isActive:false
					} ]
				} ]
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

	render() {
		let {voteInfo} = this.state;
		return (
			<div className="main-vote-wrap">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="投票"/>
				<div className="header-content">
					<p className='title'>投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容投票题目内</p>
					<p className='desc'>补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述</p>
				</div>
				<RadioMultiSelect 
				voteInfo = {voteInfo}
				checkBoxChange={this.checkBoxChange.bind(this)} />
				<WingBlank style={{padding:'30px 0'}}><Button type="primary" style={{ background: '#1AAD19' }}>投票</Button></WingBlank>
			</div>

		);
	}
}

export default Vote
