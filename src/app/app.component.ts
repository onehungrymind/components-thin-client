import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from './shared/reducers';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/from';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/zip';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  links = [
    { path: '/home', icon: 'home', label: 'Home'},
    { path: '/clients', icon: 'face', label: 'Clients'},
    { path: '/projects', icon: 'work', label: 'Projects'}
  ];

  actions = [
    { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
    { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
    { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
    { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
    { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
    { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
  ];

  index = 0;

  constructor(private store: Store<reducers.AppState>) { }

  undo() {
    this.store.dispatch({type: 'UNDO'});
  }

  redo() {
    this.store.dispatch({type: 'REDO'});
  }

  step() {
    this.store.dispatch(this.actions[this.index]);

    this.index = this.index < this.actions.length - 1 ? this.index + 1 : 0;
  }

  cycle() {
    const result = Observable
      .from(this.actions)
      .zip(Observable.interval(500), (a, b) => a)
    ;

    result.subscribe(action => this.store.dispatch(action));
  }
}
