import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import "../../stylesheets/map.css";
import "../../stylesheets/hamburgers.css";
import "../../stylesheets/nav_dropdown.css";
import NavBarContainer from "../navbar/navbar_container";
import CountryDataContainer from "./country_data/country_data_container";
import ArticlesContainer from "./articles/articles_container";


am4core.useTheme(am4themesAnimated)

class MainPage extends React.Component {
  constructor(props){
    super(props);
    this.selected = null;
    this.handleHit = this.handleHit.bind(this);
    this.state = {
      display: false
    }
  }

  rotateGlobeAndFocus(cor,ev,countryTarget) {
    const map = this.map;
    const coords = cor ? cor : map.svgPointToGeo(ev.svgPoint);
    const deltaLongitude = -coords.longitude;
    const deltaLatitude = -coords.latitude;
    const inc = 0.3;
    const longInc = Math.abs((map.deltaLongitude - deltaLongitude)) < Math.abs((deltaLongitude - map.deltaLongitude)) ?  
                    (map.deltaLongitude - deltaLongitude) * inc : (deltaLongitude - map.deltaLongitude) * inc;

    const latInc = Math.abs((map.deltaLatitude - deltaLatitude)) < Math.abs((deltaLatitude - map.deltaLatitude)) ?  
                    (map.deltaLatitude - deltaLatitude) * inc : (deltaLatitude - map.deltaLatitude) * inc;
    const pastLong = (current, destination, direction) => {
      if (direction) {
        return current > destination;
      }else {
        return current < destination;
      }
    }
    const pastLat = (current, destination, direction) => {
      if (direction) {
        return current >= destination;
      }else {
        return current <= destination;
      }
    }
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.timeoutId) clearTimeout(this.timeoutId);
    
    this.intervalId = setInterval(() => {
      if(!pastLong(map.deltaLongitude,deltaLongitude,longInc > 0) || !pastLat(map.deltaLatitude,deltaLatitude,latInc > 0)){
        map.deltaLongitude += longInc;
        map.deltaLatitude += latInc;
      }else{
        clearInterval(this.intervalId);
        this.intervalId = null;
        const objToFocus = countryTarget ? countryTarget : ev.target;
        map.zoomToMapObject(objToFocus,1.4);
        if(this.selected) this.selected.isActive = false;
        this.selected = objToFocus;
        this.selected.isActive = true;
      }
    },1);
    this.timeoutId = setTimeout(() => {
      if(this.intervalId) {
        clearInterval(this.intervalId);
        this.timeoutId = null;
        this.intervalId = null;
        const objToFocus = countryTarget ? countryTarget : ev.target;
        map.zoomToMapObject(objToFocus,1.4);
        if(this.selected) this.selected.isActive = false;
        this.selected = objToFocus;
        this.selected.isActive = true;
      }
    }, 1500);
  }

  handleHit(cor,iso2){
    const countryTarget = iso2 ? this.polygonSeries.getPolygonById(iso2) : null;
    return ev => {
      this.rotateGlobeAndFocus(cor,ev,countryTarget);
      this.setState({
        display: true
      })
    }
  }

  componentDidMount() {
    this.setState({
      display: false
    })
    // Set up basic map
    let map = am4core.create("chartdiv", am4maps.MapChart);
    
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Orthographic();
    map.panBehavior = "rotateLongLat";
    // map.adapter.add("deltaLatitude", function(delatLatitude){
    //   return am4core.math.fitToRange(delatLatitude, -90, 90);
    // })
    map.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#cccccc");
    map.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 0.3;

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
    activeState.properties.fill = am4core.color("#ffff66");
    // CREATE GO HOME BUTTOn
    let home = map.chartContainer.createChild(am4core.Button);
    home.label.text = "Zoom Out";
    home.fontFamily = "Times New Roman";
    home.align = "left";
    home.events.on("hit", function(ev) {
      map.goHome();
    });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (  
      <div className="main-page">
        <NavBarContainer 
          selectCountry={this.handleHit}
          polygonSeries={this.polygonSeries}
        />
        <CountryDataContainer
          display={this.state.display}
        />
        <div id="chartdiv" />
        <ArticlesContainer
          display={this.state.display}
        />
      </div>
        
    );
  }
}

export default MainPage;