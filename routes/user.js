module.exports = (router, Users) => {
  router.get('/user', (req, res) =>{
    Users.find({}, (err, user)=> {
      if(err) res.status(400).send("db err");
      if(user) res.status(200).json(user);
      else res.status(404).send("user not found");
    });
  })
  .get('/user/:id', (req, res) => {
    const id = req.params.id;
    Users.findOne({id: id}, (err, user) => {
      if(err) res.status(400).send("db err");
      if(user) res.status(200).json(user);
      else res.status(404).send("user not found");
    });
  });

  return router;
}
