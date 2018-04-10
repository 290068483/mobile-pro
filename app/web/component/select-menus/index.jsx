import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile'
import './index.less';

const menus = [ {
	name: '活动地区'
}, {
	name: '主办单位'
}, {
	name: '分类'
} ];

const cateA = ['分类1','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9']
const cateB = ['分类1','分类2','分类3','分类4','分类5','分类6','分类7','分类8','分类9']
export default class SelectMenus extends Component {
	constructor( props ) {
		super( props );

		this.state = {
			showType: '活动地区'
		}
	}
	onSelectCate(e){
		let classN = e.target.className.split(' ');

		if(classN.indexOf('active')>-1){
			e.target.className = 'checkbox';
		}else{
			e.target.className = 'checkbox active'
		}
	}
	renderContent() {
		if ( !this.props.isShowList ) return null;
		console.log( this.state.showType )
		switch ( this.state.showType ) {
			case '活动地区':
				return (
					<div className='select-content'>
						<div className='s-header'>
							<span className='select'>请选择</span>
							<span className='button'>确定</span>
						</div>
						<ul className='list'>
							<li>全部</li>
							<li>半价</li>
							<li>上海</li>
							<li>添加</li>
							<li>重庆</li>
							<li>山东</li>
							<li>广东</li>
							<li>全部</li>
							<li>半价</li>
							<li>上海</li>
							<li>添加</li>
							<li>重庆</li>
							<li>山东</li>
							<li>广东</li>
							<li>全部</li>
							<li>半价</li>
							<li>上海</li>
							<li>添加</li>
							<li>重庆</li>
							<li>山东</li>
							<li>广东</li>
						</ul>
					</div>
				);

			case '主办单位':
				return (
					<div className='select-content'>
						<div className='s-header'>
							<input className="search-input" type="text" placeholder="请输入单位名称"/>
							<span className='text-button'>取消</span>
						</div>
						<ul className='list hr'>
							<li>重庆妇联</li>
							<li>重庆妇联</li>
							<li>重庆妇联</li>
							<li>重庆妇联</li>
							<li>重庆妇联</li>
							<li>重庆妇联</li>
							<li>重庆妇联</li>
							<li>重庆妇联</li>
							<li>半价</li>
							<li>广东</li>
						</ul>
					</div>
				);
			case '分类':
				return (
					<div className='select-content'>
						<div className='s-header'>
							<span></span>
							<span className='button'>确定</span>
						</div>
						<div className='checks-content'>
							<div className='checkbox'>全部</div>
							<p className='title'>分类1</p>
							<dl className='check-list'>
								{cateA && cateA.map(val=>{
									return <dd onClick={(e)=>this.onSelectCate(e)} key={val} className='checkbox'>{val}</dd>
								})}
							</dl>
							<p className='title'>分类221</p>
							<dl className='check-list'>
								{cateA && cateB.map(val=>{
									return <dd onClick={(e)=>this.onSelectCate(e)} key={val} className='checkbox'>{val}</dd>
								})}
							</dl>
						</div>
					</div>
				);

			default :
				return null;
		}

	}

	onClose() {
		this.props.onClose();
	}

	showSelectList( val ) {

		this.setState( { showType: val.name } );
		this.props.showSelectList( val );
	}

	render() {
		return (
			<div className='select-menus'>
				<ul className='buttons'>
					{menus && menus.map( val => {
						return (
							<li key={val.name} className='but' onClick={() => this.showSelectList( val )}>
								<span>{val.name}</span>
								<span className='arrow'/>
							</li>
						)
					} )}
					<li className='search'>
						<Icon type='search' size='md'/>
					</li>
				</ul>
				{this.props.isShowList && <div className='mask' onClick={() => this.onClose()}></div>}
				{this.renderContent()}
			</div>
		)
	}
}
