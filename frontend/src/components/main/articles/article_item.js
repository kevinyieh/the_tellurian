import React from 'react';

class ArticleItem extends React.Component {

    constructor(props) {
      super(props);
      this.state = { collapsed: true };
      this.toggleContent = this.toggleContent.bind(this);
      this.imageRender = this.imageRender.bind(this);
    }

    toggleContent(e) {
      e.preventDefault();
      this.setState({ collapsed: !this.state.collapsed });
    }

    imageRender(articleURL) {
      if (!articleURL) return null;
      return <img src={require(articleURL)} alt="article" />
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
                <h1 className="headline">{article.headline}</h1>
                {this.imageRender(article.imageURL)}
              </div>
              <p>{article.date}</p>
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
                  Read More
                </a>
              </p>
              {/* </div> */}
            </div>
          </div>
        );
    }
}

export default ArticleItem;


