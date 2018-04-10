const api = require('../service/api');

module.exports = app => {

  return class SPAController extends app.Controller {

    async ssr() {
      const { ctx } = this;
      const appName = ctx.request.query.appName || 0;
      const pageSize = 20;
      const pageIndex = 1;
      let res = {
        code: 0,
        message: '',
        data: [],
        totalCount: 200
      };
      if (!ISMOCKDATA) {
        const { data: resHelpType } = await ctx.service.spa.getHelpType(appName, pageSize, pageIndex);
        if (typeof resHelpType !== 'undefined') {
          res = typeof resHelpType === 'string' ? JSON.parse(resHelpType) : resHelpType;
        }
      }
      const code = res.code;
      const message = res.message || '';
      const typeList = Number(code) === 0 && res.data ? res.data : [];
      const totalCount = Number(code) === 0 && res.totalCount !== undefined && res.totalCount !== null ? res.totalCount : 0;
      // 调用 rotateCsrfSecret 刷新用户的 CSRF token
      // if (!ctx.csrf) {
      //   ctx.rotateCsrfSecret();
      // }
      await ctx.render('ssr.js', {
        url: ctx.url,
        appName: appName,
        pageSize: pageSize,
        code: code,
        message: message,
        typeList: typeList,
        typeTotalCount: totalCount,
        typeListPageIndex: pageIndex,
        typeListScrollTop: 0,
        helpList: [],
        helpTotalCount: 200,
        helpListPageIndex: pageIndex,
        helpListScrollTop: 0,
        csrfToken: ctx.csrf
      });
    }

    async getHelpType() {
      const { ctx } = this;
      const { appName, pageSize, pageIndex } = ctx.query;
      const { data: resHelpType } = await ctx.service.spa.getHelpType(appName, pageSize, pageIndex);
      ctx.body = resHelpType;
    }

    async getHelp() {
      const { ctx } = this;
      const { appName, typeId, pageSize, pageIndex } = ctx.query;
      const { data: resHelp } = await ctx.service.spa.getHelp(appName, typeId, pageSize, pageIndex);
      ctx.body = resHelp;
    }

    async getHelpDetail() {
      const { ctx } = this;
      const { helpId } = ctx.query;
      const { data: resHelpDetail } = await ctx.service.spa.getHelpDetail(helpId);
      ctx.body = resHelpDetail;
    }

    async helpGood() {
      const { ctx } = this;
      const { helpId, openId } = ctx.request.body;
      const { data: resHelpGood } = await ctx.service.spa.helpGood(helpId, openId);
      ctx.body = resHelpGood;
    }

    async helpFeedBack() {
      const { ctx } = this;
      const { helpId, helpTitle, openId, feedbackText } = ctx.request.body;
      const { data: resHelpFeedBack } = await ctx.service.spa.helpFeedBack(helpId, helpTitle, openId, feedbackText);
      ctx.body = resHelpFeedBack;
    }

    async notfound() {
      const { ctx } = this;
      await ctx.render('404.js', { url: ctx.url });
    }

  };
};
