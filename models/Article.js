const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  date: { type: Date, required: true },
  articleURL: { type: String, required: true, index: true },
  imageURL: { type: String, required: true },
  headline: { type: String, required: true },
  body: { type: String, required: true },
  source: { type: String, required: true },
  author: {type: String, required: true }
});

module.exports = Article = mongoose.model('articles', ArticleSchema)