// 环境
global.ENV = 'prod';
// 是否模拟数据测试
global.ISMOCKDATA = false;
// appName生产
global.APPNAME_PROD = 2;
// api生产地址
global.APIURL_PROD = 'http://192.168.2.237:8064';
// api测试地址
global.APIURL_TEST = '';
// api正式地址
global.APIURL_RELEASE = '';
// api地址
global.APIURL = global.ENV === 'release' ? global.APIURL_RELEASE : global.ENV === 'test' ? global.APIURL_TEST : global.APIURL_PROD;
/* 获取帮助分类
* @method GET
* @param appName
*/
global.API_GETHELPTYPE = '/help-app/phone/type';
/* 获取分类下帮助
* @method GET
* @param appName
* @param typeid
*/
global.API_GETHELP = '/help-app/phone/list';
/* 获取帮助文档
* @method GET
* @param id
*/
global.API_GETHELPDETAIL = '/help-app/phone/get';
/* 点赞
* @method POST
* @param openid
* @param helpId
*/
global.API_GETHELPUSED = '/help-app/phone/isUse';
/* 反馈
* @method POST
* @param openid
* @param helpId
* @param helpTitle
* @param feedbackText
*/
global.API_GETHELPFEEDBACK = '/help-app/getHelpToFeedback/getNoUse';
