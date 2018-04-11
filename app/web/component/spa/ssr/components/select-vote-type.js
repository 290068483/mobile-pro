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
	Carousel,
	WingBlank,
	Icon
} from 'antd-mobile';


const list = [ {
	name: '我是票名',
	isReview: true,
	desc: '我说几遍我是说明文件',
	price: 200,
	isEnd: false,
	active:true
}, {
	name: '我是票名222',
	isReview: true,
	desc: '我说几遍我是说明文件',
	price: 0,
	isEnd: false
},{
	name: '我是票名222',
	isReview: false,
	desc: '我说几遍我是说明文件',
	price: 300,
	isEnd: false
},{
	name: '我是票名222',
	isReview: true,
	desc: '我说几遍我是说明文件',
	price: 300,
	isEnd: false
}, {
	name: '我是票名333',
	isReview: true,
	desc: '我说几遍我是说明文件',
	price: 500,
	isEnd: false
}, {
	name: '我是票名444',
	isReview: true,
	price: 0,
	desc: '我说几遍我是说明文件',
	isEnd: true
} ];

class SelectVoteType extends Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	componentDidMount() {

	}

	render() {


		return (
			<div className="select-vote-type">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="报名活动"/>

				<ul className="type-list">
					{list && list.map( (val,index) => {
						let csn = val.active? 'active':'';
						if(val.isEnd){
							csn += ' ended';
						}

						return (
							<li key={index} className={csn}>
								<div className="left">
									<p className="title">
										<span>{val.name}</span>
										{val.isReview && <span className="review">审</span>}

									</p>
									{val.price > 0 ? (
										<p className="dq">
											{val.price}
											<span>点券</span>
										</p>
									) : (<p className="mf">免费</p>)}
									<p className="desc">
										说明：{val.desc}
									</p>
								</div>
								{val.price > 0 && (
									<div className="right">
										进行中
									</div>
								)}
								<span className="current-select">
									<Icon type="check" style={{color:'#fff'}} size="xs"/>
								</span>
								<span className="top-radius"></span>
								<span className="bottom-radius"></span>
							</li>
						)
					} )}
				</ul>

				<div className="buttons" onClick={()=>{
					this.props.history.push('input-persion-info');
				}}>确认报名</div>
			</div>

		);
	}
}

export default SelectVoteType
