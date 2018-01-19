module.exports = function(app){
  app.get('/', function(req, res){
    app.app.controllers.controllerIndex.home(app, req, res);
  });
}
