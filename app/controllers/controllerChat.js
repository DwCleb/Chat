module.exports.initChat = function(app, req, res){
  var params = req.body;
  res.render('chat', {render: params});
}
