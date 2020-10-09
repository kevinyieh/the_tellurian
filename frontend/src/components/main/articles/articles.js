import React from "react";
import ArticleItem from "./article_item";
import "../../../stylesheets/articles.css";
import "../../../images/alien.png";

export default class Articles extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hidden: false
        }
        // this.handleHide = this.handleHide.bind(this);
        this.toggleHide = this.toggleHide.bind(this);
        this.handleShow = this.handleShow.bind(this);
    }
    componentDidMount() {
        this.setState({
            hidden: false
        });
    }
    componentWillReceiveProps(nextProps) {
      this.setState({ hidden: nextProps.hidden });  
    }
    componentDidUpdate(prevProps,prevState) {
      if (prevProps.hidden !== this.props.hidden){
        this.setState({ hidden: this.props.hidden })
      }else {
        if(prevState.hidden) this.setState({ hidden: false });
      }
    }
    toggleHide(){
        this.setState({
            hidden: !this.state.hidden
        })
    }
    handleShow(){
      this.setState({
          hidden: false
      })
  }

    onOrOffScreen(){
      return `articles-container ${this.state.hidden ? "off-screen" : this.props.display ? "on-screen" : "off-screen"}`;
    }

    render(){
        const { articles, country } = this.props;
        if (!articles) {
            return (
              <div className={`${this.onOrOffScreen()} loading`}>
                <div className="articles-index-text">
                  <div className="header-flex">
                    <h1>Today's Top Stories</h1>
                    <div> </div>
                  </div>
                </div>
                  <div onClick={this.toggleHide} className={`show-right ${this.state.hidden ? "" : "tucked"}`}>
                    <i className="fas fa-sort-up fa-rotate-270" />
                  </div>
                  <img className="article-load" src={require("../../../images/loading.svg")} alt="loading" />
              </div>
            );
        } else {
            return (
              <div className={this.onOrOffScreen()}>
                <div className="articles-index-text">
                  <div className="header-flex">
                    <h1>Top Stories in {country.name}</h1>
                    <div> </div>
                  </div>

                  <div className="article-scroll">
                    {articles.length === 0 ? (
                      <p className="no-news">
                        No news today, check back with us tomorrow!
                      </p>
                    ) : (
                      articles.map((article, i) => (
                        <ArticleItem
                          key={i}
                          article={article}
                          saveArticle={this.props.saveArticle}
                        />
                      ))
                    )}
                  </div>
                </div>
                <div
                  onClick={this.toggleHide}
                  className={`show-right ${this.state.hidden ? "" : "tucked"}`}
                >
                  <i className="fas fa-sort-up fa-rotate-270" />
                </div>
              </div>
            );
        }
    }
}

// "US":{
//             [
//                 {
//                     headline: News headline here,
//                     body: News body here,
//                     date: 10/10/20
//                     articleURL: https://NYTIMESURLHERE.com,
//                     imageURL: https://NYTIMESIMAGEURLHERE.com
//                 },
//                 {
//                     headline: News headline here,
//                 body: News body here,
//                     date: 10/10/20
//                     articleURL: https://NYTIMESURLHERE.com,
//                     imageURL: https://NYTIMESIMAGEURLHERE.com
//                 },
//                 {
//                     headline: News headline here,
//                     body: News body here,
//                     date: 10/10/20
//                     articleURL: https://NYTIMESURLHERE.com,
//                     imageURL: https://NYTIMESIMAGEURLHERE.com
//                 }
//             ]
//         }