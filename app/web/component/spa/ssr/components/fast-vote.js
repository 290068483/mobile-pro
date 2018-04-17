import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import {
	Checkbox,
	Button,
	WingBlank
} from 'antd-mobile';


const voteInfo = [ {
	// 1单 2多
	type: 1,
	list: [ {
		img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
		title: '1.投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容'
	}, {
		img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
		title: '2.我不是内容哦你个'
	} ]
}, {
	// 1单 2多
	type: 2,
	list: [ {
		title: '1.投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容'
	}, {
		title: '2.我不是内容哦你个2222222222'
	} ]
} ];

class FastVote extends Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	componentDidMount() {

	}

	render() {


		return (
			<div className="main-activity-wrap">
				一键投票
			</div>

		);
	}
}

export default FastVote
