import React from "react";
import "../../../stylesheets/country_data.css";

export default class CountryData extends React.Component {
  constructor(props) {
    super(props); //this.props.country ==> document
    this.state = {
      hidden: false,
    };
    this.toggleHide = this.toggleHide.bind(this);
    this.gdpConverter = this.gdpConverter.bind(this);
    this.currencyConverter = this.currencyConverter.bind(this);
    this.langConverter = this.langConverter.bind(this);
  }

  componentDidMount() {
    this.setState({
      hidden: false,
    });
  }

  componentDidUpdate(prevProps,prevState) {
    if (prevProps.hidden !== this.props.hidden){
      this.setState({ hidden: this.props.hidden })
    }else {
      if(prevState.hidden) this.setState({ hidden: false });
    }
  }

  toggleHide() {
    this.setState({
      hidden: !this.state.hidden
  })
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
      if (langs === "No data") {
        return (
          <div className="country-data">
            <p className="data-type">
              <i className="fas fa-volume-up"></i> Languages:
            </p>
            <p className="data">No Data</p>
          </div>
        );
      }
    if (langs.length > 1) {
      return (
        <div className="country-data">
            <p className="data-type">
              <i className="fas fa-volume-up"></i>  Languages:
            </p>
            <p className="data">{langs.map((lang, i) => (
                <li className="lang" key={i}>
                {lang}
                </li>
                ))}
          </p>
        </div>
      );
    } else {
      return (
        <div className="country-data">
          <p className="data-type">
            <i className="fas fa-volume-up"></i>  Language:{" "}
          </p>
          <p className="data">{langs[0]}</p>
        </div>
      );
    }
  }

  gdpConverter(gdp) {

     if (gdp === "No data") {
       return (
         <div className="country-data">
           <p className="data-type">
             <i className="fas fa-database"></i> GDP:
           </p>
           <p className="data">No Data</p>
         </div>
       );
     }

    let newGDP;
    if (gdp.toString().split(".")[0].length > 9) {
      let bil = gdp / 1000000000;
      newGDP = <p className="data">{bil.toFixed(2)} billion</p>;
    } else {
      let mil = gdp / 1000000;
      newGDP = <p className="data">{mil.toFixed(2)} million</p>;
    }

    return (
      <div className="country-data">
        <p className="data-type">
          <i className="fas fa-database"></i> GDP:{" "}
        </p>
        {newGDP}
      </div>
    );   
  }

  popConverter(population) {
      if (population === "No data") {
          return (
          <div className="country-data">
            <p className="data-type">
              <i className="fas fa-user-friends"></i>  Population:{" "}
            </p>
            <p className="data">No Data</p>
            </div>
          )
      }
        let pop;
        if (population.toString().split("").length > 9) {
          let newPop = population / 1000000000;
          pop = <p className="data">{newPop.toFixed(2)} billion</p>;
        } else if (population.toString().split("").length > 6) {
          let newPop = population / 1000000;
          pop = <p className="data">{newPop.toFixed(2)} million</p>;
        } else {
          let newPop = population / 1000;
          pop = <p className="data">{newPop.toFixed(2)} thousand</p>;
        }
      return (
          <div className="country-data">
            <p className="data-type"><i className="fas fa-user-friends"></i> Population:{" "}
            </p>
            {pop}
            </div>
      )   
  }

  currencyConverter(currencies) {

    if (currencies === "No data") {
      return (
        <div className="country-data">
          <p className="data-type"><i className="fas fa-coins"></i>  Currencies:</p>
          <p className="data">No Data</p>
        </div>
      );
    }

    // ["{"name":"Bhutanese ngultrum","symbol":"Nu."}", "{"name":"Indian rupee","symbol":"₹"}"]
    let parsed = currencies.map((c) => JSON.parse(c));
    if (parsed.length > 1) {
      return (
        <div className="country-data-last">
          <p className="data-type">
            <i className="fas fa-coins"></i> Currencies:
          </p>
          <p className="data">
            {parsed.map((curr, i) => (
              <li key={i}>
                {curr.name}, {curr.symbol}
              </li>
            ))}
          </p>
        </div>
      );
    } else {
      let curr = parsed[0];
      return (
        <div className="country-data-last">
          <p className="data-type"><i className="fas fa-coins"></i>  Currency: </p>
          <p className="data">{curr.name}, {curr.symbol}
        </p>
        </div>
      );
    }
  }

  render() {
    const { country } = this.props;
    if (!country) return null;
    const officialname = country.officialname || country.name;
    const population = country.population
      ? this.popConverter(country.population)
      : this.popConverter("No data");
    const region = country.region || 'No data';
    const capital = country.capital[0] ? country.capital : ['No Data'];
    const languages =
      country.languages.length > 0
        ? this.langConverter(country.languages)
        : this.langConverter("No data");
    const gdp = country.gdp
      ? this.gdpConverter(country.gdp)
      : this.gdpConverter("No data");
    const currency =
      country.currencies.length > 0
        ? this.currencyConverter(country.currencies)
        : this.currencyConverter("No data");

    return (
      <div className={this.onOrOffScreen()}>
        <div className="country-data-text">
          <div className="header-flex">
          <img className="country-flag" alt="country-flag" src={`https://tellurian.s3.amazonaws.com/flags/${country.cca3.toLowerCase()}.svg`}></img> 
            <h1>{country.name}</h1>
          </div>

          <div className="container-scroll">
            <p className="o-name"> {officialname} </p>

            {population}

            <div className="country-data">
              <p className="data-type">
                <i className="fas fa-globe"></i> Region:{" "}
              </p>
              <p className="data">{region} </p>
            </div>

            <div className="country-data">
              <p className="data-type">
                <i className="fas fa-map-pin"></i> Capital:{" "}
              </p>
              <p className="data">{capital[0]}</p>
            </div>

            {languages}

            {gdp}

            {currency}
          </div>
        </div>
        <div onClick={this.toggleHide} className={`show-left ${this.state.hidden ? "" : "tucked"}`}>
          <i className="fas fa-sort-up fa-rotate-90" />
        </div>
      </div>
    );
  }
}