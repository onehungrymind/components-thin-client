import { async, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { AppMaterialModule } from './app-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { ProjectsComponent } from './projects/projects.component';
import { ClientsListComponent } from './clients/clients-list/clients-list.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ClientDetailsComponent } from './clients/client-details/client-details.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HomeComponent,
        ClientsComponent,
        ProjectsComponent,
        ClientsListComponent,
        ProjectsListComponent,
        ClientDetailsComponent,
        ProjectDetailsComponent
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
