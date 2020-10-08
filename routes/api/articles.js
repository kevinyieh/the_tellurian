const express = require("express");
const router = express.Router();
const Article = require('../../models/Article');

router.post("/", (req, res) => {
  debugger;
  let url = req.body.url;
  Article.findOne({ articleURL: url })
    .then(article => {
      if (article) {
        return res.json(article.id);
      } else {
            const newArticle = new Article({
            date: req.body.date,
            articleURL: req.body.articleURL,
            imageURL: req.body.imageURL,
            headline: req.body.headline,
            body: req.body.body,
            source: req.body.source,
            author: req.body.author
            });
            newArticle.save()
                .then((article) => {
                    return res.json(article.id);
                }, (err) => {
            console.log(err)
          });
      }
  })
});

router.get("/", (req, res) => {
    
    Article.findById(req.body.id)
        .then(article => {
            if (article)
                return res.json(article);
            else {
                return res.status(404).json({ article: 'Article not found' });
            }
        })
});

module.exports = router;