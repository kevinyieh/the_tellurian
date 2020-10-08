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
        this.handleHide = this.handleHide.bind(this);
    }
    componentDidMount() {
        this.setState({
            hidden: false
        });
    }
    componentDidUpdate(_,prevState) {
        if(prevState.hidden){
            this.setState({
                hidden: false
            })
        }
    }
    handleHide(){
        this.setState({
            hidden: true
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
                    <div className="hide-articles" onClick={this.handleHide}>
                      <i className="fas fa-caret-square-right"></i>
                    </div>
                    <h1>Today's Top Stories</h1>
                    <div> </div>
                  </div>
                </div>
                <img
                  className="article-load"
                  src={require("../../../images/loading.svg")}
                  alt="loading"
                />
              </div>
            );
        } else {
            return (
              <div className={this.onOrOffScreen()}>
                <div className="articles-index-text">
                  <div className="header-flex">
                    <div className="hide-articles" onClick={this.handleHide}>
                      <i className="fas fa-caret-square-right"></i>
                    </div>
                    <h1>Top Stories in {country.name}</h1>
                    <div> </div>
                  </div>

                  <div className="article-scroll">
                    {articles.map((article, i) => (
                      <ArticleItem key={i} article={article} />
                    ))}
                  </div>
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