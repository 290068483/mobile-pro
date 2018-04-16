import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon,Button } from 'antd-mobile'
import './index.less';

export default class ActivityStatus extends Component {
	constructor( props ) {
		super( props );
	}
	onClose() {
		this.props.onClose();
	}
	
	showSelectList( val ) {
		this.setState( { showType: val.name } );
		this.props.showSelectList( val );
	}

	IconContent(){
		if(this.props.status){
			//success
			return <Icon type='check-circle' size='lg'color="#1AAD19" /> 
		}else{
			return <Icon type='exclamation-circle' size='lg' color="#FE393C" />
		}
	}
	
	render() {
		const  {status,statusTips,statusText,statusButtons} = this.props;
		return (
			<div className='activity-status'>
			<section>
				{this.IconContent()}
			 <p> {statusTips}</p>
			</section>
			<section>
				<div className="test-wrapper">
			 	{
					 statusText.map((el,k)=>{
						return <div  key={k} style={el.style}>{el.text}</div>
					 })
				 }
				 </div>
			</section>

			<section>
			 	{
					 statusButtons.map((el,k)=>{
						return <Button key={k}
						onClick={el.func} style={el.style}>{el.text}</Button>
					 })
				 }
			</section>
			</div>
		)
	}
}



//   ActivityStatus.defaultProps = {
// 	text: '',
// 	buttonClass: '',
// 	icon: '',
// 	iconRotate: false
//   };
ActivityStatus.propTypes = {
	//活动状态
	status:PropTypes.bool,
	//活动状态对应的文案
	statusTips:PropTypes.string,
	//提示成功失败之后的文案
	statusText:PropTypes.array,
	//组装按钮数组
	statusButtons:PropTypes.array
}
