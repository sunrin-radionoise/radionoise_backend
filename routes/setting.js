module.exports = version;

function version(app, Users, fs) {

  app.post('/setting', (req, res) =>{
    var name = req.body.name;
    Users.findOne({name: name}, (err, users) => {
      if(err) res.status(409).send("DB err");
      if(users){
        var dir = '/home/june/server/radionoise_backend/user_settings/'+name;
        if (!fs.existsSync(dir)){
          fs.mkdirSync(dir);
          return res.status(200).send("make folder");
        }else{
          return res.status(200).send("mak");
        }
      }
    });
  });

}
