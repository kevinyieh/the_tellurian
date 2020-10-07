import React from "react";
import "../../../stylesheets/country_data.css";

export default class CountryData extends React.Component {
  constructor(props) {
    super(props); //this.props.country ==> document
    this.state = {
      hidden: false,
    };
    this.handleHide = this.handleHide.bind(this);
    this.gdpConverter = this.gdpConverter.bind(this);
    this.currencyConverter = this.currencyConverter.bind(this);
    this.langConverter = this.langConverter.bind(this);
  }

  componentDidMount() {
    this.setState({
      hidden: false,
    });
  }

  componentDidUpdate(_, prevState) {
    if (prevState.hidden) {
      this.setState({
        hidden: false,
      });
    }
  }

  handleHide() {
    this.setState({
      hidden: true,
    });
  }

  onOrOffScreen() {
    return `country-data-container ${
      this.state.hidden
        ? "off-screen"
        : this.props.display
        ? "on-screen"
        : "off-screen"
    }`;
  }

  langConverter(langs) {
    if (langs.length > 1) {
      return (
        <p className="country-data">
          <i className="fas fa-volume-up"></i> Languages:{" "}
          {langs.map((lang, i) => (
            <li className="lang" key={i}>
              {lang}
            </li>
          ))}
        </p>
      );
    } else {
      return (
        <p className="country-data">
          <i className="fas fa-volume-up"></i> Language: {langs[0]}
        </p>
      );
    }
  }

  gdpConverter(gdp) {
    let newGdp = gdp / 1000000000;
    return newGdp.toFixed(2);
  }

  popConverter(population) {
      debugger;
      if (population.toString().split("").length > 9) {
        let newPop = population / 1000000000;
        return (
          <div>
            <p className="country-data">
              <i className="fas fa-user-friends"></i> Population:{" "}
            </p>
            <p>{newPop.toFixed(2)} billion</p>
          </div>
        );
      } else {
        let newPop = population / 1000000;
        return (
          <p className="country-data">
            <i className="fas fa-user-friends"></i>  Population:{" "}
            {newPop.toFixed(2)} million
          </p>
        );
      }
      
  }

  currencyConverter(currencies) {
    // ["{"name":"Bhutanese ngultrum","symbol":"Nu."}", "{"name":"Indian rupee","symbol":"₹"}"]
    let parsed = currencies.map((c) => JSON.parse(c));
    debugger;
    if (parsed.length > 1) {
      return (
        <p className="country-data">
          {" "}
          <i className="fas fa-coins"></i>
          Currencies:{" "}
          {parsed.map((curr, i) => (
            <li key={i}>
              {curr.name}, {curr.symbol}
            </li>
          ))}
        </p>
      );
    } else {
      let curr = parsed[0];
      return (
        <p className="country-data">
          {" "}
          <i className="fas fa-coins"></i>
          Currency: {curr.name}, {curr.symbol}
        </p>
      );
    }
  }

  render() {
    const { country } = this.props;
    if (!country) return null;
    debugger;
    return (
      <div className={this.onOrOffScreen()}>
        <div className="hide-country-data" onClick={this.handleHide}>
          <i className="fas fa-angle-left" />
          <div className="country-data-text">
            <h1>{country.name}</h1>
            <p className="country-data" id="o-name">
              {" "}
              {country.officialname}{" "}
            </p>
            
            {this.popConverter(country.population)}
            
            <p className="country-data">
              <i className="fas fa-globe"></i>Region: {country.region}
            </p>
            <p className="country-data">
              <i className="fas fa-map-pin"></i>Capital: {country.capital[0]}
            </p>
            {this.langConverter(country.languages)}
            <p className="country-data">
              {" "}
              <i className="fas fa-database"></i> GDP: $
              {this.gdpConverter(country.gdp)} billion
            </p>
            {this.currencyConverter(country.currencies)}
          </div>
        </div>
      </div>
    );
  }
}