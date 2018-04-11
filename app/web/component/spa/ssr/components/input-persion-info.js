import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import Toast from 'component/toast/toast';
import Loading from 'component/loading/loading';
import SelectMenus from 'component/select-menus';
import {
	WingBlank,
	Icon,
	InputItem
} from 'antd-mobile';


class InputPersionInfo extends Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	componentDidMount() {

	}

	render() {


		return (
			<div className="input-persion-info">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="个人信息"/>
				<div className="content">
					<InputItem clear placeholder="请输入姓名">
						<span className="l-text">姓名</span>
					</InputItem>
					<InputItem clear placeholder="请输入电话号码">
						<span className="l-text">电话</span>
					</InputItem>
					<InputItem clear placeholder="请输入身份证号码">
						<span className="l-text">身份证</span>
					</InputItem>

					<WingBlank>
						<div  onClick={()=>{
							this.props.history.push('sure-activity-info');
						}} className="button">下一步</div>
					</WingBlank>
				</div>
			</div>

		);
	}
}

export default InputPersionInfo
