import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from '../shared/models/client.model';
import * as reducers from '../shared/reducers';
import * as ClientActions from '../shared/actions/client.actions';
import * as ProjectActions from '../shared/actions/project.actions';
import { Observable } from 'rxjs/Observable';
import { Project } from '../shared/models/project.model';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clients$: Observable<Client[]>;
  projects$: Observable<Project[]>;

  constructor(private store: Store<reducers.AppState>)  {
    this.clients$ = store.select(reducers.getClients);
    this.projects$ = store.select(reducers.getProjects);
  }

  ngOnInit() {
    this.store.dispatch(new ClientActions.LoadAction());
    this.store.dispatch(new ProjectActions.LoadAction());
  }
}
