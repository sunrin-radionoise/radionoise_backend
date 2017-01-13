module.exports = auth;

function auth(app, Users, rnd_string) {
  app.get('/auth', (req, res) =>{
    var id = req.body.id;
    var passwd = req.body.passwd;
  });

  app.post('/auth/signup', (req, res) => {
    const id = req.body.id;
    const passwd = req.body.passwd;
    const name = req.body.name;
    
    const new_user = new Users({
      id: id,
      passwd: passwd,
      name: name,
      token: rnd_string.generate()
    });
    
    new_user.save((err, data)=>{
      if(err) return res.status(400).send("save err");
      return res.status(200).json(new_user);
    });

  });

}
