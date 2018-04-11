import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Header from 'component/header/header';
import Toast from 'component/toast/toast';
import Loading from 'component/loading/loading';
import SelectMenus from 'component/select-menus';
import {
	PullToRefresh,
	Carousel,
	ListView
} from 'antd-mobile';


const getMockData = ( pageSize = 20, pageIndex = 1 ) => {
	const data = [];
	if ( pageIndex > 10 ) {
		return data;
	}
	let i = 0;
	for ( i = 0; i < pageSize; i++ ) {
		const id = (pageIndex - 1) * pageSize + i + 1;
		data.push( pageIndex === 1 && i === 0 ? {
			typeId: id,
			typeName: '常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题常见问题',
			typeImage: '',
			desc:'北京朝阳',
			time:'2018/03/08-2018/04/08',
			price:'5.00',
			tags:'标签2'
		} : {
			typeId: id,
			typeName: '京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营',
			typeImage: 'http://5b0988e595225.cdn.sohucs.com/images/20170826/29e6444053b8428482530c7c8f75f937.png',
			desc:'大重庆',
			time:'2018/03/08-2018/04/08',
			price:'99.00',
			tags:'x版本去'
		} );
	}
	return data;
};

class Home extends Component {
	constructor( props ) {
		super( props );
		const { typeList, typeListScrollTop } = props;
		this.state = {
			dataGeted: true,
			dataSource: new ListView.DataSource( {
				rowHasChanged: ( row1, row2 ) => row1 !== row2
			} ),
			refreshing: false,
			isLoading: false,
			isHaveMore: false,
			isScrolled: false,
			toastShow: false,
			isShowList:false,
			toastMessage: ''
		};
		this.scrollTop = typeListScrollTop;
		this.t = null;
		this.onScroll = this.onScrollHandle.bind( this );
		this.onRefresh = this.onRefreshHandle.bind( this );
		this.onEndReached = this.onEndReachedHandle.bind( this );
	}

	componentDidMount() {
		const { pageSize, code, message, typeTotalCount, typeListPageIndex } = this.props;
		const { dataSource } = this.state;
		const datas = getMockData();
		this.setState( {
			dataSource: dataSource.cloneWithRows( datas ),
			isHaveMore: datas.length < typeTotalCount
		} );
	}

	componentWillUnmount() {
		this.closeTimeout();
	}

	showToast( message ) {
		const { toastShow } = this.state;
		if ( toastShow ) {
			this.closeTimeout();
		}
		this.setState( {
			toastShow: true,
			toastMessage: message
		}, () => {
			this.t = setTimeout( () => {
				this.setState( {
					toastShow: false,
					toastMessage: ''
				} );
			}, 2000 );
		} );
	}

	closeTimeout() {
		if ( this.t ) {
			clearTimeout( this.t );
			this.t = null;
		}
	}

	onScrollHandle( event ) {
		this.scrollTop = event.target.scrollTop;
		const { isScrolled } = this.state;
		if ( !isScrolled ) {
			this.setState( {
				isScrolled: true
			} );
		}
	}

	onRefreshHandle() {
		this.loadData( true );
	}

	onEndReachedHandle() {
		//this.loadData( false );
		console.log( 'load more' )
	}

	loadData( isRefreshing ) {
		const { appName, pageSize, typeListAdd, typeListClear, typeListPageIndexUpdate, typeTotalCountUpdate } = this.props;
		const { dataSource, refreshing, isLoading, isHaveMore } = this.state;
		if ( isRefreshing && (refreshing || isLoading) ) {
			return;
		}
		if ( !isRefreshing && (refreshing || isLoading || !isHaveMore) ) {
			return;
		}
		this.setState( {
			refreshing: isRefreshing,
			isLoading: !isRefreshing
		} );
		if ( isRefreshing ) {
			typeListPageIndexUpdate( 1 );
		} else {
			typeListPageIndexUpdate( this.props.typeListPageIndex + 1 );
		}
		const { typeListPageIndex } = this.props;
		if ( ISMOCKDATA ) {
			this.mockData( pageSize, typeListPageIndex );
		} else {
			axios.get( '/api' + API_GETHELPTYPE, {
				params: {
					appName: appName,
					pageSize: pageSize,
					pageIndex: typeListPageIndex
				}
			} )
				.then( ( response ) => {
					const res = (typeof response === 'string') ? JSON.parse( response ).data : response.data;
					if ( Number( res.code ) === 0 ) {
						const dataPage = res.data || [];
						const totalCount = res.totalCount !== undefined && res.totalCount !== null ? res.totalCount : 0;
						if ( isRefreshing ) {
							typeListClear();
						}
						typeListAdd( dataPage );
						typeTotalCountUpdate( totalCount );
						const { typeList, typeTotalCount } = this.props;
						this.setState( {
							dataSource: dataSource.cloneWithRows( typeList ),
							refreshing: false,
							isLoading: false,
							isHaveMore: typeList.length < typeTotalCount
						} );
					} else {
						this.setState( {
							refreshing: false,
							isLoading: false
						} );
						this.showToast( res.message || '' );
					}
				} )
				.catch( ( error ) => {
					console.log( 'getType:', error );
					this.setState( {
						refreshing: false,
						isLoading: false
					} );
					this.showToast( '系统繁忙，请稍后再试' );
				} );
		}
	}

	mockData( pageSize = 20, pageIndex = 1 ) {
		this.t = setTimeout( () => {
			const { typeListAdd, typeListClear } = this.props;
			const { dataSource } = this.state;
			const dataPage = getMockData( pageSize, pageIndex );
			if ( pageIndex === 1 ) {
				typeListClear();
			}
			typeListAdd( dataPage );
			if ( pageIndex === 1 ) {
				typeTotalCountUpdate( 200 );
			}
			const { typeList, typeTotalCount } = this.props;
			this.setState( {
				dataGeted: true,
				dataSource: dataSource.cloneWithRows( typeList ),
				refreshing: false,
				isLoading: false,
				isHaveMore: typeList.length < typeTotalCount
			} );
		}, 500 );
	}

	goHelpHandle( item, event ) {
		const { typeListScrollTopUpdate, helpListClear, helpListScrollTopUpdate, currTypeNameUpdate, history } = this.props;
		helpListClear();
		typeListScrollTopUpdate( this.scrollTop );
		helpListScrollTopUpdate( 0 );
		currTypeNameUpdate( item.typeName );
		history.push( '/ssr/help/' + item.typeId );
	}

	render() {
		const renderRow = ( rowData, sectionID, rowID ) => {
			/**
			 * typeId: id,
			 typeName: '京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营京东自营',
			 typeImage: 'http://5b0988e595225.cdn.sohucs.com/images/20170826/29e6444053b8428482530c7c8f75f937.png',
			 desc:'大重庆',
			 time:'2018/03/08-2018/04/08',
			 price:'99.00',
			 tags:['x版本去','a标签2']
			 */
			// onClick={this.goHelpHandle.bind( this, rowData )}
			return (
				<div key={rowID} className="list-item">
					<div className="content">
						<img className="left" src="https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png"/>
						<div className="right">
							<p className="title">{rowData.typeName}</p>
							<p className="desc">{rowData.desc}</p>
							<p className="time">{rowData.time}</p>
						</div>
					</div>
					<div className="bar">
						<span className="tags">{rowData.tags}</span>
						<span className="price">{rowData.price}</span>
						<span className="button" onClick={()=>{
							this.props.history.push('/ssr/sign-up-activity');
						}}>立即报名</span>
					</div>
				</div>
			);
		};
		const renderFooter = () => {
			const { pageSize, typeTotalCount } = this.props;
			const { dataGeted, isHaveMore, isScrolled } = this.state;
			const isHide = !isScrolled && typeTotalCount < pageSize;
			return (
				dataGeted && !isHide && <ListViewFooter isHaveMore={isHaveMore}/>
			);
		};
		const renderTest = () => {
			return (
				<div>下拉刷新</div>
			);
		};
		const separator = ( sectionID, rowID ) => (
			<div
				key={`${sectionID}-${rowID}`}
				style={{
					backgroundColor: '#F5F5F9',
					height: 8,
					borderTop: '1px solid #ECECED',
					borderBottom: '1px solid #ECECED'
				}}
			/>
		);
		const { dataGeted, dataSource, refreshing, toastShow, toastMessage } = this.state;

		return (
			<div className="main-home-wrap">
				<Header titleIsBlueColor={false} isBack={true} title="活动"/>
				<ListView
					ref={el => this.lv = el}
					dataSource={this.state.dataSource}
					renderHeader={() => (
						<div className="home-header">
							<SelectMenus isShowList={this.state.isShowList} showSelectList={()=>this.setState({isShowList:true})} onClose={()=>this.setState({isShowList:false})}/>
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
							<Toast show={false} message={toastMessage}/>
							<Loading show={!dataGeted}/>
						</div>
					)}
					renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
						{this.state.isLoading ? 'Loading...' : 'Loaded'}
					</div>)}
					renderRow={renderRow}
					renderSeparator={separator}
					className="am-list"
					pageSize={10}
					useBodyScroll
					onScroll={() => {
						console.log( 'scroll' );
					}}
					scrollRenderAheadDistance={500}
					onEndReached={this.onEndReachedHandle}
					onEndReachedThreshold={10}
				/>
			</div>

		);
	}
}

export default Home
