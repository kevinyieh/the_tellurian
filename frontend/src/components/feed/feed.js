import React from 'react';
import {connect} from 'react-redux';
import {fetchSavedArticles, unSaveArticle, saveArticle } from "../../actions/bookmark_actions";
import ArticleItem from '../main/articles/article_item';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.hellos = [
      "Hello", //English
      "Hallå", //Swedish
      "Halló", //Icelandic
      "Hallo", //Dutch German
      "Hei", //Finnish
      "Hola", //Spanish
      "Aloha", //Hawaiian
      "Bonjour", //French
      "Ciao", //Italian
      "God dag", //Danish
      "Kamusta", //Filipino
<<<<<<< HEAD
      "नमस्ते", //Hindi (formerly Namaste)
=======
      "नमस्ते", //Hindi
>>>>>>> master
      "Olá", //Portugese
      "Salut", //Romanian
      "γεια", //Greek
      "Zdravo", //Bosnian Croatian
      "こんにちは", //Japanese
      "안녕하세요", //Korean
      "สวัสดี", //Thai
      "مرحبا", //Arabic
      "שלום", //Hebrew
      "你好", //Chinese
      "សួស្តី", //Khmer
      "Здравствуйте", //Russian
      "გამარჯობა", //Georgian
    ];

    this.handleHello = this.handleHello.bind(this);
  }

  componentDidMount() {
    this.props.fetchSavedArticles(
      this.props.currentUser.savedArticles
    );
  }

  handleHello() {
    const hello = document.getElementById("hello");
    hello.innerText = `${this.hellos[Math.floor(Math.random() * (this.hellos.length - 1))]}`;
  }

  render() {
    const {
      currentUser,
      savedArticles,
      saveArticle,
      fetchSavedArticles,
    } = this.props;
    debugger;
    const myArticles = Object.values(savedArticles);
    return (
      <div className="">
        <h3 id="hello" onClick={this.handleHello}>{`${this.hellos[0]}`}</h3>
        {/* <p className="click">Click me!</p> */}
          <img
            className="pointer"
            alt="pointer-finger"
            src={require("../../images/pointer.png")}
          />

<<<<<<< HEAD
        

        <h3 id="user-id">{currentUser.email}</h3>
        {!currentUser.savedArticleIds.length || !savedArticles ? (
=======
        <h3 id="user-id">{this.props.currentUser.email}</h3>
        {!this.props.currentUser.savedArticles.length ||
        !this.props.SavedArticles ? (
>>>>>>> master
          <div>
            <p className="no-bookmarks">No articles currently bookmarked!</p>
            <img
              src="https://image.flaticon.com/icons/svg/2909/2909488.svg"
              alt="bookmark-article"
            ></img>
          </div>
        ) : (
          myArticles.map((article, i) => (
            <ArticleItem
              key={i}
              article={article}
              saveArticle={saveArticle}
              fetchSavedArticles={fetchSavedArticles}
              savedArticles={savedArticles}
              userId={currentUser.id}
            />
          ))
        )}
      </div>
    );
  }
}

const mSTP = state => ({
  savedArticles: state.entities.savedArticles,
  currentUser: state.session.user
})

<<<<<<< HEAD
const mDTP = (dispatch) => ({
  fetchSavedArticles: (articleIds) => dispatch(fetchSavedArticles(articleIds)),
  unSaveArticle: (userId, articleId) => dispatch(unSaveArticle(userId, articleId)),
  saveArticle: (userId, article) => dispatch(saveArticle(userId, article)),
});
=======
const mDTP = dispatch => ({
  fetchSavedArticles: articleURLs => dispatch(fetchSavedArticles(articleURLs)),
  unSaveArticle: (userId, articleURL) => dispatch(unSaveArticle(userId, articleURL))
})
>>>>>>> master

export default connect(mSTP, mDTP)(Feed);