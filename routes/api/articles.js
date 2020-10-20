const express = require("express");
const router = express.Router();
const Article = require('../../models/Article');

router.post("/save", (req, res) => {
  let url = req.body.articleURL;
  Article.findOne({ articleURL: url })
    .then(article => {
      if (article) {
        return res.json({ articleURL: article.articleURL });
      } else {
            const newArticle = new Article({
              date: req.body.date,
              articleURL: req.body.articleURL,
              imageURL:
                req.body.imageURL ||
                "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1540&q=80",
              headline: req.body.headline,
              body: req.body.body || "none",
              source: req.body.source,
              author: req.body.author || req.body.source,
            });
            newArticle.save()
                .then((article) => {
                    return res.json({articleURL: article.articleURL});
                }, (err) => {
                    return res.status(422).json(err);
          });
      }
  })
});

router.post("/", (req, res) => {
    
    // Article.findById(req.body.id)
    //     .then(article => {
    //         if (article)
    //             return res.json(article);
    //         else {
    //             return res.status(404).json({ article: 'Article not found' });
    //         }
    //     })
    const articleURLs = req.body.articleURLs;
    Article.find({ articleURL: { $in: articleURLs } })
      .then(articles => {
        if (articles.length) {
          return res.json(articles);
        } 
      },
      error => {
        console.log("ERROR");
        return res.status(404).json( { articles: "Articles not found"})
      })
      
});

module.exports = router;