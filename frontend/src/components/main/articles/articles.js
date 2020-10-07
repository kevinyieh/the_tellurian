import React from "react";
// import ArticleItem from "./article_item";
import "../../../stylesheets/articles.css";

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
        return(
            <div className={this.onOrOffScreen()}>
                <div className="articles">
                    <div className="hide-articles"
                        onClick={this.handleHide}
                    >
                        <i className="fas fa-angle-right" />
                    </div>
                    
                </div>
            </div>
        )
    }
}