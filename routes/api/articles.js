const express = require("express");
const router = express.Router();
const Article = require('../../models/Article');

router.post("/save", (req, res) => {
  let url = req.body.articleURL;
  Article.findOne({ articleURL: url })
    .then(article => {
      if (article) {
        return res.json({ articleId: article._id });
      } else {
            const newArticle = new Article({
              date: req.body.date,
              articleURL: req.body.articleURL,
              imageURL:
              req.body.imageURL || "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQAwurA8BsiO6T-998tQkdMdHkfzFu-ONxzhw&usqp=CAU",
              headline: req.body.headline,
              body: req.body.body,
              source: req.body.source,
              author: req.body.author || req.body.source,
            });
            newArticle.save()
                .then((article) => {
                    return res.json({articleId: article._id});
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

    const articleIds = req.body.articleIds;
    Article.find({ _id: { $in: articleIds } })
      .then(articles => {
        if (articles.length) {
          return res.json(articles);
        } else {
          return res.status(404).json({ articles: 'No articles found' })
        }
      })
      
});

module.exports = router;