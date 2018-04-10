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

const CheckboxItem = Checkbox.AgreeItem

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

class Vote extends Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	componentDidMount() {

	}

	render() {


		return (
			<div className="main-vote-wrap">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="投票"/>
				<div className="header-content">
					<p className='title'>投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容投票题目内</p>
					<p className='desc'>补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述补充描述</p>
				</div>
				{voteInfo && voteInfo.map( val => {
					return (
						<div className="body-content">
							<div className="select-row-title">投票选项{val.type === 1 ? '（单选）' : '（单选）'}</div>
							{val.list.map( (val_1,index) => {
								let classN = 'option' + (index===val.list.length-1 ? ' last':'');

								if(index===0){
									classN += ' active';
								}

								return (
									<div className={classN}>
										<div className="left">
											{val_1.img && <img className="img" src={val_1.img} alt=""/>}
											<p className="title">{val_1.title}</p>
											{val_1.img && (
												<div className="note">
													<span>摘要</span>
													<span>介绍</span>
													<span>更多</span>
												</div>
											)}
										</div>
										<div className="right">
											<CheckboxItem style={{ marginTop: -20 }}/>
										</div>
									</div>
								)
							} )}
						</div>
					)
				} )}

				<WingBlank style={{padding:'30px 0'}}><Button type="primary" style={{ background: '#1AAD19' }}>投票</Button></WingBlank>
			</div>

		);
	}
}

export default Vote
