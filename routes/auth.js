module.exports = auth;

function auth(app, Users, rnd_string) {
  app.post('/auth/signup', (req, res) => {
    var params = ['id', 'passwd', 'name'];

    if(check_param(req.body, params)){
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

    }else{
      return res.status(400).send("param missing or null");
    } 

  });

  app.get('/auth/auto/:token', (req, res)=>{
     var params = ['token'];

     if(check_param(req.params, params)){
       const token = req.params.token;
       Users.findOne({token: token}, (err, user) =>{
         if(err) return res.status(500).send("DB error"); 
         if(user) return res.status(200).json({id: user.id, name: user.name, token: user.token});
         else return res.status(404).send("user not found");
       });
     }else{
       return res.status(400).send("param missing or null");
     }
  });

}

function check_param(req_param, params){
  return params.every(str => req_param[str] != undefined || req_param[str] != null)
}

