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
    WingBlank,
    Row,
    Col 
} from 'antd-mobile';

const CheckboxItem = Checkbox.AgreeItem

const voteInfo = [ {
		img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
        title: '1.投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容',
        isActive:0
	}, {
		img: 'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
        title: '2.我不是内容哦你个',
        isActive:0
	},{
        title: '1.投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容',
        isActive:0
	}, {
        title: '2.我不是内容哦你个2222222222',
        isActive:0
	} ]

class OneKeyVote extends Component {
	constructor( props ) {
		super( props );
		this.state = {
			voteInfo:voteInfo
		};
	}

	componentDidMount() {
        
	}

	handleDoVote(index,event){
		console.log(index);
		console.log(voteInfo);

		let voteInfo = this.state.voteInfo;
		voteInfo[index].isActive = 1;
		this.setState({
			voteInfo
		  });
	}

	
	

	render() {
		return (
			<div className="main-vote-wrap one-key-vote-wrap">
				<Header titleIsBlueColor={false} isBack={true} back={() => this.props.history.goBack()} title="一键投票"/>
				<section>
				<div className="header-content">
					<p className='title'>投票题目内容投票题目内容投票题目内容投票题目内容投票题目内容投票题目内</p>
				</div>
				</section>
				<div className="body-content">
                <div className="select-row-title">投票选项</div>
				{this.state.voteInfo && this.state.voteInfo.map( (val,index) => {
					let classN = 'option' + (index===voteInfo.length-1 ? ' last':'');
					return (
									<div className={classN}  key={index} data-index={index}>
										<div className="left">
											{val.img && <img className="img" src={val.img} alt=""/>}
											<p className="title">{val.title}</p>
												<div className="note">
													<span>摘要</span>
													<span>介绍</span>
													<span>更多</span>
												</div>
                                                <div>
                                                <Button  onClick={(event)=>{this.handleDoVote(index,event)}} type="primary"  style={{color: !val.isActive ? '#1AAD19':'#fff',background: !val.isActive ? '#fff':'#1AAD19'}}>
												{!val.isActive ?'投票':'投票+1'}
												</Button>
                                                </div>
										</div>
									</div>
					)
				} )}
				</div>

				<WingBlank style={{padding:'0',margin:'0'}}><Button type="primary" style={{ background: '#1AAD19' }}>提交</Button></WingBlank>
			</div>

		);
	}
}

export default OneKeyVote
