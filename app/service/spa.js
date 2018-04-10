const api = require('./api');

module.exports = app => {

  return class SPAService extends app.Service {

    async getHelpType(appName = -1, pageSize = 20, pageIndex = 1) {
      const { ctx } = this;
      const data = {
        appName: appName,
        pageSize: pageSize,
        pageIndex: pageIndex
      };
      app.logger.info('1、service:', `${APIURL}${API_GETHELPTYPE}${JSON.stringify(data)}`);
      const res = await ctx.curl(`${APIURL}${API_GETHELPTYPE}`, {
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        data: data
      });
      app.logger.info('2、service:', JSON.stringify(res));
      return res;
    }

    async getHelp(appName = -1, typeId = -1, pageSize = 20, pageIndex = 1) {
      const { ctx } = this;
      const data = {
        appName: appName,
        typeid: typeId,
        pageSize: pageSize,
        pageIndex: pageIndex
      };
      app.logger.info('1、service:', `${APIURL}${API_GETHELP}${JSON.stringify(data)}`);
      const res = await ctx.curl(`${APIURL}${API_GETHELP}`, {
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        data: data
      });
      app.logger.info('2、service:', JSON.stringify(res));
      return res;
    }
    
    async getHelpDetail(helpId = -1) {
      const { ctx } = this;
      const data = {
        id: helpId
      };
      app.logger.info('1、service:', `${APIURL}${API_GETHELPDETAIL}${JSON.stringify(data)}`);
      const res = await ctx.curl(`${APIURL}${API_GETHELPDETAIL}`, {
        method: 'GET',
        contentType: 'json',
        dataType: 'json',
        data: data
      });
      app.logger.info('2、service:', JSON.stringify(res));
      return res;
    }

    async helpGood(helpId = -1, openId = '') {
      const { ctx } = this;
      const data = {
        helpId: helpId,
        openId: openId
      };
      app.logger.info('1、service:', `${APIURL}${API_GETHELPUSED}${JSON.stringify(data)}`);
      const res = await ctx.curl(`${APIURL}${API_GETHELPUSED}`, {
        method: 'POST',
        contentType: 'form',
        dataType: 'json',
        data: data
      });
      app.logger.info('2、service:', JSON.stringify(res));
      return res;
    }

    async helpFeedBack(helpId = -1, helpTitle = '', openId = '', feedbackText = '') {
      const { ctx } = this;
      const data = {
        helpId: helpId,
        helpTitle: helpTitle,
        openId: openId,
        feedbackText: feedbackText
      };
      app.logger.info('1、service:', `${APIURL}${API_GETHELPFEEDBACK}${JSON.stringify(data)}`);
      const res = await ctx.curl(`${APIURL}${API_GETHELPFEEDBACK}`, {
        method: 'POST',
        contentType: 'form',
        dataType: 'json',
        data: data
      });
      app.logger.info('2、service:', JSON.stringify(res));
      return res;
    }

  };
};
