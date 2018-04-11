import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import Toast from 'component/toast/toast';
import Loading from 'component/loading/loading';
import SelectMenus from 'component/select-menus';
import {
	WingBlank,
	List
} from 'antd-mobile';

const Item = List.Item;

class SureActivityInfo extends Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	componentDidMount() {

	}

	render() {
		return (
			<div className="sure-activity-info">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="确认信息"/>
				<div className="banner"></div>
				<div className="top-title">
					<p className="title">我是一个活动主标题我是一个活动主标题我是一个活动主标题</p>
					<p className="price">200点券<span>/张</span></p>
				</div>
				<List className="my-list">
					<Item arrow="horizontal" >
						<span className="left-name">报名信息</span>
					</Item>
				</List>

				<div className="desc-info">
					<p className="buy-title">购买须知</p>
					<p className="info">1、通过c币购买的票不支持退款，请谨慎购买。</p>
				</div>

				<div className="buttons">
					<div className="share">共计：0点券</div>
					<div className="but green" onClick={()=>{
						this.props.history.push('select-vote-type');
					}}>报名</div>
				</div>

			</div>

		);
	}
}

export default SureActivityInfo
