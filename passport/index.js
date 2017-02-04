exports = (Users) =>{
  var passport = require('passport');
  var GitHubTokenStrategy = require('passport-github-token');
  var FacebookTokenStrategy = require('passport-facebook-token');
  var TwitterTokenStrategy = require('passport-twitter-token');
  
  
  //passport serialize
  passport.serializeUser(function(user, done) {done(null, user);});
  passport.deserializeUser(function(obj, done) {done(null, obj);});
   

  //passport setting
  passport.use(new GitHubTokenStrategy({
    clientID: '6a6ed9d97c15319414a5',
    clientSecret: '48a2a6badc826ea8c1536cd95868e89e3ab67ceb',
    passReqToCallback: true
  }, (req, accessToken, refreshToken, profile, next) =>{
    Users.findOrCreate({'github.id': profile.id}, function(error, user) {
      return next(error, user);
    });
  }))

  .use(new FacebookTokenStrategy({
    clientID: "1213122912074048",
    clientSecret: "259b6ddcb09ade12157f47f4fb2d5c95",
    profileFields: ['id', 'displayName', 'photos'],
  }, function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    Users.findOne({'userid': profile.id}, function(err, user) {
      if(err){
         return done(err);
      }
      if(!user) {
        user = new Users({
          userid: profile.id,
          name: profile.displayName,
          profile_image: profile.photos[0].value,
          token: rndString.generate()
        });

        user.save(function(err) {
          if (err) console.log(err);
          else done(null, user);
                
        })
      }else if (user) {
        Users.findOne({userid: profile.id}, function(err, resul){
          if(err) err;
          if(resul) done(null, resul);
        });

      }
    })
  }))

  .use(new TwitterTokenStrategy({
    consumerKey: "SvRMQBeHtW8aIZVYQZnrxnorN",
    consumerSecret: "At91tGX1v5MMwwUvqzNUgjvpZrnCB6O41VehdJASHs86bieaFd",
  }, function(accessToken, refreshToken, profile, done) {
    Users.findOne({'userid': profile.id}, function(err, user) {
        if(err) return done(err);
        if(!user){
          user = new Users({
            userid: profile.id,
            name: profile.displayName,
            profile_image: profile._json.profile_image_url,
            token: rndString.generate()
          });

          user.save(function(err) {
            if (err) console.log(err);
            else done(null, profile);
                
          })
        } else if (user) {
            done(null, profile);
        }
    })
  }));

  return passport;
}
