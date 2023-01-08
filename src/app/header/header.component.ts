import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogActions, MatDialogModule, MatDialogContent,} from '@angular/material/dialog';
import { WorldCupEdition } from '../model/country';
import { SparqlService } from '../sparql.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title="FIFA WORLD CUP EXPLORER";
  acronym="FWCE";
  worldCupEditions: WorldCupEdition[] = []
  worldCupEdition=2022;
  selectedValue="2022 FIFA World Cup";

  constructor(public dialog: MatDialog, private sparql: SparqlService) {}

  ngOnInit(): void {
    this.sparql.getWorldCupEditions().subscribe(res => {
      res.results.bindings.map(result => {
        this.worldCupEditions.push({
          editionName: result.worldCupEditionLabel.value,
          wikidataId: result.worldCupEdition?.value
        });
      });

      console.log("before", this.worldCupEditions);
      this.worldCupEditions.sort();
      console.log("after", this.worldCupEditions);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AboutDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

@Component({
  selector: 'app-header-dialog',
  templateUrl: './about.html',
  styleUrls: ['./about.css']
})
export class AboutDialog {}