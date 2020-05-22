var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:memeId', function (req, res) {
  req.db.get("SELECT memes.id, name, price, url FROM (SELECT * FROM memes WHERE id = ?) memes INNER JOIN prices ON memes.id = idmem WHERE date = (SELECT MAX(date) FROM prices WHERE memes.id = idmem)",
    req.params.memeId,
    function (err, row) {
      req.db.all("SELECT date, price FROM (SELECT * FROM memes WHERE id = ?) memes INNER JOIN prices ON memes.id = idmem ORDER BY date DESC",
        req.params.memeId,
        function (err, rows) {
          res.render('meme',
            {
              title: 'Meme market',
              meme: row,
              prices: rows
            });
        })
    })

})
router.post('/:memeId', function (req, res) {
  req.db.run("INSERT INTO prices (idmem, price, date) VALUES (?, ?, ?)", req.params.memeId, req.body.price, new Date().toISOString().slice(0, 19).replace('T', ' '));
  console.log(req.body.price);
  req.db.get("SELECT memes.id, name, price, url FROM (SELECT * FROM memes WHERE id = ?) memes INNER JOIN prices ON memes.id = idmem WHERE date = (SELECT MAX(date) FROM prices WHERE memes.id = idmem)",
    req.params.memeId,
    function (err, row) {
      req.db.all("SELECT date, price FROM (SELECT * FROM memes WHERE id = ?) memes INNER JOIN prices ON memes.id = idmem ORDER BY date DESC",
        req.params.memeId,
        function (err, rows) {
          res.render('meme',
            {
              title: 'Meme market',
              meme: row,
              prices: rows
            });
        })
    })
})

module.exports = router;
