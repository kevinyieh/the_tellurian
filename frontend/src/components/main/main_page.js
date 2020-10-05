import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import "../../stylesheets/map.css";

am4core.useTheme(am4themesAnimated)

class MainPage extends React.Component {
  componentDidMount() {
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
    this.map = map;

    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    debugger;
    polygonSeries.mapPolygons.template.events.on("hit", ev => {
      const coords = map.svgPointToGeo(ev.svgPoint);
      const deltaLongitude = -coords.longitude;
      const deltaLatitude = -coords.latitude;
      const inc = 0.1;
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
      this.intervalId = setInterval(() => {
        if(!pastLong(map.deltaLongitude,deltaLongitude,longInc > 0) || !pastLat(map.deltaLatitude,deltaLatitude,latInc > 0)){
          map.deltaLongitude += longInc;
          map.deltaLatitude += latInc;
        }else{
          clearInterval(this.intervalId);
          this.intervalId = null;
          map.zoomToMapObject(ev.target,1.4)
        }
      },1)
    });
    polygonSeries.tooltip.getFillFromObject = false;
    polygonSeries.tooltip.background.fill = am4core.color("#cccccc");

    let polygonTemplate = polygonSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = am4core.color("#c47834");

    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#e4bd9a");

    
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "100vh"}}></div>
    );
  }
}

export default MainPage;