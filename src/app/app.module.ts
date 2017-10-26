import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ClientsService, ProjectsService } from './shared/services/';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './shared/reducers';
import { ClientEffects } from './shared/effects/client.effects';
import { ProjectEffects } from './shared/effects/projects.effects';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,
    ProjectsComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    ClientDetailsComponent,
    ClientsListComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AppMaterialModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ClientEffects, ProjectEffects])
  ],
  providers: [ClientsService, ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
