import React from 'react';
import ArticleItem from '../main/articles/article_item';

export default class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articlesFetched: false }
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
      "नमस्ते", //Hindi (formerly Namaste)
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
    this.props
      .fetchSavedArticles(this.props.currentUser.id)
      .then(() => this.setState({ articlesFetched: true }));
  }

  handleHello() {
    const hello = document.getElementById("hello");
    hello.innerText = `${this.hellos[Math.floor(Math.random() * (this.hellos.length - 1))]}`;
  }

  render() {
    const {
      currentUser,
      savedArticles,
      fetchSavedArticles,
      unSaveArticle
    } = this.props;
    const myArticles = Object.values(savedArticles);

    return (
      <div className="feed-modal">
        <h3 id="hello" onClick={this.handleHello}>{`${this.hellos[0]}`}</h3>
        {/* <p className="click">Click me!</p> */}
        <img
          className="pointer"
          alt="pointer-finger"
          src={require("../../images/pointer.png")}
        />

        <h3 id="user-id">{currentUser.email}</h3>
        {!Object.keys(savedArticles).length ? (
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
              key={article.articleURL}
              article={article}
              fetchSavedArticles={fetchSavedArticles}
              unSaveArticle={unSaveArticle}
              savedArticles={Object.values(savedArticles).map(a => a.articleURL)}
              userId={currentUser.id}
            />
          ))
        )}
      </div>
    );
  }
}