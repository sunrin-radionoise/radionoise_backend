module.exports = setting;
var Q = require('q');
var multer = require('multer');

function setting(app, Users, fs) {
  function check_dir(name, res){
    Users.findOne({name: name}, (err, users) => {
      if(err) res.status(409).send("DB err");
      if(users){
        var dir = "user_settings/"+name;

        if(!fs.existsSync(dir)){
          fs.mkdirSync(dir);
          return dir;
        }
         return dir;
      }else{
        res.status(404).send("user not found");
      }
    });
  }

    var upload = (req, res) =>{
      var dir = check_dir(req.body.name, res);
      var deferred = Q.defer();
      var storage = multer.diskStorage({
        destination: function (req, file, cb){
          cb(null, "user_settings/"+req.body.name);
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
          if(file.originalname.split('.')[1] !== "ini"){
            return res.status(400).send("invaild file");
          }else{
            file.uploadedFile = {
              name: file.originalname.split('.')[0],
              ext: file.originalname.split('.')[1]
            };
          }
          cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
          deferred.reject();
        }else if(req.file === undefined){
          return res.status(404).send("file not send");
        }else{
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
  };

  app.put('/setting', (req, res) =>{
    upload(req, res).then(function (file) {
      return res.status(200).send("save su");
    }, function (err) {
        if(err) return res.status(500).send("save err");
    });
  });
}
