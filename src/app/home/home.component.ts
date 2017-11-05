import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Client } from '../shared/models/client.model';
import { Project } from '../shared/models/project.model';
import { SocketService } from '../shared/services/';
import * as ClientActions from '../shared/actions/client.actions';
import * as ProjectActions from '../shared/actions/project.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  clients$: Observable<Client[]>;
  projects$: Observable<Project[]>;

  constructor(private store: SocketService)  {
    this.clients$ = store.select('clients');
    this.projects$ = store.select('projects');
  }

  ngOnInit() {
    this.store.dispatch(new ClientActions.LoadAction());
    this.store.dispatch(new ProjectActions.LoadAction());
  }
}
