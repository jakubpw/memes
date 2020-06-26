var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  req.db.all("SELECT memes.id, name, price, url FROM memes INNER JOIN prices ON memes.id = idmem WHERE date = (SELECT MAX(date) FROM prices WHERE memes.id = idmem) ORDER BY price DESC LIMIT 3",
    function (err, rows) {
      res.render('index',
        {
          title: 'Meme market',
          message: 'Hello there!',
          memes: rows,
          views: req.session.views,
          user: req.session.login
        });
    })
});

router.post('/', function (req, res, next) {
  // TO JEST LOGOWANIE
  req.session.login = req.body.login;
  res.redirect('/');
});

router.get('/logout', function (req, res, next) {
  delete (req.session.login);
  res.redirect('/');
});
module.exports = router;
