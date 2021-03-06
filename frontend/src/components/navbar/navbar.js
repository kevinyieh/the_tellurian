import React from "react";
import BurgerDrop from './burger_drop';
import { searchCountries } from '../../util/countries_api_util';

export default class NavBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: "",
            selected: false,
            dropped: false,
            searchResults: {},
            loading: false
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

    componentDidUpdate(prevProps) {
        if (!prevProps.map && this.props.map) {
            this.props.map.events.on('hit', () => {
                this.setState({ dropped: false })
            })
        }
        if(prevProps.currentCountry !== this.props.currentCountry) {
            if(this.state.search !== this.props.currentCountry){
                this.setState({
                    search: this.props.currentCountry
                })
            }
        }
        if(prevProps.display !== this.props.display && !this.props.display) {
            this.setState({
                search: ""
            });
        }
    }

    componentWillUnmount(){
        document.removeEventListener("mousedown",this.handleClickOutside)
    }

    update(field) {
        return e => {
            e.preventDefault();
            this.setState({
                [field]: e.target.value,
                selected: false,
                dropped: true,
                loading: true
            }, () => {
                if (this.queue) clearTimeout(this.queue);
                this.queue = setTimeout(() => {
                    searchCountries({ searchparams: this.state.search })
                    .then(response => {
                        let results = {};
                        response.data.forEach(country => {
                            results[country.name] = country
                        })

                        this.setState({
                            searchResults: results,
                            loading: false
                        }, () => this.queue = null)
                    })
                },400)
                
            })
        }
    }

    handleClick(e) {
        const selected = this.state.searchResults[e.target.innerText]
        const iso2 = selected.cca2
        const cor = { latitude: selected.lat, longitude: selected.lng }
        this.setState({
            search: e.target.innerText,
            selected: true,
            dropped: false
        })
        this.props.selectCountry(cor, iso2)();
        this.setState({ search: "" });
    }

    renderDropDown() {
        if (this.state.selected) return null;
        if (this.state.loading) return <div className="buffering"> <i className="fas fa-search" /> </div>
        if (Object.keys(this.state.searchResults).length < 1) return <div key="no-results" className="search-result-container"> No results for this search </div>
        return Object.keys(this.state.searchResults).sort((k1,k2) => k1 < k2 ? -1 : 1).map(key => {
            return (
                    <div onClick={this.handleClick} key={this.state.searchResults[key].cca2} className="search-result-container">
                        <img className="search-country-flag" 
                            alt={`${this.state.searchResults[key].cca3}`}
                            src={`https://tellurian.s3.amazonaws.com/flags/${this.state.searchResults[key].cca3.toLowerCase()}.svg`}/>
                        <div className="search-result">{key}</div>
                    </div>
                )}
            ).slice(0, 10)
    }

    formSubmit(e){
        e.preventDefault();
    }

    render() {
        return (
            <div className="navbar-spacer">
                <div className="navbar-container">
                    <h1 className="nav-title">The Tellurian</h1>
                    <form onSubmit={this.formSubmit} className="search-bar-form">
                        <div className={`search-bar-input-container ${this.state.dropped ? "dropped" : ""}`}
                            ref={node => this.searchBar = node}
                            onBlur={this.handleClickOutside}
                        >
                            <div className="search-bar">
                                <input onChange={this.update("search")}
                                    className="search-bar-input"
                                    value={this.state.search}
                                    placeholder="Navigate to a country..."
                                />
                                <div className={`space-shuttle-container ${this.state.dropped ? "dropped" : ""}`}>
                                    <i className="fas fa-space-shuttle fa-rotate-270" />
                                </div>

                            </div>

                            <div className={`search-dropdown ${this.state.dropped ? "" : "hidden"}`}>
                                {this.renderDropDown()}
                            </div>
                        </div>
                    </form>
                    <BurgerDrop 
                    loggedIn={this.props.loggedIn} 
                    map ={this.props.map}
                    />
                </div>
            </div>

        )
    }
}