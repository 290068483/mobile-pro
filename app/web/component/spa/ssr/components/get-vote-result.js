import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import {
	WingBlank
} from 'antd-mobile';


const loadingVoteImg = require( 'asset/images/loading-vote.png' ),
	warningImg = require( 'asset/images/warnning.png' );


class GetVoteResult extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			isShowLogin:true
		};
	}

	componentDidMount() {
		setTimeout(()=>{
			this.setState({isShowLogin:false})
		},3000)
	}

	render() {


		return (
			<div className="get-vote-result">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="个人信息"/>
				<div className="content">
					{this.state.isShowLogin ? (
						<div className="loading-vote">
							<img src={loadingVoteImg} alt=""/>
							<p>出票中请稍后...</p>
						</div>
					) : (
						<div className="result">
							<div className="top-icon">
								<img src={warningImg} alt=""/>
								<p>出票失败！</p>
							</div>
							<div className="desc">
								<p>由于活动系统未知原因，出票失败。点券已退还到您的账户中。您可以尝试重新报名购票。</p>
							</div>
							<WingBlank>
								<div className="button">我知道了</div>
							</WingBlank>
						</div>
					)}
				</div>
			</div>

		);
	}
}

export default GetVoteResult;
