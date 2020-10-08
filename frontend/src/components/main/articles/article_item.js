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
      debugger;
      this.setState({ collapsed: !this.state.collapsed });
    }

    imageRender(articleURL) {
      if (!articleURL) return null;
      return <img src={require(articleURL)} alt="article" />
    }

    render() {
        const { article } = this.props;
        debugger;
        return (
          <div className="article-item">
            <div className="article-text">
<<<<<<< HEAD
                <a className="headline" href={article.articleURL}>
                  {article.headline}
                </a>
                <p>{article.date}</p>
                <i className="fas fa-chevron-down"></i>;
              <div className="article-content">
                <p>{article.body}</p>
=======
              <div className="flex-head">
                <i
                  className={`fas fa-chevron-down ${
                    this.state.collapsed ? "" : "rotate"
                  }`}
                  onClick={this.toggleContent}
                ></i>
                <h1 className="headline">{article.headline}</h1>
                {this.imageRender(article.imageURL)}
>>>>>>> 5c7a03a355973ca700987f84808a75531928c414
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


