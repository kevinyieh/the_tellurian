import React from 'react';
import {
  connect
} from 'react-redux';
import {
  fetchSavedArticles,
  unSaveArticle
} from '../../actions/bookmark_actions';

class Feed extends React.Component {
  constructor(props) {
    super(props);

    this.hellos = [
      "Hallå", //Swedish
      "Halló", //Icelandic
      "Hallo", //Dutch German
      "Hei", //Finnish
      "Hello", //English
      "Hola", //Spanish
      "Aloha", //Hawaiian
      "Bonjour", //French
      "Ciao", //Italian
      "God dag", //Danish
      "Kamusta", //Filipino
      "Namaste", //Hindi
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
      this.props.currentUser.savedArticleIds
    );
  }

  handleHello() {
    const hello = document.getElementById("hello");
    hello.innerText = `${this.hellos[Math.floor(Math.random() * (this.hellos.length - 1))]}, ${this.props.currentUser.email}!`;
  }

  render() {
    return (
      <div className="">
          <h3 id="hello" onClick={this.handleHello}>{`${this.hellos[0]}, ${this.props.currentUser.email}!`}</h3>
          { !this.props.currentUser.savedArticleIds.length || !this.props.SavedArticles ? 
            <img src="https://image.flaticon.com/icons/svg/2909/2909488.svg"></img> :
            Object.keys(this.props.savedArticles).map(key => (
              <div>
                  this.props.savedArticles[key].headline
              </div>
              )
            )
          }
      </div>
    )
  }


}

const mSTP = state => ({
  savedArticles: state.entities.savedArticles,
  currentUser: state.session.user
})

const mDTP = dispatch => ({
  fetchSavedArticles: articleIds => dispatch(fetchSavedArticles(articleIds)),
  unSaveArticle: (userId, articleId) => dispatch(unSaveArticle(userId, articleId))
})

export default connect(mSTP, mDTP)(Feed);