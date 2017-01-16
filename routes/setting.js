module.exports = version;
var Q = require('q');
var multer = require('multer');

var upload = (req, res) =>{
    var deferred = Q.defer();
    var storage = multer.diskStorage({
        // 서버에 저장할 폴더
        destination: function (req, file, cb) {
            cb(null, "upload/");
        },

        // 서버에 저장할 파일 명
        filename: function (req, file, cb) {
            if(file.mimetype.split('/')[1] !== ".ini"){
              return res.status(400).send("invaild file");
            }else{
              file.uploadedFile = {
                name: file.minmetype.split('/')[0],
                ext: file.mimetype.split('/')[1]
              };
  	    }
            cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);
        }
    });

    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
        if (err) {
            deferred.reject();
        }else{
            deferred.resolve(req.file.uploadedFile);
        }
    });
    return deferred.promise;
};


function version(app, Users, fs) {
  app.post('/setting', (req, res) =>{
    upload(req, res, boardid, date).then(function (file) {
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

    }, function (err) {
        if(err) return res.status(409).send(err);
    });
  });
}
