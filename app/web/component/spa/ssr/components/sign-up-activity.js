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

class SignUpActivity extends Component {
	constructor( props ) {
		super( props );

		this.state = {};
	}

	componentDidMount() {

	}

	render() {


		return (
			<div className="sign-up-activity">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="报名活动"/>
				<Carousel
					autoplay={true}
					autoplayInterval={5000}
					infinite
					selectedIndex={1}
					beforeChange={( from, to ) => console.log( `slide from ${from} to ${to}` )}
					afterChange={index => console.log( 'slide to', index )}
					dotStyle={{ background: 'rgba(255,255,255,.3)' }}
					dotActiveStyle={{ background: '#fff' }}
				>
					{[ 'AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI' ].map( val => (
						<img
							src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
							key={val}
							style={{ width: '100%', height: '8rem', verticalAlign: 'top' }}
							onLoad={() => {
								// fire window resize event to change height
								window.dispatchEvent( new Event( 'resize' ) );
								this.setState( { imgHeight: 'auto' } );
							}}
						/>
					) )}
				</Carousel>

				<div className="title-header">
					<p className="title">我是一个活动主标题我是一个活动主标题我是一个活动主标题</p>
					<div className="times">
						<p className="left center">
							<Icon style={{color:'#666666'}} type="check"/>
							<span>2019/03/01-2018/03/13</span>
						</p>
						<p className="right">0-200点券</p>
					</div>
					<p className="word center">
						<Icon style={{color:'#666666'}}  type="check"/>
						<span>重庆总工会</span>
					</p>
					<p className="address center">
						<Icon style={{color:'#666666'}}  type="check"/>
						<span>重庆南岸区</span>
					</p>
				</div>

				<div className="title-line">详情</div>

				<div className="content"></div>

				<div className="buttons">
					<div className="share">
						<Icon style={{color:'#666666'}}  type="check"/>
						<span>分享</span>
					</div>
					{/*三种颜色  绿色  green    黄色  yellow    灰色gray*/}
					<div className="but green" onClick={()=>{
						this.props.history.push('select-vote-type');
					}}>立即报名</div>
				</div>
			</div>

		);
	}
}

export default SignUpActivity
