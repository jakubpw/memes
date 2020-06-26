var express = require('express');
var router = express.Router();
var csrf = require('csurf')
var csrfProtection = csrf({ cookie: true })
function get_meme(db, id, res, csrfToken, views) {
  db.get("SELECT memes.id, name, price, url FROM (SELECT * FROM memes WHERE id = ?) memes INNER JOIN prices ON memes.id = idmem WHERE date = (SELECT MAX(date) FROM prices WHERE memes.id = idmem)",
    id,
    function (err, row) {
      db.all("SELECT date, price FROM (SELECT * FROM memes WHERE id = ?) memes INNER JOIN prices ON memes.id = idmem ORDER BY date DESC",
        id,
        function (err, rows) {
          res.render('meme',
            {
              title: 'Meme market',
              meme: row,
              prices: rows,
              csrfToken: csrfToken,
              views: views
            });
        })
    })
}
/* GET users listing. */
router.get('/:memeId', csrfProtection, function (req, res) {
  get_meme(req.db, req.params.memeId, res, req.csrfToken(), req.session.views)
})
router.post('/:memeId', csrfProtection, function (req, res) {
  // Dodajemy do tabeli cen nowa cene mema z aktualna data (change_price).
  req.db.run("INSERT INTO prices (idmem, price, date) VALUES (?, ?, ?)", req.params.memeId, req.body.price, new Date().toISOString().slice(0, 19).replace('T', ' '));
  console.log(req.body.price);
  get_meme(req.db, req.params.memeId, res, req.csrfToken(), req.session.views)
})

module.exports = router;
