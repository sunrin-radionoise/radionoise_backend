module.exports = (Users) =>{
  var passport = require('passport');
  var GitHubTokenStrategy = require('passport-github-token');
  var FacebookTokenStrategy = require('passport-facebook-token');
  var TwitterTokenStrategy = require('passport-twitter-token');
  
  
  //passport serialize
  passport.serializeUser((user, done) =>{ console.log(user); done(null, user);});
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
    clientID: "1898081023756082",
    clientSecret: "fc44b2a48aaaf1e0848e08854b7bbe68",
    profileFields: ['id', 'displayName', 'photos'],
  }, (accessToken, refreshToken, profile, done)=>{
    done(null, profile);
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
