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
        // this.handleShow = this.handleShow.bind(this);
        this.stopGlobeSpin = this.stopGlobeSpin.bind(this);
        this.startGlobeSpin = this.startGlobeSpin.bind(this);
    }
    componentDidMount() {
        this.setState({
            hidden: false
        });
        this.props.fetchSavedArticles(this.props.currentUser.savedArticles);
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

      if (
        prevProps.currentUser.savedArticles.length !==
        this.props.currentUser.savedArticles.length
      ) {
        this.props.fetchSavedArticles(this.props.currentUser.savedArticles);
      }
    }
    
    toggleHide(){
        this.setState({
            hidden: !this.state.hidden
        })
    }
    // handleShow(){
    //   this.setState({
    //       hidden: false
    //   })
    // }

    onOrOffScreen(){
      return `articles-container ${this.state.hidden ? "off-screen" : this.props.display ? "on-screen" : "off-screen"}`;
    }

    stopGlobeSpin(e){
      if( this.props.map.panBehavior !== "none" ) this.props.map.panBehavior = "none";
    }
    startGlobeSpin(e){
      if( this.props.map.panBehavior !== "rotateLongLat" ) this.props.map.panBehavior = "rotateLongLat";
    }

    render(){
        const {
          articles,
          country,
          savedArticles,
          saveArticle,
          fetchSavedArticles,
          currentUser,
        } = this.props;

        if (!articles) {
            return (
              <div className={`${this.onOrOffScreen()} loading`}>
                <div className="articles-index-text loading">
                  <div className="header-flex">
                    <h1>Today's Top Stories</h1>
                    <div> </div>
                  </div>
                  <img className="article-load" src={require("../../../images/loading.svg")} alt="loading" />
                </div>
                  <div onClick={this.toggleHide} className={`show-right ${this.state.hidden ? "" : "tucked"}`}>
                    <i className="fas fa-sort-up fa-rotate-270" />
                  </div>
                  
              </div>
            );
        } else {
            return (
              <div onMouseOver={this.stopGlobeSpin} 
                onMouseOut={this.startGlobeSpin}
                className={this.onOrOffScreen()}>
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
                          saveArticle={saveArticle}
                          fetchSavedArticles={fetchSavedArticles}
                          savedArticles={savedArticles}
                          userId={currentUser.id}
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