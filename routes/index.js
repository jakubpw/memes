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
          memes: rows
        });
    })
});

module.exports = router;
