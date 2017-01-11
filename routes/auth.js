module.exports = auth;

function auth(app, Users) {
  app.get('/auth', (req, res) =>{
    var id = req.body.id;
    var passwd = req.body.passwd;
  });

}
