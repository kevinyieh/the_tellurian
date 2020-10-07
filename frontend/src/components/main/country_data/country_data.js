import React from "react";
import "../../../stylesheets/country_data.css";

export default class CountryData extends React.Component{
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
        return `country-data-container ${this.state.hidden ? "off-screen" : this.props.display ? "on-screen" : "off-screen"}`;
    }

    render(){
        return(
            <div className={this.onOrOffScreen()}>
                <div className="articles">
                    <div className="hide-country-data"
                        onClick={this.handleHide}
                    >
                        <i className="fas fa-angle-left" />
                    </div>
                    
                </div>
            </div>
        )
    }
}