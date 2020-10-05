import React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themesAnimated from '@amcharts/amcharts4/themes/animated'
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";

am4core.useTheme(am4themesAnimated)

class MainPage extends React.Component {
  componentDidMount() {
    let map = am4core.create("chartdiv", am4maps.MapChart);
    map.geodata = am4geodata_worldLow;
    map.projection = new am4maps.projections.Miller;
    map.panBehavior = "rotateLongLat";
    map.adapter.add("deltaLatitude", function(delatLatitude){
      return am4core.math.fitToRange(delatLatitude, -90, 90);
    })
  
    let polygonSeries = map.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    polygonSeries.mapPolygons.template.events.on("hit", function(ev) {
      debugger;
      map.zoomToMapObject(ev.target);
    });
    this.map = map;
    
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id="chartdiv" style={{ width: "100%", height: "800px" }}></div>
    );
  }
}

export default MainPage;