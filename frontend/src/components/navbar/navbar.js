import React from "react";
const seeds = require("./seeds.json");
const allCountries = {}
Object.keys(seeds).forEach( (key) => {
    allCountries[seeds[key].name] = key;
})
const countryNames = Object.keys(allCountries);
export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: "",
            selected: false,
            dropped: false
        }
        this.map = this.props.map;
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleClickOutside(e){
        debugger;
        if(this.searchBar && !this.searchBar.contains(e.target)){
            this.setState({
                dropped: false
            })
        }
    }
    componentDidMount(){
        document.addEventListener("mousedown",this.handleClickOutside)
    }
    componentWillUnmount(){
        document.removeEventListener("mousedown",this.handleClickOutside)
    }
    update(field){
        return e => {
            e.preventDefault();
            this.setState({
                [field]: e.target.value,
                selected: false,
                dropped: true
            })
        }
    }

    handleClick(e){
        const iso2 = allCountries[e.target.innerText];
        let cor = {latitude: seeds[iso2].lat,
                    longitude:  seeds[iso2].lng};
        this.setState({
            search: e.target.innerText,
            selected: true,
            dropped: false
        })
        this.props.selectCountry(cor,iso2)();
    }

    renderDropDown(){
        if(this.state.selected) return null;
        const searchResults = countryNames.filter(country => {
                                const len = this.state.search.length;
                                return country.slice(0,len).toLowerCase() === this.state.search.toLowerCase()
                            })
                            .sort()
                            .map( country => { return (<div key={country} 
                                                className="search-result"
                                                onClick={this.handleClick}> 
                                                    {country} 
                                            </div>) })
                            .slice(0,10)
        if(searchResults.length < 1) return <div key="no-results" className="search-result"> No results for this search </div>
        return searchResults;
    }
    render(){
        return (
            <div className="navbar-spacer">
                <div className="navbar-container">
                    <form className="search-bar-form">
                        <div className={`search-bar-input-container ${this.state.dropped? "dropped" : ""}`}
                            ref={node => this.searchBar = node}
                        >
                            <div className="search-bar">
                                <input onChange={this.update("search")} 
                                        className="search-bar-input"
                                        value={this.state.search}
                                        placeholder="Navigate to a country..."
                                        />
                                <div className={`space-shuttle-container ${this.state.dropped? "dropped" : ""}`}>
                                    <i className="fas fa-space-shuttle fa-flip-horizontal" />
                                </div>
                                    
                            </div>
                                
                            <div className={`search-dropdown ${this.state.dropped? "" : "hidden"}`}>
                                { this.renderDropDown() }
                            </div>
                        </div>
                            
                    </form>
                </div>
            </div>

        )
    }
}