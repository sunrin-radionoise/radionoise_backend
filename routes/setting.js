module.exports = (router, fs, Users, async, func) =>{
  router.post('/setting', (req, res) =>{
    upload(req, res).then((file) => {
      return res.status(200).send("save su");
    },(err) => {
      if(err) return res.status(500).send("save err");
    });
  })
  .put('/setting', (req, res)=>{
    var params = ['token'];
    Users.update({token: req.body.token}, (err, result)=>{

    });
  });

  return router;
}
