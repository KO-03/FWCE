import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WorldMapComponent } from './world-map/world-map.component';
import { SidePageComponent } from './side-page/side-page.component';
import { HeaderComponent } from './header/header.component';
import { AboutDialog } from './header/header.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeamComponent } from './team/team.component';
import { MatchesComponent } from './matches/matches.component';
import { FinalPhaseComponent } from './final-phase/final-phase.component'
import { RouterModule, Routes } from '@angular/router';

const appRoutes : Routes = [
  {path:'', component:SidePageComponent},
  {path:'Team', component:TeamComponent},
  {path:'Team/:countryName', component:TeamComponent},
  {path:'Matches', component:MatchesComponent},
  {path:'FinalPhase', component:FinalPhaseComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    WorldMapComponent,
    SidePageComponent,
    HeaderComponent,
    AboutDialog,
    TeamComponent,
    MatchesComponent,
    FinalPhaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }