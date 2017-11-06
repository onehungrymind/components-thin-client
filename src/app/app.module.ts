import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AceEditorModule } from 'ng2-ace-editor';

import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { DemoComponent } from './demo/demo.component';
import { ActionsService, Store } from './shared/services/';

@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    ClientDetailsComponent,
    ClientsListComponent,
    DemoComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AppMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AceEditorModule,
    FlexLayoutModule
  ],
  providers: [ActionsService, Store],
  bootstrap: [AppComponent]
})
export class AppModule { }
