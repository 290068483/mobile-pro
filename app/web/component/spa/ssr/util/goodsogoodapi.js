/* eslint-disable */
// 保存实例化后的构造函数
var jsBridge = null;

// 前端sdk方法
hostSdk = {

	//初始化回调队列
	queueCallback: [],

	init: function ( callback ) {
		//先判断当前客户端是否初始化完成 如果没有完成 则吧当前的callback加入到队列 待加载完成后调用
		if ( !host_sdk.initialized ) {
			hostSdk.queueCallback.push( callback );
		} else {
			callback();
		}
	},

	// 当客户端加载完成后调用前端初始化
	onInit: function () {
		jsBridge = new window.GoodSoGoodJSBridge();
		//处理回调队列

		for ( var i = 0 ; i < hostSdk.queueCallback.length ; i++){
			if ( typeof hostSdk.queueCallback[i] === 'function' ) {
				hostSdk.queueCallback[i]( hostSdk );
			}
		}


	},
	//关闭当前页面
	closePage: function () {
		if ( jsBridge ) {
			jsBridge.closePage();
		}
	},
	//打开分享界面
	openShare: function ( info,cb ) {
		if ( jsBridge ) {
			jsBridge.openShare(info, function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} );
		}
	},
	//获取位置
	getLocation: function ( cb ) {
		if ( jsBridge ) {
			jsBridge.getLocation( function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} );
		}
	},
	//获取用户信息
	getUserInfo: function ( cb ) {
		if ( jsBridge ) {
			jsBridge.getUserInfo( function ( result ) {
				console.log(result)
				hostSdk.getObjectParams( result, cb );
			} );
		}
	},
	//选择图片
	selectPic: function ( cb ) {
		if ( jsBridge ) {
			jsBridge.selectPic( function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} );
		}
	},
	//充值
	recharge: function ( cb ) {
		if ( jsBridge ) {
			jsBridge.recharge( function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} );
		}
	},
	//打开扫一扫
	scan: function ( cb ) {
		if ( jsBridge ) {
			jsBridge.scan( function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} );
		}
	},
	//打开wifi
	openWIFI: function () {
		if ( jsBridge ) {
			jsBridge.openWIFI();
		}
	},
	//打开蓝牙
	openBluetooth: function () {
		if ( jsBridge ) {
			jsBridge.openBluetooth();
		}
	},
	//打开我的积分界面
	openIntegralView: function () {
		if ( jsBridge ) {
			jsBridge.openIntegralView();
		}
	},
	//设置是否显示加载动画
	setLoading: function ( state ) {
		if ( state ) {
			//window.GSJSBridge.show();
			if ( jsBridge ) jsBridge.show();
		} else {
			//window.GSJSBridge.hide();
			if ( jsBridge ) jsBridge.hide();
		}
	},

	enterRnPage: function ( message ) {
		if ( jsBridge ) jsBridge.enterRnPage( message );
	},

	// 直接打开原生支付界面（传入payData）
	pay : function(payData,cb){
		if ( jsBridge ) {
			jsBridge.pay( payData, function ( resultPay ) {
				hostSdk.getObjectParams( resultPay, cb );
			} )
		}else{
			cb && cb({
				code: 1,
				msg: '方法不存在',
				message:'方法不存在',
			})
		}
	},
	/**
	 * 直接打开原生支付界面
	 * @description 调用原生支付方法
	 * @param { object } params  { type:1,...paydata }  type的值  1为C币支付   2为金豆支付  如果有新增 则新增规则 其他属性则需要和原生约定
	 */
	payWithPayway : function(params,cb){
		if ( jsBridge ) {
			jsBridge.payWithPayway( params, function ( resultPay ) {
				hostSdk.getObjectParams( resultPay, cb );
			} )
		}else{
			cb && cb({
				code: 1,
				msg: '方法不存在',
				message:'方法不存在',
			})
		}
	},
	getAppInfo: function (cb) {
		if ( jsBridge && jsBridge.getAppInfo) {
			jsBridge.getAppInfo( function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} )
		}else{
			cb && cb({
				code: 1,
				msg: '方法不存在',
				message:'方法不存在',
			})
		}
	},

	/**
	 * 打开指定URL并在页面加载完成之后执行指定JS
	 * @param  {[type]}   params [需要执行的JS]
	 */
	openSpecifyUrl: function (params, cb) {
		if ( jsBridge && jsBridge.openSpecifyUrl) {
			jsBridge.openSpecifyUrl( params, function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} )
		}else{
			cb && cb({
				code: 1,
				msg: '方法不存在',
				message:'方法不存在',
			})
		}
	},
	/**
	 * [openNativePage 打开原生的指定页面]
	 * @param  {[type]}   params [{
     *     name: 'pageName'
     * }]
	 */
	openNativePage: function(params, cb) {
		if ( jsBridge && jsBridge.openNativePage) {
			jsBridge.openNativePage( params, function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} )
		}else{
			cb && cb({
				code: 1,
				msg: '方法不存在'
			})
		}
	},
	/**
	 * [doSign 拉取模块增加出参 随机字符串]
	 * @param  {[type]}   params [{
     *     signStr: // 随机字符串
     *     appId: // 当前模块的appId
     * }]
	 */
	doSign: function(params, cb) {
		if ( jsBridge && jsBridge.doSign) {
			jsBridge.doSign( params, function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} )
		}else{
			cb && cb({
				code: 1,
				msg: '方法不存在',
				message:'方法不存在',
			})
		}
	},
	/**
	 * 移动端发送通知给客户端
	 * @param  {[type]}   params [{
     *     code: 约定code值
     * }]
	 */
	notification: function(params, cb) {
		if ( jsBridge && jsBridge.notification) {
			jsBridge.notification( params, function ( result ) {
				hostSdk.getObjectParams( result, cb );
			} )
		}else{
			cb && cb({
				code: 1,
				msg: '方法不存在',
				message:'方法不存在',
			})
		}
	},
	/**
	 * 返回一个对象参数
	 * @param { string | object } params        需要转换的源数据
	 * @param { function } [cb]                   是否有回调
	 */
	getObjectParams: function ( params, cb ) {

		// 判断是否是一个字符串JSON   并且包含 { 或者 }
		if ( (typeof params === 'string') && (params.indexOf( '{' ) > -1) ) {

			params = JSON.parse( params )

			cb && cb( params )

			return params;

			// 判断是否是一个对象
		} else if ( typeof params === 'object' ) {

			cb && cb( params );

			return params;

			//如果以上都不是  则认为是一个普通字符串
		} else {
			cb && cb( params );
			return '';
		}
	},
}

// 客户端回调方法
host_sdk = {

	// 设置当前初始化是否已经完成
	initialized: false,

	// 生命周期方法  加载初始化(完成)
	onInit: function () {
		// 设置加载完成状态
		host_sdk.initialized = true;
		// 调用前端初始化
    if ( hostSdk.onInit ) hostSdk.onInit();
  }
}