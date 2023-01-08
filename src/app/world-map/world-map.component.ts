import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SparqlService } from '../sparql.service';
import { Country, GroupData, idVal } from '../model/country';
import { Router } from '@angular/router';
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldHigh from "@amcharts/amcharts5-geodata/worldHigh";
import { IComponentDataItem } from '@amcharts/amcharts5/.internal/core/render/Component';

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements AfterViewInit {
  participants:Country[] = [];

  constructor (private _sparqlService: SparqlService, private router: Router) {}
  ngAfterViewInit(): void {
    this._sparqlService.getCountries().subscribe(res => {
      res.results.bindings.map(result => {
        this.participants.push(
          {
            name: result.countrySportLabel.value,
            coord: result.countryCoord.value,
            group: result.groupNameLabel.value,
            flagUrl: result.flag.value,
            code: result.countryCodeLabel.value
          })
        });
    });

    let root = am5.Root.new("chartdiv");
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: 'translateX',
        panY: 'translateY'
      })
    );

    chart.set("zoomControl", am5map.ZoomControl.new(root, {}));

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldHigh,
        exclude: ["AQ"]
      })
    );

    // all countries settings
    polygonSeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      fill: am5.color(0xaaaaaa),
      interactive: true
    });

    let groupData = [
      {
        "name": "Group A",
        "data": [
          { "id": "EC", "info":"Group A"},
          { "id": "NL", "info":"Group A"},
          { "id": "QA", "info":"Group A"},
          { "id": "SN", "info":"Group A"},
       ]
      },
      {
        "name": "Group B",
        "data": [
          { "id": "GB", "info":"Group B - UK and Wales"},
          { "id": "IR", "info":"Group B"},
          { "id": "US", "info":"Group B"},
          //{ "id": "GB", "info":"Group B - Wales"},
       ]
      },
      {
        "name": "Group C",
        "data": [
          { "id": "AR", "info":"Group C"},
          { "id": "MX", "info":"Group C"},
          { "id": "PL", "info":"Group C"},
          { "id": "SA", "info":"Group C"},
       ]
      },
      {
        "name": "Group D",
        "data": [
          { "id": "AU", "info":"Group D"},
          { "id": "DK", "info":"Group D"},
          { "id": "FR", "info":"Group D"},
          { "id": "TN", "info":"Group D"},
       ]
      },
      {
        "name": "Group E",
        "data": [
          { "id": "CR", "info":"Group E"},
          { "id": "DE", "info":"Group E"},
          { "id": "JP", "info":"Group E"},
          { "id": "ES", "info":"Group E"},
       ]
      },
      {
        "name": "Groupe F",
        "data": [
          { "id": "BE", "info":"Group F"},
          { "id": "CA", "info":"Group F"},
          { "id": "HR", "info":"Group F"},
          { "id": "MA", "info":"Group F"},
       ]
      },
      {
        "name": "Group G",
        "data": [
          { "id": "BR", "info":"Group G"},
          { "id": "CM", "info":"Group G"},
          { "id": "RS", "info":"Group G"},
          { "id": "CH", "info":"Group G"},
       ]
      },
      {
        "name": "Group H",
        "data": [
          { "id": "GH", "info":"Group H"},
          { "id": "PT", "info":"Group H"},
          { "id": "KR", "info":"Group H"},
          { "id": "UY", "info":"Group H"},
       ]
      }
    ]

    let colors = am5.ColorSet.new(root, {
      step: 2
    });
    colors.next();

      // Add legend
      var legend = chart.children.push(am5.Legend.new(root, {
        useDefaultMarker: true,
        centerX: am5.p50,
        x: am5.p50,
        centerY: am5.p100,
        y: am5.p100,
        dy: -20,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.2
        })
      }));

      legend.valueLabels.template.set("forceHidden", true)


    // Group map settings
      am5.array.each(groupData, (group) => {
      let countries: string[] = [];
      let color = colors.next();
    
      am5.array.each(group.data, function(country) {
        countries.push(country.id)
      });
    
      let polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldHigh,
        include: countries,
        name: group.name,
        fill: color
      }));
    
    
      polygonSeries.mapPolygons.template.setAll({
        tooltipText: "[bold]{name}[/]\n{info}",
        interactive: true,
        fill: color,
        strokeWidth: 2
      });

      polygonSeries.mapPolygons.template.events.on("click", function(ev) {
        let dataItem = ev.target.dataItem as am5.DataItem<IComponentDataItem>
        let dataContext = dataItem.dataContext as MapInfo;
        let mapInfo: MapInfo = {id: dataContext.id, name: dataContext.name, info: dataContext.info};

        console.log("Clicked on a country", dataContext);
        console.log("Clicked on a country", mapInfo);
        this?.router.navigate(['Team', mapInfo.name],  { state: { country: dataContext.name } });
      }, this);
    
      polygonSeries.mapPolygons.template.states.create("hover", {
        fill: am5.Color.brighten(color, -0.3)
      });
    
      polygonSeries.mapPolygons.template.events.on("pointerover", function(ev) {
        ev.target.series?.mapPolygons.each(function(polygon) {
          polygon.states.applyAnimate("hover");
        });
      });
    
      polygonSeries.mapPolygons.template.events.on("pointerout", function(ev) {
        ev.target.series?.mapPolygons.each(function(polygon) {
          polygon.states.applyAnimate("default");
        });
      });
      polygonSeries.data.setAll(group.data);

      legend.data.push(polygonSeries);
    
    });
  }
}

export interface MapInfo {
  id: String;
  name: String;
  info: String;
}