import React from 'react';

class ArticleItem extends React.Component {
    render() {
        const { article } = this.props;
        return (
          <div className="article-item">
            <img src={article.imageURL} alt="article"/>
            <div className="article-text">
                <a className="headline" href={article.articleURL}>
                  {article.headline}
                </a>
                <p>{article.date}</p>
                <i className="fas fa-chevron-down"></i>;
              <div class="article-content">
                <p>{article.body}</p>
              </div>
            </div>
          </div>
        );
    }
}

export default ArticleItem;


