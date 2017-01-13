module.exports = version;

function version(app) {
  app.get('/version', (req, res) =>{
     res.json({version: "1.0.0.0"});
  });
}
