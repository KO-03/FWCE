import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, Team } from '../model/country';
import { SparqlService } from '../sparql.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  constructor(private _sparqlService: SparqlService, private route: ActivatedRoute) { }

  countries: Map<String, Country> = new Map<String, Country>();
  country: Country | undefined = {} as Country;
  countryName: String = "";
  teams: Team[] | undefined;
  selectedValue = null;

  ngOnInit(): void {
    this._sparqlService.getCountries().subscribe(res => {
      res.results.bindings.map(result => {
        let country = {
          name: result.countrySportLabel.value,
          coord: result.countryCoord.value,
          group: result.groupNameLabel.value,
          flagUrl: result.flag.value,
          code: result.countryCodeLabel.value
        } as Country;

        this.countries.set(result.countrySportLabel.value, country);
      });

      this.route.params.subscribe(params => {
        this.countryName = params['countryName'];
        this.country = this.countries.get(this.countryName);
      });

    });
  }
}
