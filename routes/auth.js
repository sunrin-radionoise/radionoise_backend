module.exports = (router, rnd_string, Users, passport, func) =>{
  router.post('/auth/signup', (req, res) => {
    var params = ['id', 'passwd', 'name'];

    if(func.check_param(req.body, params)){
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
  })
  
  .post('/auth/signin', (req,res)=>{
    var params = ['id', 'passwd'];
    if(func.check_param(req.body, params)){
      Users.findOne({id: req.body.id, passwd: req.body.passwd}, (err, user)=>{
        if(err) return res.status(500).send("DB err");
        if(user) return res.status(200).json(user);
        else return res.status(404).send("incorrect id or passwd");
      });
    }else return res.status(400).send("param missing or null");
  })

  .get('/auth/auto/:token', (req, res)=>{
     var params = ['token'];

     if(func.check_param(req.params, params)){
       const token = req.params.token;
       Users.findOne({token: token}, (err, user) =>{
         if(err) return res.status(500).send("DB error"); 
         if(user) return res.status(200).json({id: user.id, name: user.name, token: user.token});
         else return res.status(404).send("user not found");
       });
     }else{
       return res.status(400).send("param missing or null");
     }
  })
  
  //social auth
  .get('/github/token', passport.authenticate('github-token'), (req, res)=>{

   })

  .get('/fb/token', passport.authenticate('facebook-token'), function(req, res) {
    console.log(req.user);
    /*if (req.user) {
      Users.findOne({facebook_id: req.user.userid}, function(err, users) {
        if(err) err;
        if(users) res.status(200).send(users);
        else res.status(401).send("not found");
      });
    } else  res.status(401).send(req.user);*/
  })

  .get('/tw/token', passport.authenticate('twitter-token'), (req, res) =>{
    if(req.user) {
    } else  res.status(401).send(req.user);
  })

  //social auth callback
  .get('/auth/github/callback', passport.authenticate('facebook-token', {
    successRedirect: '/',
    failureRedirect: '/'
  }))

  .get('/fb/callback', passport.authenticate('facebook-token', {
    successRedirect: '/',
    failureRedirect: '/'
  }))
  
  return router;
}
