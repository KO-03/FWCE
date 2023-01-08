import { Component, OnInit } from '@angular/core';
import { WorldCupEdition } from './model/country';
import { SparqlService } from './sparql.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private sparql: SparqlService ) {}

  ngOnInit() {
  }
}
