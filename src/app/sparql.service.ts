import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Country, Team } from './model/country';
import { CountryEntity, TeamEntity, WorldCupDetailEntity, WorldCupEditionEntity } from './model/Entities';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {

  constructor(private _http:HttpClient) { }

  apiUrl = "https://query.wikidata.org/sparql?format=json&query="

  getCountries() {
    var query = `SELECT ?groupNameLabel ?teamNameLabel ?teamName ?countryLabel ?flag ?countryCoord ?countryCodeLabel ?countrySportLabel
    WHERE { 
      ?teamName wdt:P31 wd:Q6979593. 
      ?groupName wdt:P31 wd:Q53945096; 
                 wdt:P1923 ?teamName. 
      wd:Q284163 wdt:P527 ?groupName. 
      ?teamName wdt:P17 ?country. 
      ?teamName wdt:P1532 ?countrySport. 
      ?country wdt:P41 ?flag. 
      ?country wdt:P625 ?countryCoord.
      ?country wdt:P901 ?countryCode
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    } ORDER BY ?groupNameLabel`;

    return this._http.get<CountriesResult>(this.apiUrl + query);
  }

  getWorldCupEditions() {
    var query = `
    SELECT ?worldCupEditionLabel ?worldCupEdition
    {
      wd:Q19317 wdt:P527 ?worldCupEdition. 
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }`;

    return this._http.get<WorldCupEditionsResult>(this.apiUrl + query);
  }

  getWorldCupDetail() {
    var query = `
    SELECT ?logo ?countryLabel ?startTime ?endTime ?cost ?nbParticipants ?winnerLabel ?attendanceLabel ?nbMatchs ?nbGoals
    WHERE {
        wd:Q284163 wdt:P154 ?logo;
        wdt:P17 ?country;
        wdt:P580 ?startTime;
        wdt:P582 ?endTime;
        wdt:P2130 ?cost;
        wdt:P1132 ?nbParticipants;
        wdt:P1346 ?winner;
        wdt:P1110 ?attendance;
        wdt:P1350 ?nbMatchs;
        wdt:P1351 ?nbGoals;
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }`;

    return this._http.get<WorldCupDetailResult>(this.apiUrl + query);
  }

  getWorldCupTeams() {
    var query = `
    SELECT ?worldCupEditionLabel ?worldCupEdition
    {
      wd:Q19317 wdt:P527 ?worldCupEdition. 
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }  ORDER BY DESC(?worldCupEditionLabel)`;
    return this._http.get<TeamsResult>(this.apiUrl + query);
  }

  getTeams() {
    return [
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
      {teamName:"France Team"},
    ] as Team[]
  }
}

export interface CountriesResult {
  results: { 
    bindings: [
      country: CountryEntity
    ]
  }
}

export interface TeamsResult {
  results: { 
    bindings: [
      country: TeamEntity
    ]
  }
}

export interface WorldCupEditionsResult {
  results: { 
    bindings: [
      country: WorldCupEditionEntity
    ]
  }
}

export interface WorldCupDetailResult {
  results: { 
    bindings: [
      country: WorldCupDetailEntity
    ]
  }
}
