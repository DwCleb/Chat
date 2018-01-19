module.exports = function(app){
  app.post('/chat', function(req, res){

    var params = req.body;

    var users = app.get('users');
    var user = app.get('slugify')(params.apelido);
    if(users.indexOf(user) > -1){
      res.render('index', {erros: [{msg: 'Este nome/apelido já está em uso por outro participante do chat: '+params.apelido}], params: params});
      return;
    }

    req.assert('apelido', 'O apelido é obrigatório').notEmpty();
    req.assert('apelido', 'O apelido deve conter entre 3 e 15 caracteres').len(3,15);

    req.getValidationResult().then(function(result){
      if(result.isEmpty()){
        app.app.controllers.controllerChat.initChat(app, req, res);
      }else{
        res.render('index', {erros: result.array(), params: params});
        return;
      }
    });

  });
  app.get('/chat', function(req, res){
    res.redirect('/');
  });
}
