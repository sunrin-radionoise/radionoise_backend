module.exports = user;

function user(app, Users) {
  app.get('/user', (req, res) =>{
    Users.find({}, (err, user)=> {
      if(err) res.status(400).send("db err");
      if(users) res.status(200).json(users);
      else res.status(404).send("user not found");
    });
  });

  app.post('/user/:id', (req, res) => {
    const id = req.params.id;
    Users.findOne({id: id}, (err, user) => {
      if(err) res.status(400).send("db err");
      if(users) res.status(200).json(users);
      else res.status(404).send("user not found");
    });
  });

}
