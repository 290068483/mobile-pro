
module.exports = app => {
  app.redirect('/', '/ssr', 302);
  app.get('/ssr(/.+)?', app.controller.spa.ssr);
  app.get('/api/help-app/phone/type', app.controller.spa.getHelpType);
  app.get('/api/help-app/phone/list', app.controller.spa.getHelp);
  app.get('/api/help-app/phone/get', app.controller.spa.getHelpDetail);
  app.post('/api/help-app/phone/isUse', app.controller.spa.helpGood);
  app.post('/api/help-app/getHelpToFeedback/getNoUse', app.controller.spa.helpFeedBack);
  app.get('/*', app.controller.spa.notfound);
};
