import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducers from './shared/reducers';

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

  index = 0;

  constructor(private store: Store<reducers.AppState>) { }

  undo() {
    this.store.dispatch({type: 'UNDO'});
  }

  redo() {
    this.store.dispatch({type: 'REDO'});
  }

  test() {
    const actions = [
      { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
      { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
      { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
      { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
      { type: '[Client] Select', payload: { id: '1', firstName: 'John', lastName: 'Doe', company: 'Acme, Inc'}},
      { type: '[Client] Select', payload: { id: '2', firstName: 'Jane', lastName: 'Smith', company: 'Super, Inc'}},
    ];

    this.store.dispatch(actions[this.index]);

    this.index = this.index < actions.length - 1 ? this.index + 1 : 0;
  }
}
