import React from 'react';
import copy from "copy-to-clipboard";  

class ArticleItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { collapsed: true, copied: false };
    this.toggleContent = this.toggleContent.bind(this);
    this.imageRender = this.imageRender.bind(this);
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.handleBookmark = this.handleBookmark.bind(this);
  }

  toggleContent(e) {
    e.preventDefault();
    debugger;
    this.setState({ collapsed: !this.state.collapsed });
  }

  imageRender(url) {
    debugger;
    let image = this.props.article.imageUrl;
    if (!image && !url) {
      return null;
    } else {
      return <img className="article-image" src={image} alt="article" />;
    }
  }

  copyToClipboard(e) {
    e.preventDefault();
    copy(this.props.article.articleURL);
    this.setState({ copied: true })
    setTimeout(() => {this.setState({ copied: false })}, 1000);
  }

  handleBookmark(e) {
     e.preventDefault();
     //
  }

  render() {
    const { article } = this.props;
    debugger;
    return (
      <div className="article-item">
        <div className="article-text">
          <div className={article.imageURL ? "flex-head" : "no-image"}>
            <i
              className={`fas fa-chevron-down ${
                this.state.collapsed ? "" : "rotate"
              }`}
              onClick={this.toggleContent}
            ></i>
            <h1 className="headline">{article.headline}</h1>
            {this.imageRender(article.imageURL)}
          </div>

          <div className="article-midline">
            <div className="attributes">
              {article.author ? `By ${article.author}, on` : null}{" "}
              {article.date}.{" "}
              <p className="italicize">Source: {article.source} </p>
            </div>
            <div className="article-icons">
              <p className={this.state.copied ? "copied" : "hide"}>Copied!</p>
              <i className="fas fa-link" onClick={this.copyToClipboard}></i>
              <i className="far fa-bookmark" onClick={this.handleBookmark}></i>
            </div>
          </div>
          <p
            className={`article-content ${
              this.state.collapsed ? "" : "display"
            }`}
          >
            {article.body}
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
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default ArticleItem;


