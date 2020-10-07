import React from "react";
import SessionDrop from './session_drop';
import { searchCountries } from '../../util/countries_api_util';

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: "",
            selected: false,
            dropped: false,
            searchResults: {}
        }
        this.map = this.props.map;
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    handleClickOutside(e){
 
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
            }, () => {
              
                searchCountries({ searchparams: this.state.search})
                    .then(response => {
                        let results = {};
                        response.data.forEach(country => {
                            results[country.name] = country
                        })
                    
                        this.setState({
                            searchResults: results
                        })
                    })
            })
        }
    }

    handleClick(e){
        const selected = this.state.searchResults[e.target.innerText]
        const iso2 = selected.cca2
        const cor = { latitude: selected.lat, longitude: selected.lng }
        this.setState({
                search: e.target.innerText,
                selected: true,
                dropped: false
        })
        debugger;
        this.props.selectCountry(cor, iso2)();
    }

    updateSearchResults() {
        let results = []
        searchCountries({ searchparams: this.state.search })
            .then(response => {
                let results = [];
                response.data.forEach(country => {
                    results.push(country);
                })
                this.setState({ searchResults: results });
            })
    }

    renderDropDown(){
        if(this.state.selected) return null;
        if (Object.keys(this.state.searchResults).length < 1) return <div key="no-results" className="search-result"> No results for this search </div>
        return Object.keys(this.state.searchResults).map(key => (<div key={this.state.searchResults[key].cca2} className="search-result" onClick={this.handleClick}>{key}</div>)).slice(0, 10)
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
                    <SessionDrop loggedIn={this.props.loggedIn}/>
                </div>
            </div>

        )
    }
}