import { async, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';

@Component({
  selector: 'app-demo',
  template: ''
})
class MockDemoComponent {}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ClientsComponent,
        ClientsListComponent,
        ClientDetailsComponent,
        MockDemoComponent
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}],
      imports: [FormsModule, AppMaterialModule, AppRoutingModule, BrowserAnimationsModule]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
