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
            Languages:{" "}
            {langs.map((lang, i) => (
              <li className="lang" key={i}>
                {lang}
              </li>
            ))}
          </p>
        );
      } else {
        return <p className="country-data">Language: {langs[0]}</p>;
      }
  }

  gdpConverter(gdp) {
    let newGdp = (gdp / 1000000000);
    return newGdp.toFixed(2);
  }

  currencyConverter(currencies) {
    let curr = JSON.parse(currencies);
    let currArr = Object.values(curr);
    if (currArr.length > 1) {
      return (
        <p className="country-data">
          Currencies:{" "}
          {currArr.map((c, i) => (
            <li key={i}>{c.name}</li>
          ))}
        </p>
      );
    } else {
        return <p className="country-data">Currency: {currArr[0].name}</p>;
    }
  }

  render() {
    const { country } = this.props;
    return (
      <div className={this.onOrOffScreen()}>
        <div className="articles">
          <div className="hide-country-data" onClick={this.handleHide}>
            <i className="fas fa-angle-left" />
            <h1>{country.name}</h1>
            <p className="country-data">Official name: {country.officalname}</p>
            <p className="country-data">Region: {country.region}</p>
            <p className="country-data">Population: {country.population}</p>
            <p className="country-data">Capital: {country.capital}</p>
            <p className="country-data"> GDP: {this.gdpConverter(country.gdp)} billion</p>
            {this.langConverter(country.languages)}
            {this.currencyConverter(country.currencies)}
          </div>
        </div>
      </div>
    );
  }
}