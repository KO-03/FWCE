import { Component, OnInit } from '@angular/core';
import { SparqlService } from '../sparql.service';
import { Country, WorldCupDetail } from '../model/country';


@Component({
  selector: 'app-side-page',
  templateUrl: './side-page.component.html',
  styleUrls: ['./side-page.component.css']
})
export class SidePageComponent implements OnInit {
  selectedValue = null;

  test: String[] = []; 
  countries:Country[] = [];
  worldCupDetail: WorldCupDetail = {} as WorldCupDetail;

  constructor(private _sparqlService: SparqlService) { }

  ngOnInit(): void {
    this._sparqlService.getCountries().subscribe(res => {
      res.results.bindings.map(result => {
        this.countries.push(
          {
            name: result.countrySportLabel.value,
            coord: result.countryCoord.value,
            group: result.groupNameLabel.value,
            flagUrl: result.flag.value,
            code: result.countryCodeLabel.value
          })
      });
    });
    
    this._sparqlService.getWorldCupDetail().subscribe(res => {
      res.results.bindings.map(result => {

          this.worldCupDetail.logo =           result.logo.value;
          this.worldCupDetail.countryName =    result.countryLabel.value;
          this.worldCupDetail.startTime =      result.startTime.value.slice(0,10);
          this.worldCupDetail.endTime =        result.endTime.value.slice(0,10);
          this.worldCupDetail.cost =           Number(result.cost.value);
          this.worldCupDetail.nbParticipants = result.nbParticipants.value;
          this.worldCupDetail.winner =         result.winnerLabel.value;
          this.worldCupDetail.attendance =     Number(result.attendanceLabel.value);
          this.worldCupDetail.nbMatchs =       result.nbMatchs.value;
          this.worldCupDetail.nbGoals =        result.nbGoals.value;

        console.log("DETAIL ", this.worldCupDetail);
      });

      console.log("V2 ", this.countries);
    });
  }


}