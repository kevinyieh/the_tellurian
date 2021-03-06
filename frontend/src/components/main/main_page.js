import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import "../../stylesheets/map.css";
import "../../stylesheets/hamburgers.css";
import "../../stylesheets/nav_dropdown.css";
import "../../stylesheets/feed.css";
import NavBarContainer from "../navbar/navbar_container";
import CountryDataContainer from "./country_data/country_data_container";
import ArticlesContainer from "./articles/articles_container";
import FeedModal from "../feed/modal";

am4core.useTheme(am4themesAnimated)

const sign = num => {
  return num < 0 ? -1 : 1;
}

const deltaLongCalc = (current,destination,inc) => {
  if(sign(current) === sign(destination)){
    return current > destination ?  
          -Math.abs(current - destination) * inc : Math.abs(destination - current) * inc;
  }else {
    let crossDist = sign(destination) === 1 ? 180 - destination + (current + 180) : destination + 180 + (180 - current);
    let crossDirection = sign(destination) === 1 ? -1 : 1;
    return crossDist < Math.abs(current - destination) ? 
                  crossDirection * crossDist * inc :
                 -crossDirection * Math.abs(current-destination) * inc;
  }
}

const deltaLatCalc = (current,destination,inc) => {
  return current > destination ? -Math.abs(current-destination) * inc : Math.abs(current-destination) * inc;
}
const closeEnough = (current, destination, error) => {
  return Math.abs(current - destination) <= Math.abs(error);
}

class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.selected = null;
    
    this.state = {
      display: false,
    }
    this.handleHit = this.handleHit.bind(this);
    this.handleHideArticles = this.handleHideArticles.bind(this);
    this.handleHideCountry = this.handleHideCountry.bind(this);
  }

  rotateGlobeAndFocus(cor,ev,countryTarget) {
    const map = this.map;
    const coords = cor ? cor : map.svgPointToGeo(ev.svgPoint);
    const deltaLongitude = -coords.longitude;
    const deltaLatitude = -coords.latitude;
    const inc = 0.2;

    const longInc = deltaLongCalc(map.deltaLongitude,deltaLongitude,inc);
    const latInc = deltaLatCalc(map.deltaLatitude,deltaLatitude,inc);
  
    if (this.intervalId) cancelAnimationFrame(this.intervalId);
    const rotateGlobe = (timestamp) => {
      if((!closeEnough(map.deltaLongitude,deltaLongitude,longInc) || !closeEnough(map.deltaLatitude,deltaLatitude, latInc))
      ){
        map.deltaLongitude += longInc;
        map.deltaLatitude += latInc;
        this.intervalId = requestAnimationFrame(rotateGlobe);
      }else{
        cancelAnimationFrame(this.intervalId);
        this.intervalId = null;
        const objToFocus = countryTarget ? countryTarget : ev.target;
        map.zoomToMapObject(objToFocus);
        if(this.selected) this.selected.isActive = false;
        this.selected = objToFocus;
        this.selected.isActive = true;
      }
    }
    this.intervalId = requestAnimationFrame(rotateGlobe);

  }

  handleHit(cor,iso2){
    const countryTarget = iso2 ? this.polygonSeries.getPolygonById(iso2) : null;
    return ev => {
      let cca2 = iso2 || ev.target.dataItem.dataContext.id;
      this.rotateGlobeAndFocus(cor, ev, countryTarget);
      this.props
        .fetchCountry({ cca2 })
        .then((country) => {
          if(!this.props.articles[this.props.country.cca2]) 
          return this.props.fetchArticles(this.props.country.cca2, this.props.country.name)});
      this.setState({
        display: true,
      });
    }
  }

  componentDidMount() {
    // Set up basic map
    am4core.options.autoSetClassName = true;
    let map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Orthographic();
    map.panBehavior = "rotateLongLat";
    map.adapter.add("deltaLatitude", function(delatLatitude){
      return am4core.math.fitToRange(delatLatitude, -90, 90);
    })
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#cccccc");
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.3;
    map.zoomDuration = 1333;

    // ADD GRID LINES
    let graticuleSeries = map.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.line.stroke = am4core.color("#67b7dc");
    graticuleSeries.mapLines.template.line.strokeOpacity = 0.2;
    graticuleSeries.fitExtent = false;
    // ADD COUNTRIES
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    this.map = map;
    this.polygonSeries = polygonSeries;
    // EVENT LISTENER ON HIT
    polygonSeries.mapPolygons.template.events.on("hit",this.handleHit());
    // COUNTRY COLOR
    polygonSeries.tooltip.getFillFromObject = false;
    polygonSeries.tooltip.background.fill = am4core.color("#1a1a1a");
    polygonSeries.tooltip.label.textAlign = "middle";
    polygonSeries.tooltip.background.cornerRadius = 10;
    polygonSeries.tooltip.fontFamily = "Times New Roman"
    let polygonTemplate = polygonSeries.mapPolygons.template;
    // TOOLTIP DISPLAY
    polygonTemplate.tooltipText = "{name}";
    // LAND COLOR 
    polygonTemplate.fill = am4core.color("#c47834");
    // HOVER COLOR
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#e4bd9a");
    // ACTIVE STATE COLOR
    let activeState = polygonTemplate.states.create("active");
activeState.properties.fill = am4core.color("#F2B544");
    // CREATE GO HOME BUTTOn
    this.resetButton = map.chartContainer.createChild(am4core.Button);
    this.resetButton.label.text = "Reset";
    this.resetButton.marginLeft = 10;
    this.resetButton.fontFamily = "Times New Roman";
    this.resetButton.align = "left";
    this.resetButton.events.on("hit", (ev) => {
      map.goHome();
      this.setState({
        display: false
      })
      if (this.selected) this.selected.isActive = false;
    });
    this.setState({
      display: false
    })
  }

  componentWillUnmount() {
    if (this.map) {
      this.map.dispose();
    }
  }
  handleHideCountry(e){
    this.setState({
      countryHidden: false
    })
  }
  handleHideArticles(e){
    this.setState({
      articlesHidden: false
    })
  }
  render() {
    return (  
      <div  className="main-page">
        <FeedModal 
          map={this.map}
        />
        <NavBarContainer 
          selectCountry={this.handleHit}
          polygonSeries={this.polygonSeries}
          map={this.map}
          display={this.state.display}
        />
        <CountryDataContainer
          display={this.state.display}
          map={this.map}
        />
        <div id="chartdiv" />
        <ArticlesContainer
          display={this.state.display}
          map={this.map}
        />
      </div>
        
    );
  }
}

export default MainPage;