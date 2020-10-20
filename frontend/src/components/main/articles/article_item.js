import React from 'react';
import copy from "copy-to-clipboard";  
import { formatDate } from "../../../util/format_date_util";

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true, copied: false, bookmarked: false };
    this.toggleContent = this.toggleContent.bind(this);
    this.imageRender = this.imageRender.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.unsaveBookmark = this.unsaveBookmark.bind(this);
    this.saveBookmark = this.saveBookmark.bind(this);
    this.renderBookmark = this.renderBookmark.bind(this);
  }

  toggleContent(e) {
    e.preventDefault();
    this.setState({ collapsed: !this.state.collapsed });
  }

  imageRender(url) {
    let image = this.props.article.imageURL;
    debugger;
    if (!image && !url) {
      return null;
    } else {
      return (
        <img
          className="article-image"
          src={url}
          alt={this.props.article.headline}
        />
      );
    }
  }

  copyToClipboard(e) {
    e.preventDefault();
    copy(this.props.article.articleURL);
    this.setState({ copied: true });
    setTimeout(() => {
      this.setState({ copied: false });
    }, 1000);
  }

  unsaveBookmark(e) {
    e.preventDefault();
    this.props.unSaveArticle(this.props.userId, this.props.article.articleURL);
    //  this.setState({ bookmarked: !this.state.bookmarked });
  }

  saveBookmark(e) {
    e.preventDefault();
    this.props.saveArticle(this.props.userId, this.props.article);
    //  this.setState({ bookmarked: !this.state.bookmarked });
  }

  renderBookmark() {
    const { savedArticles, article } = this.props;
    let myArticles = Object.values(savedArticles);
    let found;
    myArticles.forEach((a) =>
      a.articleURL === article.articleURL ? (found = true) : null
    );
    if (myArticles && found) {
      return <i className="fas fa-bookmark" onClick={this.unsaveBookmark}></i>;
    } else {
      return <i className="far fa-bookmark" onClick={this.saveBookmark}></i>;
    }
  }

  renderHeadline(headline) {
    if(headline.length < 70) return headline;
    return headline.slice(0,70) + "..."
  }

  renderBody(body) {
    if(body && body.slice(body.length-6,body.length) === "chars]") {
      return body.slice(0,body.lastIndexOf("["));
    }
    return body;
  }

  render() {
    const { article } = this.props;
    return (
      <div className="article-item">
        <div className="article-text">
          <div className="flex-head">
            <i
              className={`fas fa-chevron-down ${
                this.state.collapsed ? "" : "rotate"
              }`}
              onClick={this.toggleContent}
            ></i>
            <h1 className="headline">{this.renderHeadline(article.headline)}</h1>
            {this.imageRender(article.imageURL)}
          </div>

          <div className="article-midline">
            <div className="attributes">
              {article.author ? `By ${article.author}, on` : null}{" "}
              {formatDate(article.date)}.{" "}
              <p className="italicize">Source: {article.source} </p>
            </div>
            <div className="article-icons">
              <p className={this.state.copied ? "copied" : "hide"}>Copied!</p>
              <i className="fas fa-link" onClick={this.copyToClipboard}></i>
              {this.renderBookmark()}
            </div>
          </div>
          <p
            className={`article-content ${
              this.state.collapsed ? "" : "display"
            }`}
          >
            {this.renderBody(article.body)}
            <br></br>
            <a
              className="article-link"
              href={article.articleURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Link to article
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default ArticleItem;


